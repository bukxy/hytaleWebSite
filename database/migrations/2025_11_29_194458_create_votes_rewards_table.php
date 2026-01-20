<?php

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
        Schema::create('votes_rewards', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->decimal('chances');
            $table->decimal('money')->nullable();
            $table->text('commands')->nullable();
            $table->boolean('is_online_required')->default(false);
            $table->boolean('is_enabled')->default(true);

            $table->unsignedBigInteger('created_by');
            $table->foreign('created_by')->references('id')->on('users')->cascadeOnDelete();

            $table->unsignedBigInteger('updated_by')->nullable();
            $table->foreign('updated_by')->references('id')->on('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votes_rewards');
    }
};
