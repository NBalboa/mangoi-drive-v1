<?php

namespace App\Http\Controllers;

use App\Enums\IsAvailable;
use App\Enums\OrderType;
use App\Enums\PaymentType;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;


class OrderController extends Controller
{
    public function index(Request $request)
    {

        $orders = Order::with('items')->where('payment_type', '=', PaymentType::CASH->value);

        if($request->input('search')){
            $search = $request->input('search');
            $orders = $orders->search($search);
        }

        if($request->input('status')){

            $status = $request->input('status');
            $orders = $orders->status((int) $status);
        }

        if($request->input('order_type')){
            $order_type = $request->input('order_type');
            $orders = $orders->orderType($order_type);
        }

        $orders = $orders->paginate(10)->withQueryString();
        // dd($orders);
        // dd($orders->toSql(), $orders->getBindings(), $orders->get()); //this works but if i comment this line of code will return an arument errod
        return Inertia::render("Admin/Orders", [
            'orders'  => $orders,
            'filters' => [
                'search' => $request->input('search'),
                'status' => $request->input('status'),
                'order_type' => $request->input('order_type')
            ]
        ]);
    }

    public function create(Request $request)
    {
        $categories = Category::select('id', 'name')->isNotDeleted()->get();
        $products = Product::isNotDeleted();
        $search = $request->input('search');
        $category = $request->input('category');


        if ($search) {
            $products = $products->search($search);
        }

        if ($category) {
            $products = $products->byCategory($category);
        }
        $products = $products->get();


        return Inertia::render("Admin/OrdersCreate", [
            'categories' => $categories,
            'products' => $products,
            'order_type' => [
                'DINE_IN' => OrderType::DINE_IN->value,
                'TAKE_OUT' => OrderType::TAKE_OUT->value,
            ],
            'filters' =>  [
                'search' => $search ?? "",
                'category' => $category ?? ""
            ],
        ]);
    }

    public function store(StoreOrderRequest $request){

        $orders = $request->json('orders');
        $amount = (float) $request->json('amount_render');
        $total = (float) $request->json('total');
        $type = (int) $request->json('type') - 1;

        $order = Order::create([
            'payment_type' => PaymentType::CASH->value,
            'order_type' => $type,
            'amount_render' => $amount,
            'total' =>  $total
        ]);

        foreach($orders as $item){
            $product = Product::where('id', $item['id'])->first();
            if($item['is_available'] === IsAvailable::YES->value){
                if(!$item['quantity']){
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['id'],
                        'price' => $item['price'],
                        'quantity' => $item['order_quantity'],
                        'total' => $item['order_quantity'] * $item['price']
                    ]);
                }
                if($item['quantity'] > 0){
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['id'],
                        'price' => $item['price'],
                        'quantity' => $item['order_quantity'],
                        'total' => $item['order_quantity'] * $item['price']
                    ]);
                    $product = Product::where('id', $item['id'])->first();
                    $product->quantity = $product->quantity - $item['order_quantity'];
                    $product->save();
                }
            }
        }

        return redirect()->route('receipt.order', $order->id);
    }

    public function updateStatus(UpdateOrderStatusRequest $request, int $id){
        $validated = $request->validated();
        $order = Order::where('id', $id)->first();
        $order->status = $validated['status'];
        $order->save();

        return back();
     }

}
