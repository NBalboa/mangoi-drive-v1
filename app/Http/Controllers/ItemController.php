<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index(Order $order){

        $items = $order->items()->get();

        return Inertia::render("Admin/Items", [
            "order" => $order,
            "items" => $items,
        ]);
    }
}
