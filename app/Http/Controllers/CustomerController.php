<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerEmailRequest;
use App\Http\Requests\UpdateCustomerNameRequest;
use App\Http\Requests\UpdateCustomerPhoneRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Str;


class CustomerController extends Controller
{

    public function register()
    {
        return Inertia::render('Register');
    }

    public function store(StoreCustomerRequest $request)
    {
        $user = User::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role' => UserRole::CUSTOMER->value,
            'remember_token' => Str::random(10),
        ]);

        Auth::login($user);
        Session::regenerate();

        return redirect()->route('home');
    }

    public function name()
    {
        return Inertia::render('CustomerEditName');
    }

    public function contact()
    {

        return Inertia::render('ContactEdit');
    }

    public function updateName(UpdateCustomerNameRequest $request, User $user)
    {
        $validated = $request->all();

        $user->update([
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'],
            'last_name' => $validated['last_name']
        ]);
    }

    public function updateEmail(UpdateCustomerEmailRequest $request, User $user)
    {
        $validated = $request->all();

        $user->update([
            'email' => $validated['email']
        ]);

        return back();
    }

    public function updatePhone(UpdateCustomerPhoneRequest $request, User $user)
    {
        $validated = $request->all();

        $user->update([
            'phone' => $validated['phone']
        ]);

        return back();
    }
}
