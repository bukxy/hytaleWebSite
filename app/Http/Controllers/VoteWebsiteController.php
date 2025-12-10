<?php

namespace App\Http\Controllers;

use App\Http\Requests\VoteWebsiteCreateRequest;
use App\Models\VoteWebsite;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
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
        return Inertia::render('dashboard/votes_websites/add_edit', [
            'votes_websites' => VoteWebsite::with(['createdBy', 'updatedBy'])
                ->get()
                ->map(function ($vw) {
                    return [
                        'id' => $vw->id,
                        'name' => $vw->name,
                        'url' => $vw->url,
                        'created_at' => $vw->created_at,
                        'created_by' => $vw->createdBy->name,
                        'updated_at' => $vw->updated_at,
                        'updated_by' => $vw->updatedBy?->name,
                        'is_enabled' => $vw->is_enabled,
                        'has_verification' => $vw->has_verification,
                    ];
                }),
        ]);
    }

    public function addStore(VoteWebsiteCreateRequest $request): RedirectResponse
    {

        VoteWebsite::create($request->validated());

        return to_route('dashboard.vote-website.vwAdd')->with('success', 'Vote website created successfully.');
    }
}
