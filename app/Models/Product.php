<?php

namespace App\Models;

use App\Enums\IsAvailable;
use App\Enums\IsDeleted;
use App\Enums\SoldByQuantity;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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


    public function image(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Storage::url($value)
        );
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function scopeSearch(Builder $query, string $search)
    {
        return $query->whereAny([
            'name',
            'id',
            'price',
            'quantity'
        ],'like', '%' . $search . '%');
    }
    public function scopeByCategory(Builder $query, int $category)
    {
        return $query->where('category_id', '=', $category);
    }

    public function scopeIsNotDeleted(Builder $query)
    {
        return $query->where('is_deleted', '=', IsDeleted::NO->value);
    }

    public function scopeByAvailable($query, $available){
        return $query->where('is_available', '=', $available - 1);
    }

    public function scopeIsAvailable(Builder $query)
    {
        return $query->where('is_available', '=', IsAvailable::YES->value);
    }

    public function scopeSoldByQuantity(Builder $query)
    {

        return $query->where('sold_by_quantity', '=', SoldByQuantity::YES->value);
    }
}
