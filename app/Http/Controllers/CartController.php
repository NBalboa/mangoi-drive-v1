<?php

namespace App\Http\Controllers;

use App\Enums\PaymentType;
use App\Http\Requests\StoreCartRequest;
use App\Models\Address;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $carts = User::where('id', Auth::user()->id)->first()->carts()->with('product')->get();
        $addresses = Address::where('user_id', Auth::user()->id)->get();

        $total = 0;
        $carts->map(function ($cart) {
            $cart->total = $cart->product->price * $cart->quantity;
        });

        foreach ($carts as $cart) {
            $total += $cart->product->price * $cart->quantity;
        }


        return Inertia::render('Cart', [
            'carts' => $carts,
            'total' => $total,
            'addresses' => $addresses,
            'payment_type' => [
                'CASH' => PaymentType::CASH->value,
                'PAYPAL' => PaymentType::PAYPAL->value
            ]
        ]);
    }

    public function store(StoreCartRequest $request, User $user, Product $product)
    {
        $productExist  = $user->carts()->where('product_id', $product->id)->exists();
        if (!$productExist) {
            Cart::create([
                'user_id' => $user->id,
                'product_id' => $product->id,
                'quantity' => $request->input('quantity')
            ]);
            return back();
        } else {
            return redirect()->back()->withErrors(['cart' => 'Item already in your cart']);
        }
    }


    public function set(Request $request, Cart $cart)
    {
        $cart = Cart::where('id', $cart->id)->first();
        $product = Product::where('id', $cart->product->id)->first();

        if ($request->input('quantity') > $product->quantity) {
            $cart = $product->quantity;
        } else {
            $cart = $request->input('quantity');
        }
        $cart->save();

        return back();
    }

    public function add(Cart $cart)
    {
        $cart = Cart::where('id', $cart->id)->first();
        $product = Product::where('id', $cart->product->id)->first();

        if ($product->quantity) {
            if ($cart->quantity < $product->quantity) {
                $cart->quantity = $cart->quantity + 1;
                $cart->save();
            }
        } else {
            $cart->quantity = $cart->quantity + 1;
            $cart->save();
        }

        return back();
    }

    public function subtract(Cart $cart)
    {
        $cart = Cart::where('id', $cart->id)->first();

        if ($cart->quantity > 1) {
            $cart->quantity = $cart->quantity - 1;
            $cart->save();
        }

        return back();
    }


    public function delete(Cart $cart)
    {
        $cart = Cart::where('id', $cart->id)->first();
        $cart->delete();
        return back();
    }
}
