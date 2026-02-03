<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AppearanceController extends Controller
{

    private function setBreadcrumbs(array $crumbs): void
    {
        session()->put('breadcrumbs', array_merge([
            ['title' => 'Dashboard', 'href' => route('dashboard.home')],
        ], $crumbs));
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $this->setBreadcrumbs([
            ['title' => 'Appearance', 'href' => route('appearance.edit')],
        ]);

        return Inertia::render('dashboard/settings/appearance');
    }
}
