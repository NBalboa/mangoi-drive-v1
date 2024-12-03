<?php

namespace App\Http\Controllers;

use App\Enums\IsAvailable;
use App\Enums\OrderType;
use App\Enums\PaymentType;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render("Admin/Orders");
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

        return redirect()->route('orders.index');
    }

}
