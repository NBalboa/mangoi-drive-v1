<?php

namespace App\Http\Controllers;

use App\Enums\IsAvailable;
use App\Enums\IsDeleted;
use App\Enums\SoldByQuantity;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductAvailableRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {

        $products = Product::with('category')->isNotDeleted()->paginate(10);
        $products->map(function ($product) {
            $product->image = Storage::url($product->image);
        });

        $IS_AVAILABLE = [
            "YES" => IsAvailable::YES->value,
            "NO" => IsAvailable::NO->value
        ];

        return Inertia::render('Admin/Product', [
            'products' => $products,
            'IS_AVAILABLE' => $IS_AVAILABLE
        ]);
    }

    public function create()
    {

        $categories = Category::select('id', 'name')->get();
        $suppliers = Supplier::select('id', 'name')->get();
        return Inertia::render('Admin/ProductsCreate', [
            'categories' => $categories,
            'suppliers' => $suppliers
        ]);
    }



    public function store(StoreProductRequest $request)
    {
        $sold_by_quantity = $request->input("sold_by_quantity");
        if ($sold_by_quantity) {
            $request->validate([
                'quantity' => 'required|numeric|min:0',
                'supplier' => 'required|numeric|'
            ]);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = $image->store("products/images", "public");
        }

        $product = Product::create([
            "name" => $request->input('name'),
            "price" =>  $request->input("price"),
            "category_id" => $request->input("category"),
            "sold_by_quantity" => ($sold_by_quantity ? SoldByQuantity::YES->value : SoldByQuantity::NO->value),
            "quantity" => ($sold_by_quantity ? $request->input("quantity") : null),
            "image" => $path
        ]);

        if ($sold_by_quantity) {
            Stock::create([
                "product_id" => $product->id,
                "supplier_id" => $request->input('supplier'),
                "quantity" => $request->input('quantity')
            ]);
        }

        return redirect()->route("products.create");
    }

    public function edit(Product $product)
    {
        $categories = Category::select('id', 'name')->get();
        $suppliers = Supplier::select('id', 'name')->get();
        $product->image =
            Storage::url($product->image);

        $SOLD_BY_QUANTITY = SoldByQuantity::YES->value;
        return Inertia::render("Admin/ProductEdit", [
            "product" => $product,
            "categories" => $categories,
            "suppliers" => $suppliers,
            "SOLD_BY_QUANTITY" => $SOLD_BY_QUANTITY
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {

        $validated =  $request->all();


        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = $image->store("products/images", "public");
            $product->image = $path;
        }
        $product->name = $validated["name"];
        $product->price = $validated["price"];
        $product->category_id = $validated["category"];
        $product->save();

        return back();
    }


    public function delete(Product $product)
    {
        $product->is_deleted = IsDeleted::YES->value;
        $product->save();

        return to_route("products.index");
    }

    public function available(UpdateProductAvailableRequest $request, Product $product)
    {
        $product->is_available = $request->input('is_available');
        $product->save();

        return back();
    }
}