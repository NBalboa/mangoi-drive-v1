<?php

use App\Enums\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('address_id')->nullable();
            $table->tinyInteger('payment_type');
            $table->tinyInteger('status')->default(Status::PENDING->value);
            $table->tinyInteger('order_type');
            $table->integer('etd')->nullable();
            $table->string('gcash')->nullable();
            $table->decimal('delivery_fee', 10, 2)->nullable();
            $table->decimal("total", 10, 2);
            $table->decimal("amount_render", 10,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
