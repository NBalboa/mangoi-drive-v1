<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OnlineOrderController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaypalController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminOnly;
use App\Http\Middleware\CustomerOnly;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function (Request $request) {
    $categories = Category::select('id', 'name')->isNotDeleted()->get();

    $products = Product::with('category')->isNotDeleted()->isAvailable();

    if ($request->input("search")) {
        $search = $request->input("search");
        $products = $products->where('name', 'like', '%' . $search . '%');
    }

    if ($request->input("filter")) {
        $filter = $request->input("filter");
        $products = $products->where('category_id', '=', $filter['id']);
    }


    $products = $products->get();

    return Inertia::render('Welcome', [
        'categories' => $categories,
        'products' => $products,
        'search' => $request->input("search"),
        'filter' => $request->input("filter")
    ]);
})->name('home');


Route::get('/menu', function (Request $request) {


    $categories = Category::select('id', 'name')->isNotDeleted()->get();
    $products = Product::with('category')->isNotDeleted()->isAvailable();

    if ($request->input("search")) {
        $search = $request->input("search");
        $products = $products->where('name', 'like', '%' . $search . '%');
    }

    if ($request->input("filter")) {
        $filter = $request->input("filter");
        $products = $products->where('category_id', '=', $filter['id']);
    }



    $products = $products->get();


    return Inertia::render('Menu', [
        'categories' => $categories,
        'products' => $products,
        'search' => $request->input("search"),
        'filter' => $request->input("filter")
    ]);

})->name('menu');

Route::get('/menus/{category}/{product}', [ProductController::class, 'detail'])->name('products.details');
Route::post('/online/orders/changestatus', [OnlineOrderController::class, 'updateOrderStatus'])->name('online.orders.changestatus');


Route::middleware(['guest'])->group(function () {
    Route::get('/register', [CustomerController::class, 'register'])->name('customers.register');
    Route::post('/register', [CustomerController::class, 'store'])->name('customers.store');
    Route::get('/login', [UserController::class, 'login'])->name('login');
    Route::post('/signin', [UserController::class, 'signin'])->name('users.signin');
});

Route::middleware(['auth'])->group(function () {

    Route::post('/logout', [UserController::class, 'logout'])->name('users.logout');

    Route::middleware(CustomerOnly::class)->group(function() {
        Route::get('/name', [CustomerController::class, 'name'])->name('customers.name');
        Route::put('/name/{user}', [CustomerController::class, 'updateName'])->name('customers.update.name');
        Route::get('/contact', [CustomerController::class, 'contact'])->name('customers.contact');
        Route::put('/email/{user}', [CustomerController::class, 'updateEmail'])->name('customers.update.email');
        Route::put('/phone/{user}', [CustomerController::class, 'updatePhone'])->name('customers.update.phone');

        Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
        Route::post('/cart/{user}/{product}', [CartController::class, 'store'])->name('cart.store');
        Route::put('/cart/add/{cart}', [CartController::class, 'add'])->name('cart.add');
        Route::put('/cart/subtract/{cart}', [CartController::class, 'subtract'])->name('cart.subtract');
        Route::delete('/cart/{cart}', [CartController::class, 'delete'])->name('cart.delete');

        Route::post('/online/orders/{user}', [OnlineOrderController::class, 'store'])->name('online.orders.store');

        Route::get('/account', [UserController::class, 'account'])->name('users.account');
        Route::get('/address', [UserController::class, 'address'])->name('users.address');
        Route::get('/my/orders', [UserController::class, 'orders'])->name('users.orders');
        Route::get('/my/orders/{order}/items', [UserController::class, 'items'])->name('users.items');
        Route::get('/my/orders/{order}/receipt', [UserController::class, 'receipt'])->name('users.receipt');

        Route::post('/address/{user}', [AddressController::class, 'create'])->name('addresses.create');
        Route::get('/address/{user}/{address}', [AddressController::class, 'edit'])->name('addresses.edit');
        Route::put('/address/{address}', [AddressController::class, 'update'])->name('addresses.update');
        Route::delete('/address/{address}', [AddressController::class, 'delete'])->name('addresses.delete');
        Route::post('/address/active/{user}/{address}', [AddressController::class, 'active'])->name('addresses.active');
    });

    Route::middleware(AdminOnly::class)->group(function () {
        Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
        Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
        Route::post('/orders/create', [OrderController::class, 'store'])->name('orders.store');
        Route::put('/orders/status/{id}', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
        Route::get('/online/orders/details/{order}', [OnlineOrderController::class, 'details'])->name("onlines.orders.details");
        Route::post('/online/orders/details/{order}', [OnlineOrderController::class, 'more'])->name("onlines.orders.details");

        Route::get('/orders/receipt/{order}', [ReceiptController::class, 'order'])->name('receipt.order');

        Route::get('/items/{order}', [ItemController::class, 'index'])->name('items.index');

        Route::get('/online/orders', [OnlineOrderController::class, 'index'])->name('online.orders.index');
        Route::get('/online/orders/{order}', [OnlineOrderController::class, 'order'])->name('online.orders.order');

        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/products/create', [ProductController::class, 'store'])->name('products.store');
        Route::post('/products/edit/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::get('/products/edit/{product}', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('/products/available/{product}', [ProductController::class, 'available'])->name('products.available');
        Route::delete('/products/{product}', [ProductController::class, 'delete'])->name('products.delete');

        Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
        Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
        Route::post('/categories/create', [CategoryController::class, 'store'])->name('categories.store');
        Route::get('/categories/edit/{category}', [CategoryController::class, 'edit'])->name('categories.edit');
        Route::put('/categories/edit/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/categories/{category}', [CategoryController::class, 'delete'])->name('categories.delete');


        Route::get('/suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
        Route::get('/suppliers/create', [SupplierController::class, 'create'])->name('suppliers.create');
        Route::post('/suppliers/create', [SupplierController::class, 'store'])->name('suppliers.store');
        Route::get('/suppliers/edit/{supplier}', [SupplierController::class, 'edit'])->name('suppliers.edit');
        Route::put('/suppliers/edit/{supplier}', [SupplierController::class, 'update'])->name('suppliers.update');
        Route::delete('/suppliers/{supplier}', [SupplierController::class, 'delete'])->name('suppliers.delete');

        Route::get('/stocks/create', [StockController::class, 'create'])->name("stocks.create");
        Route::post('/stocks/create', [StockController::class, 'store'])->name('stocks.store');

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
        Route::get('/users', [UserController::class, 'index'])->name('admin.users.index');
        Route::put('/users/validateId', [UserController::class, 'validateId'])->name('admin.users.index');
    });


    // Route::post('/create_order', [PaypalController::class, 'create_order'])->name('paypal.create_order');
    // Route::post('/complete', [PaypalController::class, 'complete'])->name('paypal.complete');
});
