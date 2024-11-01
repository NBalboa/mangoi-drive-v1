<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    $categories = Category::select('id', 'name')->get();
    $products = Product::isNotDeleted()->isAvailable();

    if ($request->input("search")) {
        $search = $request->input("search");
        $products = $products->where('name', 'like', '%' . $search . '%');
    }

    if ($request->input("filter")) {
        $filter = $request->input("filter");
        $products = $products->where('category_id', '=', $filter['id']);
    }


    $products = $products->get();

    $products->map(function ($product) {
        $product->image = Storage::url($product->image);
    });

    return Inertia::render('Welcome', [
        'categories' => $categories,
        'products' => $products
    ]);
})->name('home');

Route::get('/register', [CustomerController::class, 'register'])->name('customers.register');
Route::post('/register', [CustomerController::class, 'store'])->name('customers.store');

Route::post('/logout', [UserController::class, 'logout'])->name('users.logout');
Route::get('/login', [UserController::class, 'login'])->name('users.login');
Route::post('/signin', [UserController::class, 'signin'])->name('users.signin');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
Route::post('/products/create', [ProductController::class, 'store'])->name('products.store');
Route::post('/products/edit/{product}', [ProductController::class, 'update'])->name('products.update');
Route::get('/products/edit/{product}', [ProductController::class, 'edit'])->name('products.edit');
Route::put('/products/available/{product}', [ProductController::class, 'available'])->name('products.available');
Route::delete('/products/{product}', [ProductController::class, 'delete'])->name('products.delete');

Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
Route::post('/categories/create', [CategoryController::class, 'store'])->name('categories.store');

Route::get('/suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
Route::get('/suppliers/create', [SupplierController::class, 'create'])->name('suppliers.create');
Route::post('/suppliers/create', [SupplierController::class, 'store'])->name('suppliers.store');
Route::get('/suppliers/edit/{supplier}', [SupplierController::class, 'edit'])->name('suppliers.edit');
Route::put('/suppliers/edit/{supplier}', [SupplierController::class, 'update'])->name('suppliers.update');
Route::delete('/suppliers/{supplier}', [SupplierController::class, 'delete'])->name('suppliers.delete');

Route::get('/stocks/create', [StockController::class, 'create'])->name("stocks.create");
Route::post('/stocks/create', [StockController::class, 'store'])->name('stocks.store');
