<?php

namespace App\Models;

use App\Enums\IsDeleted;
use App\Enums\SoldByQuantity;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        "name",
        "price",
        "category_id",
        "sold_by_quantity",
        "quantity",
        "image"
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function scopeIsNotDeleted($query)
    {
        return $query->where('is_deleted', '=', IsDeleted::NO->value);
    }

    public function scopeSoldByQuantity($query)
    {

        return $query->where('sold_by_quantity', '=', SoldByQuantity::YES->value);
    }
}
