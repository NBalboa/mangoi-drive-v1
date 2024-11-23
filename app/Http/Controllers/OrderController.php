<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render("Admin/Orders");
    }

    public function create(Request $request)
    {
        $categories = Category::select('id', 'name')->isNotDeleted()->get();
        $products = Product::isNotDeleted();
        $search = $request->input('search');
        $category = $request->input('category');


        if ($search) {
            $products = $products->search($search);
        }

        if ($category) {
            $products = $products->byCategory($category);
        }
        $products = $products->get();

        return Inertia::render("Admin/OrdersCreate", [
            'categories' => $categories,
            'products' => $products,
            'filters' =>  [
                'search' => $search ?? "",
                'category' => $category ?? ""
            ],
        ]);
    }
}
