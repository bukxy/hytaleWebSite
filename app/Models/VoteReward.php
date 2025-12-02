<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoteReward extends Model
{
    /** @use HasFactory<\Database\Factories\VoteRewardsFactory> */
    use HasFactory;

    protected $table = 'votes_rewards';
}
