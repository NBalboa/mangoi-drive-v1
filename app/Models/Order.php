<?php

namespace App\Models;

use App\Enums\OrderType;
use App\Enums\PaymentType;
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
        'order_type',
        'etd',
        'delivery_fee',
        'gcash'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function scopeStatus($query, $status)
    {
        return $query->where('status', '=', $status - 1);
    }


    public function scopeOrderType($query, $status){
        return $query->where('order_type', '=', $status - 1);
    }

    public function scopeSearch($query, $search)
    {
        return $query->whereAny([
            'id',
        ], 'like', '%' . $search . '%');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class)->with('product');
    }

    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id');
    }
}
