<?php

namespace App\Models;

use App\Enums\IsDeleted;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = ["name"];

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function scopeSearch($query, $search){
        return $query->where('name', 'like', "%$search%");
    }

    public function scopeIsNotDeleted($query)
    {
        return $query->where('is_deleted', "=", IsDeleted::NO->value);
    }
}
