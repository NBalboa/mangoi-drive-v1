<?php

namespace App\Http\Controllers;

use App\Enums\OrderType;
use App\Enums\PaymentType;
use App\Enums\Status;
use App\Enums\UserRole;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request) {


        $current_date = Carbon::today();
        $week = [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()];
        $year = Carbon::now()->year;
        $month = Carbon::now()->month;

        $date_spp = $request->input('date') ?? 'today';
        $order_type_spp = $request->input('order_type') ?? 'all';

        $total_sales = Order::where('status', ">=", Status::CONFIRMED->value)->whereDate('created_at', $current_date)->sum('total');
        $total_online_orders = Order::whereDate('created_at', $current_date)->where('user_id', '!=', null)->count();
        $total_orders = Order::whereDate('created_at', $current_date)->where('payment_type', '=', PaymentType::CASH->value)->count();
        $total_users = User::where('role', '=', UserRole::CUSTOMER->value)->count();

        $total_sales_online = Order::
            where('status', ">=", Status::CONFIRMED->value)
            ->where('order_type', "=", OrderType::DELIVERY->value)
            ->whereDate('created_at', $current_date)->sum('total');


        $total_sales_walk_in = Order::
            where('status', ">=", Status::CONFIRMED->value)
            ->where('order_type', "!=", OrderType::DELIVERY->value)
            ->whereDate('created_at', $current_date)->sum('total');


        $week = Order::where('status', ">=", Status::CONFIRMED->value)->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->sum('total');
        $year = Order::where('status', ">=", Status::CONFIRMED->value)->whereYear('created_at', Carbon::now()->year)->sum('total');
        $month = Order::where('status', ">=", Status::CONFIRMED->value)->whereMonth('created_at', Carbon::now()->month)->sum('total');


        $sales_per_product = OrderItem::select('product_id', DB::raw('SUM(quantity) as total_sales'),DB::raw('SUM(price * quantity) as total_amount'))
        ->whereHas('order', function ($query) use ($date_spp, $order_type_spp) {
            $query->where('status','>=', Status::CONFIRMED->value);
            if($date_spp === "year"){
                $query->whereYear('created_at', Carbon::now()->year);
            }
            else if($date_spp === "week"){
                $query->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
            }
            else if($date_spp === "month"){
                $query->whereMonth('created_at', Carbon::now()->month);
            }
            else {
                $query->whereDate('created_at', Carbon::now());
            }

            if($order_type_spp === "online"){
                $query->where('order_type', "=", OrderType::DELIVERY->value);
            }

            if($order_type_spp === "walk-in"){
                $query->where('order_type', "!=", OrderType::DELIVERY->value);
            }
        })
        ->groupBy('product_id')
        ->with('product') // eager load product details
        ->orderByDesc('total_sales')
        ->get();

        $sales_per_product = $sales_per_product->map(function ($sale) {
            $sale->total_sales = (int) $sale->total_sales;
            return $sale;
        });



        return Inertia::render('Admin/Dashboard', [
            'total_sales' => $total_sales,
            'total_online_orders' => $total_online_orders,
            'total_orders' => $total_orders,
            'total_users' => $total_users,
            'year' => $year,
            'month' => $month,
            'week' => $week,
            'daily_sales' => [
                'online' => $total_sales_online,
                'walk_in' => $total_sales_walk_in
            ],
            'sales_per_product' => $sales_per_product,
            'filters_spp' => [
                'date' => $date_spp,
                'order_type' => $order_type_spp,
            ]
        ]);
    }
}
