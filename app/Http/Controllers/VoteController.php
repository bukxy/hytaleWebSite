<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\VoteReward;
use App\Models\VoteWebsite;
use Inertia\Inertia;

class VoteController extends Controller
{
    public function retrieve()
    {
        return Inertia::render('dashboard/votes/list', [
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
