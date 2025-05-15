<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::create([
            'first_name' => "Super",
            'last_name' => "Admin",
            'phone' => "09123456789",
            'email' => "admin@admin.com",
            'password' => Hash::make('password'),
            'role' => UserRole::ADMIN->value,
            'remember_token' => Str::random(10),
        ]);
    }
}
