<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReceiptController extends Controller
{
    public function order(Order $order){
        $order->load('items', 'user')->get();

        return Inertia::render("Admin/Receipt",
        ["order"=> $order]);
    }
}
