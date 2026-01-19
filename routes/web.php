<?php

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

        Route::get('/', [\App\Http\Controllers\DashboardController::class, 'home'])->name('home');

        Route::prefix('vote')->name('vote.')->group(function () {
            Route::controller(\App\Http\Controllers\VoteController::class)->group(function () {
                Route::get('/', 'retrieve')->name('list');
            });
        });

        Route::prefix('vote-website')->name('vote-website.')->group(function () {
            Route::controller(\App\Http\Controllers\VoteWebsiteController::class)->group(function () {
                Route::get('/add', 'add')->name('add');
                Route::post('/add', 'addStore')->name('addStore');

                Route::get('/edit/{id}', 'edit')->name('edit');
                Route::patch('/edit/{id}', 'editStore')->name('editStore');

                Route::delete('/delete/{id}', 'delete')->name('delete');
                Route::delete('/delete/{id}/logo', 'deleteLogo')->name('deleteLogo');
            });
        });

        Route::prefix('vote-reward')->name('vote-reward.')->group(function () {
            Route::controller(\App\Http\Controllers\VoteRewardsController::class)->group(function () {
                Route::get('/add', 'add')->name('add');
                Route::post('/add', 'addStore')->name('addStore');

                Route::get('/edit/{id}', 'edit')->name('edit');
                Route::patch('/edit/{id}', 'editStore')->name('editStore');

                Route::delete('/delete/{id}', 'delete')->name('delete');
            });
        });

    });

});

require __DIR__.'/settings.php';
