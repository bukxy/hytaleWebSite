<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoteReward extends Model
{
    /** @use HasFactory<\Database\Factories\VoteRewardsFactory> */
    use HasFactory;

    protected $table = 'votes_rewards';

    protected $fillable = [
        'name',
        'chances',
        'is_enabled',
        'is_online_required',
        'money',
        'commands',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_enabled' => 'boolean',
        'is_online_required' => 'boolean',
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function image() {
        return $this->morphOne(File::class, 'fileable')
            ->where('type', '=',File::REWARD_IMAGE);
    }
}
