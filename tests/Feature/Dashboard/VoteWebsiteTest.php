<?php

use App\Models\User;
use App\Models\File;
use App\Models\VoteWebsite;
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

    $voteWebsite = VoteWebsite::factory()->create([
        'user_id' => $user->id,
    ]);

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
        'logo' => File::factory()->create([
            'filename' => $filename,
            'path' => $filename,
            'user_id' => $user->id,
            'type' => File::LOGO,
            'fileable_id' => $voteWebsite->id,
            'fileable_type' => VoteWebsite::class,
        ])->id
    ]);

    $response
        ->assertRedirect(route('dashboard.vote-website.vwAdd'));

//    $response->assertRedirect(route('dashboard.vote-website.vwAdd'));
});
