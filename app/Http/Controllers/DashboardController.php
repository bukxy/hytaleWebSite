<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function home()
    {
        session()->put('breadcrumbs', [
            ['title' => 'Dashboard', 'href' => route('dashboard.home')],
        ]);

        return Inertia::render('dashboard/home');
    }
}
