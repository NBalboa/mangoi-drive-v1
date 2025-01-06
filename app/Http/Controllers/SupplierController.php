<?php

namespace App\Http\Controllers;

use App\Enums\IsDeleted;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Models\Address;
use App\Models\Product;
use App\Models\Supplier;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{

    public function index(Request $request)
    {
        $suppliers = Supplier::with('address');
        if($request->input('search')){
            $search = $request->input('search');
            $suppliers = $suppliers->search($search)
                ->orWhereHas('address', function ($query) use ($search) {
                $query->search($search);
            });
        }

        $suppliers = $suppliers->isNotDeleted()->paginate(10);

        return Inertia::render("Admin/Suppliers", [
            "suppliers" => $suppliers
        ]);
    }

    public function create()
    {
        return Inertia::render("Admin/SupplierCreate");
    }

    public function store(StoreSupplierRequest $request)
    {

        $supplier = Supplier::create([
            "name" => $request->input("name")
        ]);

        Address::create([
            "supplier_id" => $supplier->id,
            "street" => $request->input("street"),
            "city" => $request->input("city"),
            "barangay" => $request->input("barangay"),
            "province" => $request->input("province")
        ]);

        return redirect()->route('suppliers.create');
    }

    public function edit(Supplier $supplier)
    {

        $address = Address::where("supplier_id", $supplier->id)->get()->first();

        return Inertia::render("Admin/SupplierEdit", [
            "supplier" => $supplier,
            "address" => $address
        ]);
    }


    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        $address = Address::where("supplier_id", $supplier->id)->get()->first();
        $supplier->update([
            "name" => $request->input("name")
        ]);

        $address->update([
            "street" => $request->input("street"),
            "city" => $request->input("city"),
            "barangay" => $request->input("barangay"),
            "province" => $request->input("province")
        ]);

        return back();
    }

    public function delete(Supplier $supplier)
    {

        $supplier->is_deleted = IsDeleted::YES->value;
        $supplier->save();

        return to_route("suppliers.index");
    }
}
