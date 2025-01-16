<?php

namespace App\Http\Controllers;

use App\Enums\PaymentType;
use App\Enums\Status;
use App\Enums\UserRole;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {


        $current_date = Carbon::today();

        $total_sales = Order::where('status', ">=", Status::CONFIRMED->value)->whereDate('created_at', $current_date)->sum('total');
        $total_online_orders = Order::whereDate('created_at', $current_date)->where('user_id', '!=', null)->count();
        $total_orders = Order::whereDate('created_at', $current_date)->where('payment_type', '=', PaymentType::CASH->value)->count();
        $total_users = User::where('role', '=', UserRole::CUSTOMER->value)->count();


        $week = Order::where('status', ">=", Status::CONFIRMED->value)->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->sum('total');
        $year = Order::where('status', ">=", Status::CONFIRMED->value)->whereYear('created_at', Carbon::now()->year)->sum('total');
        $month = Order::where('status', ">=", Status::CONFIRMED->value)->whereMonth('created_at', Carbon::now()->month)->sum('total');

        return Inertia::render('Admin/Dashboard', [
            'total_sales' => $total_sales,
            'total_online_orders' => $total_online_orders,
            'total_orders' => $total_orders,
            'total_users' => $total_users,
            'year' => $year,
            'month' => $month,
            'week' => $week
        ]);
    }
}
