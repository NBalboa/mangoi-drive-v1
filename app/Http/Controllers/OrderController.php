<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render("Admin/Orders");
    }

    public function create()
    {
        return Inertia::render("Admin/OrdersCreate");
    }
}
