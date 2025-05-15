<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStocksRequest;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{

    public function create()
    {
        $products = Product::isNotDeleted()->soldByQuantity()->get();
        $suppliers = Supplier::select('id', 'name')->get();

        return Inertia::render("Admin/StocksAdd", [
            'products' => $products,
            'suppliers' => $suppliers
        ]);
    }


    public function store(StoreStocksRequest $request)
    {
        $product = Product::isNotDeleted()->where('id', "=", $request->input("product"))->first();
        $product->quantity = $product->quantity + $request->input('quantity');
        $product->save();

        // Stock::create([
        //     "supplier_id" => $request->input('supplier'),
        //     "product_id" => $product->id,
        //     "quantity" => $request->input('quantity')
        // ]);

        return back();
    }
}
