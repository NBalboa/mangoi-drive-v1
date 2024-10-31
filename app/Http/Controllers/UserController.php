<?php

namespace App\Http\Controllers;

use App\Http\Requests\SigninRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UserController extends Controller
{


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
            return to_route("users.login")->withErrors(['error' => "Invalid Email/Password"]);
        }
    }
    public function logout()
    {
        Auth::logout();
        Session::regenerate();
        return to_route('home');
    }
}
