<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\votes_websites>
 */
class VoteWebsiteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Test Vote Website',
            'url' => 'https://testvotewebsite.com',
            'verification_key' => 'testapikey123',
            'has_verification' => true,
            'is_enabled' => true,
            'created_by' => User::factory()
        ];
    }
}
