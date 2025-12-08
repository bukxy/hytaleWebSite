<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoteWebsiteController extends Controller
{

//    public function retrieve()
//    {
//        return Inertia::render('dashboard/votes_websites/list', [
//            // 'vote_websites' => VoteWebsite::all(),
//        ]);
//    }

    public function add()
    {
        return Inertia::render('dashboard/votes_websites/add_edit');
    }

    public function addStore(Request $request)
    {
        // Validate and store the new vote website
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url',
            'description' => 'nullable|string',
        ]);

        // VoteWebsite::create($validated);

        return redirect()->route('dashboard-vote-website')->with('success', 'Vote website created successfully.');
    }
}
