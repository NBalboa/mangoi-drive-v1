<?php

namespace App\Http\Controllers;

use App\Enums\IsAvailable;
use App\Enums\OrderType;
use App\Enums\PaymentType;
use App\Enums\Status;
use App\Events\OrderCreated;
use App\Http\Requests\OrderMoreUpdateRequest;
use App\Http\Requests\StoreOnlineOrderRequest;
use App\Http\Requests\UpdateOnlineOrderStatusRequest;
use App\Models\Address;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OnlineOrderController extends Controller
{
    public function index(Request $request)
    {
        /** @var \Illuminate\Pagination\LengthAwarePaginator $initialOrders */
        $initialOrders = Order::with('user', 'address')->where('user_id', '!=', null);
        if ($request->input('search')) {
            $search = $request->input('search');
            $initialOrders = $initialOrders->search($search)
                ->orWhereHas('user', function ($query) use ($search) {
                    $query->search($search);
                })
                ->orWhereHas('address', function ($query) use ($search) {
                    $query->search($search);
                });
        }

        if ($request->input('filterStatus')) {
            $status = $request->input('filterStatus');
            $initialOrders = $initialOrders->status($status);
        }
        $initialOrders = $initialOrders->latest()->paginate(10)->withQueryString();

        $initialOrders->getCollection()->transform(function ($order) {
            $order->formatted_date = $order->created_at->format('F d, Y'); // e.g., May 15, 2025
            return $order;
        });

        return Inertia::render('Admin/OnlineOrders', [
            'initialOrders' => $initialOrders,
            'OrderStatus' => [
                'PENDING' => Status::PENDING->value,
                'CONFIRMED' => Status::CONFIRMED->value,
                'READY' => Status::READY->value,
                'TO_DELIVER' => Status::TO_DELIVER->value,
                'DELIVERED' => Status::DELIVERED->value,
                'CANCELLED' => Status::CANCELLED->value
            ],
            'filters' => [
                'search' => $request->input('search'),
                'status' => $request->input('status')
            ]
        ]);
    }
    public function updateOrderStatus(UpdateOnlineOrderStatusRequest $request)
    {
        $validated = $request->all();
        Order::whereIn('id', $validated['orders'])->update([
            'status' => (int) $validated['status'] - 1
        ]);

        return back();
    }

    public function order(Order $order)
    {
        $items = $order->items()->get();
        $user = $order->user()->first();
        $address = $order->address()->first();
        return Inertia::render('Admin/Items', [
            'order' => $order,
            'items' => $items,
            'user' => $user,
            'address' => $address
        ]);
    }

    public function store(Request $request, User $user)
    {
        $user = Auth::user();
        $gcash_image = $request->file('gcash_image');
        if($user->is_validId === 1){
            $carts = $user->carts()->with('product')->get();
            $address = $user->addresses()->get()->where('is_active', '=', 1)->first();
            $carts->map(function ($cart) {
                $product = $cart->product;
                $cart->total = $cart->quantity * $product->price;
            });
            $total = 0;
            foreach ($carts as $cart) {
                $total += $cart->total;
            }
            $user_payment_type = $request->input('payment_type');

            $payment_type = PaymentType::PAYPAL->value;

            if($user_payment_type === "cash"){
                $payment_type = PaymentType::CASH->value;
            }

            if($user_payment_type === "gcash"){
                $payment_type  = PaymentType::GCASH->value;
                if($gcash_image === null){
                    return back()->withErrors(['gcash_error' => "GCASH Image is required"]);
                }
                else{
                    $path = $gcash_image->store("products/images", "public");
                }
            }

            


            $order = Order::create([
                'address_id' => $address->id,
                'user_id' => $user->id,
                'payment_type' => $payment_type,
                'total' => $total,
                'order_type' => OrderType::DELIVERY->value,
                'amount_render' => $total,
                'gcash' => $path ?? null
            ]);

            foreach ($carts as $cart) {
                $product = $cart->product;
                if ($product->is_available === IsAvailable::YES->value && $product->quantity) {
                    if ($product->quantity >= $cart->quantity) {
                        OrderItem::create([
                            'order_id' => $order->id,
                            'product_id' => $product->id,
                            'price' => $product->price,
                            'quantity' => $cart->quantity,
                            'total' => $cart->total
                        ]);
                        $product->quantity = $product->quantity - $cart->quantity;
                        $product->save();
                    }
                }

                if ($product->is_available === IsAvailable::YES->value && !$product->quantity) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'price' => $product->price,
                        'quantity' => $cart->quantity,
                        'total' => $cart->total
                    ]);
                }
            }
            broadcast(new OrderCreated($order));
            $user->carts()->delete();
            return redirect('/');
        }
        else{

            return back()->withErrors(['is_validId' => 'Your account is not validated.']);
        }
    }

    public function details (Order $order) {
        $order->load('user', 'address');
        $order->gcash = $order->gcash ? asset('storage/' . $order->gcash) : null;
        if(!$order->user_id){
            return redirect()->route('online.orders.index');
        }


        return Inertia::render('Admin/OnlineOrderDetails', [
            'order' => $order
        ]);
    }


    public function more(OrderMoreUpdateRequest $requets, Order $order){
        $data = $requets->validated();
        $order->etd = (int) $data['etd'];
        $order->delivery_fee = $data['fee'];
        $order->save();

        return back();
    }
}
