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
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
