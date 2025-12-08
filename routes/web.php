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

    Route::prefix('dashboard')->name('dashboard.')->group(function () {

        Route::get('/', function () { return Inertia::render('dashboard'); })->name('dashHome');

        Route::prefix('vote', )->group(function () {
            Route::get('/', [VoteController::class, 'retrieve'])->name('vVote');
        });

        Route::prefix('vote-website')->name('vote-website.')->group(function () {
            Route::controller(VoteWebsiteController::class)->group(function () {
//                    Route::get('/', 'retrieve')->name('list');
                Route::get('/add', 'add')->name('vwAdd');
                Route::post('/add', 'addStore')->name('vwAddStore');
            });
        });

    });

});

require __DIR__.'/settings.php';
