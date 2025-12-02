<?php

namespace Database\Seeders;

use App\Models\Vote;
use App\Models\VoteWebsite;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        VoteWebsite::firstOrCreate(
            ['name' => 'TopG'],
            [
                'name' => 'TopG',
                'url' => 'https://topg.org/servers/minecraft/mcpe-servers/',
                'verification_key' => 'https://topg.org/servers/minecraft/mcpe-servers/vote/123456',
                'has_verification' => false,
                'is_enabled' => true,
            ]
        );

        foreach (range(1,15) as $vote) {
            Vote::Create(
                [
                    'user_id' => 1,
                    'vote_website_id' => 1,
                ]
            );
        }

    }
}
