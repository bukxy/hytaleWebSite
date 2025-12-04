<?php

use App\Http\Controllers\VoteController;
use App\Http\Controllers\VoteWebsiteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

/**
 * Frontend Routes
 */
Route::get('/', function () {
    return Inertia::render('home', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/vote', function () {
    return Inertia::render('vote');
})->name('vote');

Route::get('/wiki', function () {
    return Inertia::render('wiki');
})->name('wiki');

Route::get('/stats', function () {
    return Inertia::render('stats');
})->name('stats');

Route::get('/shop', function () {
    return Inertia::render('shop');
})->name('shop');

/**
 * Dashboard Route
 */
Route::middleware(['auth', 'verified'])->group(function () {

    Route::name('dashboard_')->group(function () {
        Route::prefix('dashboard')->group(function () {

            Route::get('/', function () { return Inertia::render('dashboard'); })->name('home');

            Route::prefix('vote', )->group(function () {
                Route::get('/', [VoteController::class, 'retrieve'])->name('vote');
            });

            Route::prefix('vote_website', )->group(function () {
                Route::get('/', [VoteWebsiteController::class, 'retrieve'])->name('vote_website');
                Route::get('/create', [VoteWebsiteController::class, 'create'])->name('vote_website_create');
            });

        });
    });

});

require __DIR__.'/settings.php';
