<?php

namespace App\Models;

use App\Enums\IsDeleted;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'is_deleted'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function scopeByName($query, $name){
        return $query->where('name', 'like',"%$name%");
    }
    public function scopeById($query, $id){
        return $query->where('id', '=', $id);
    }
    public function scopeIsNotDeleted($query)
    {
        return $query->where('is_deleted', '=', IsDeleted::NO->value);
    }
}
