<?php

namespace App\Models;

use App\Enums\IsDeleted;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    //
    protected $fillable = [
        "user_id",
        "supplier_id",
        "name",
        "street",
        "barangay",
        "city",
        "province"
    ];

    public function scopeSearch($query, $search)
    {
        return $query->whereAny([
            'street',
            'barangay',
            'city',
            'province'
        ], 'like', '%' . $search . '%');
    }


    public function scopeNotDeleted($query)
    {
        return $query->where('is_deleted', '=', IsDeleted::NO->value);
    }
}
