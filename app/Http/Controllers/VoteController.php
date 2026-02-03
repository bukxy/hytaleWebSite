<?php

namespace App\Http\Controllers;

use App\Http\Resources\VoteWebsiteResource;
use App\Models\Vote;
use App\Models\VoteReward;
use App\Models\VoteWebsite;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VoteController extends Controller
{

    private function setBreadcrumbs(array $crumbs): void
    {
        session()->put('breadcrumbs', array_merge([
            ['title' => 'Dashboard', 'href' => route('dashboard.home')],
        ], $crumbs));
    }

    public function retrieve()
    {

        $this->setBreadcrumbs([
            ['title' => 'Votes', 'href' => route('dashboard.vote.list')],
        ]);

        return Inertia::render('dashboard/votes/list', [
            'votes_websites' => VoteWebsiteResource::collection(VoteWebsite::with(['createdBy', 'updatedBy', 'logo'])->get()),
            'votes' => Vote::with(['user', 'voteWebsite'])
                ->get()
                ->map(function ($vote) {
                    return [
                        'id' => $vote->id,
                        'voter_name' => $vote->user->name,
                        'voter_email' => $vote->user->email,
                        'website' => $vote->voteWebsite->name,
                        'created_at' => $vote->created_at,
                    ];
                }),
//            'votes_rewards' => VoteReward::all()
        ]);
    }
}
