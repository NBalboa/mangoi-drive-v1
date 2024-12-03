<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'address_id',
        'payment_type',
        'status',
        'total',
        'amount_render',
        'order_type'
    ];

    public function status(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Status::getStringValue($value)
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }



    public function items()
    {
        return $this->hasMany(OrderItem::class)->with('product');
    }

    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id');
    }


    public function scopeStatus($query, $status)
    {
        return $query->where('status', '=', $status - 1);
    }

    public function scopeSearch($query, $search)
    {
        return $query->whereAny([
            'id',
        ], 'like', '%' . $search . '%');
    }
}
