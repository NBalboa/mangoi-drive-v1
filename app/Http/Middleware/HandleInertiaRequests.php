<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => Auth::user() ?? null,
                'cart_total' => UserRole::CUSTOMER->value === Auth::user()?->role ? User::where('id', Auth::user()->id)->first()->carts()->get()->count() : null,
                'roles' => [
                    'ADMIN' => UserRole::ADMIN->value,
                    'CUSTOMER' => UserRole::CUSTOMER->value
                ]
            ],
        ]);
    }
}
