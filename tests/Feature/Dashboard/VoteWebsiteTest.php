<?php

use App\Models\User;
use App\Models\File;
use Illuminate\Http\UploadedFile;

test('vote website create page', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('dashboard.vote-website.vwAdd'));

    $response->assertStatus(200);
});

test('vote website store', function () {

    $user = User::factory()->create();
    $filename = 'testlogo.png';

    $response = $this
        ->actingAs($user)
        ->from(route('dashboard.vote-website.vwAdd'))
        ->post(route('dashboard.vote-website.vwAddStore'), [
        'name' => 'Test Vote Website',
        'url' => 'https://testvotewebsite.com',
        'verification_key' => 'testapikey123',
        'has_verification' => true,
        'is_enabled' => true,
        'user_id' => $user->id,
        'file_logo_id' => File::factory()->create([
            'filename' => $filename,
            'user_id' => $user->id,
        ])->id
    ]);

    Storage::fake('images');
    UploadedFile::fake()->image($filename);

    $response
        ->assertRedirect(route('dashboard.vote-website.vwAdd'));

//    $response->assertRedirect(route('dashboard.vote-website.vwAdd'));
});
