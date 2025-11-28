<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\VotesWebsites;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesSeeder::class,
            UserSeeder::class,
            VotesWebsitesSeeder::class,
            VoteSeeder::class,
        ]);
    }
}
