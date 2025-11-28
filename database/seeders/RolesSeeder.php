<?php

namespace Database\Seeders;

use App\Models\Roles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Roles::firstOrCreate(
            ['name' => 'Player'],
            [
                'name' => 'Player',
                'color' => 'FF0000',
                'is_admin' => false
            ]
        );
    }
}
