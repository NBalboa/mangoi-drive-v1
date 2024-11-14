<?php

namespace App\Http\Controllers;

use App\Enums\IsDeleted;
use App\Http\Requests\StoreAddressRequest;
use App\Http\Requests\UpdateAddressRequest;
use App\Models\Address;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function create(StoreAddressRequest $request, User $user)
    {
        $validated = $request->all();
        Address::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'province' => $validated['province'],
            'barangay' => $validated['barangay'],
            'city' => $validated['city'],
            'street' => $validated['street']
        ]);

        return back();
    }


    public function edit(User $user, Address $address)
    {

        $isExist = $user->addresses()->get()->where('id', $address->id)->first()->exists();
        if ($isExist) {
            return Inertia::render('AddressEdit', [
                'address' => $address
            ]);
        }

        abort(Response::HTTP_NOT_FOUND);
    }


    public function update(UpdateAddressRequest $request, Address $address)
    {
        $validated = $request->all();

        $address->update([
            'name' => $validated['name'],
            'province' => $validated['province'],
            'barangay' => $validated['barangay'],
            'city' => $validated['city'],
            'street' => $validated['street']
        ]);

        return back();
    }


    public function delete(Address $address)
    {
        $address->is_deleted = IsDeleted::YES->value;
        $address->save();

        return back();
    }
}
