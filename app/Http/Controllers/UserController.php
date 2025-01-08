<?php

namespace App\Http\Controllers;

use App\Http\Requests\SigninRequest;
use App\Models\Address;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UserController extends Controller
{


    public function account()
    {
        $user = Auth::user();

        $addresses = Address::where('user_id', $user->id)->notDeleted()->get();
        return Inertia::render('Account', [
            'addresses' => $addresses
        ]);
    }


    public function orders(Request $request){
        $orders = Order::with('user', 'address')->where('user_id', '=', Auth::user()->id);


        if($request->input('search')){
            $search = $request->input('search');
            $orders = $orders->search($search)
                ->orWhereHas('address', function ($query) use ($search) {
                    $query->search($search);
                });
        }

        if($request->input('status')){
            $status = (int) $request->input('status');
            $orders = $orders->status($status);
        }

        $orders = $orders->latest()->paginate(10)->withQueryString();

        return Inertia::render('MyOrders', [
            'orders' => $orders,
            'filters' => [
                'search' => $request->input('search'),
                'status' => $request->input('status')
            ]
        ])
;    }


    public function items(Order $order) {

        $items = $order->items()->get();
        return Inertia::render('MyItems', [
            "order" => $order,
            'items' => $items
        ]);
    }


    public function receipt(Order $order){
        $order->load('items', 'user')->get();

        return Inertia::render("MyReceipt",
        ["order" => $order]);
    }
    public function address()
    {

        return Inertia::render('Address');
    }

    public function login()
    {

        return Inertia::render('Login');
    }


    public function signin(SigninRequest $request)
    {
        $user = User::where('email', $request->input('email'))->get()->first();

        if ($user && Hash::check($request->input('password'), $user->password)) {
            Auth::login($user);
            Session::regenerate();
            return to_route("home");
        } else {
            return to_route("login")->withErrors(['error' => "Invalid Email/Password"]);
        }
    }
    public function logout()
    {
        Auth::logout();
        Session::regenerate();
        return to_route('home');
    }
}
