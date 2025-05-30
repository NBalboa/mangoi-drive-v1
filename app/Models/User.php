<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'phone',
        'password',
        'role',
        'email',
        'password',
        "is_validId",
        "valid_id",
        'remember_token'
    ];


    public function scopeSearch($query, $search)
    {
        return $query->whereAny([
            'first_name',
            'last_name',
            'phone',
            'middle_name'
        ], 'like', '%' . $search . '%');
    }

    public function carts()
    {
        return $this->hasMany(Cart::class, 'user_id');
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
