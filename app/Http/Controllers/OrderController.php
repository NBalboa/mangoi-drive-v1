<?php

namespace App\Http\Controllers;

use App\Enums\IsAvailable;
use App\Events\OrderCreated;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{

    public function index()
    {
        $initialOrders = Order::with('user', 'items')->get();
        $initialOrders->map(function ($initialOrder) {
            $user = $initialOrder->user;
            $initialOrder->address = $user->addresses()->where('id', $initialOrder->address_id)->first();
        });

        return Inertia::render('Admin/Orders', [
            'initialOrders' => $initialOrders,
        ]);
    }


    public function store(StoreOrderRequest $request, User $user)
    {
        $validated = $request->all();
        DB::beginTransaction();

        try {

            $carts = $user->carts()->with('product')->get();
            $carts->map(function ($cart) {
                $product = $cart->product;
                $cart->total = $cart->quantity * $product->price;
            });

            $total = 0;
            foreach ($carts as $cart) {
                $total += $cart->total;
            }

            $order = Order::create([
                'address_id' => $validated['address'],
                'user_id' => $user->id,
                'payment_type' => $validated['payment_type'],
                'total' => $total,
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
            DB::commit();

            broadcast(new OrderCreated($order));
        } catch (\Exception $e) {

            DB::rollBack();

            return redirect()->back()->withErrors(['error' => $e]);
        }
    }
}
