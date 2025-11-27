<?php

namespace App\Http\Controllers;

use App\Models\VotesWebsites;
use Inertia\Inertia;

class VoteController extends Controller
{
    public function retrieve()
    {
        return Inertia::render('vote', [
            'votes_websites' => VotesWebsites::all(),
        ]);
    }
}
