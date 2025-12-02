<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoteWebsite extends Model
{
    /** @use HasFactory<\Database\Factories\VotesWebsitesFactory> */
    use HasFactory;

    protected $table = 'votes_websites';
}
