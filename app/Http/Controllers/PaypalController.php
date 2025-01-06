<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;


class PaypalController extends Controller
{
    private function getAccessToken(): string {
        $headers = [
            'Content-Type' => 'application/x-www-form-urlencoded',
            'Authorization' => 'Basic ' . base64_encode( config('paypal.client_id') . ':' .config('paypal.client_secret'))
        ];
        $response = Http::withHeaders($headers)
            ->withBody('grant_type=client_credentials')
            ->post(config('paypal.base_url') . '/v1/oauth2/token');

        return json_decode($response->body())->access_token;
    }

    public function create_order() {


        $carts = User::where('id', Auth::user()->id)->first()->carts()->with('product')->get();

        $total = 0;
        $carts->map(function ($cart) {
            $cart->total += $cart->product->price * $cart->quantity;
        });

        foreach ($carts as $cart) {
            $total += $cart->product->price * $cart->quantity;
        }

        $uuid = uuid_create();

        $headers = [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getAccessToken(),
        ];
        $response = Http::withHeaders($headers)
        ->post(config('paypal.base_url') .'/v2/checkout/orders', [
            'intent' => 'CAPTURE',
            'purchase_units' => [
                [
                    'reference_id' => $uuid,
                    'amount' => [
                        'currency_code' => config('paypal.currency'),
                        'value' => $total
                    ]
                ]
            ],
            'payment_source' => [
            'paypal' => [
                'experience_context' => [
                    'payment_method_preference' => 'IMMEDIATE_PAYMENT_REQUIRED',
                    'brand_name' => 'MANGO DRIVE',
                    'locale' => 'en-US',
                    'landing_page' => 'LOGIN',
                    'shipping_preference' => 'NO_SHIPPING',
                    'user_action' => 'PAY_NOW',
                    'return_url' => config('paypal.base_url') .'/cancel',
                    'cancel_url' => config('paypal.base_url') .'/return',
                ],
            ],
        ],
    ]);

    return json_decode($response->body())->id;
    }
    public function complete() {
        $url = config('paypal.base_url') . '/v2/checkout/orders/' . Session::get('order_id') .'/capture';

        $headers = [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getAccessToken()
        ];

        $response  = Http::withHeaders($headers)
            ->post($url, null);

        return json_decode($response->body());
    }
}
