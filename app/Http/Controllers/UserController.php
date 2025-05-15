<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
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

    public function index() {
        $users = User::where('role', UserRole::CUSTOMER->value)
        ->select('id', 'first_name', 'last_name', 'is_validId','email','valid_id', 'phone') // only fetch needed fields
        ->paginate(10) // adjust per-page limit here
        ->through(fn ($user) => [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'is_validId' => $user->is_validId,
            'phone' => $user->phone,
            'valid_id' => $user->valid_id ? asset('storage/' . $user->valid_id) : null,
        ]);

        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }
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

        $order->formatted_date = $order->created_at->format('F d, Y');

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

            if($user->role === UserRole::CUSTOMER->value){
                return to_route("home");
            }

            if($user->role === UserRole::ADMIN->value){
                return to_route('dashboard.index');
            }

        } else {
            return to_route("login")->withErrors(['error' => "Invalid Email/Password"]);
        }
    }
    public function validateId(Request $request){
        $user_id = $request->input('user_id');
        $isValidId = $request->input('is_validId');

        $user = User::where('id', '=', $user_id)->first();

        $user->is_validId = $isValidId;
        $user->save();


        return back();

    }
    public function logout()
    {
        Auth::logout();
        Session::regenerate();
        return to_route('home');
    }
}
