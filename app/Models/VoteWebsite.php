<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoteWebsite extends Model
{
    /** @use HasFactory<\Database\Factories\VotesWebsitesFactory> */
    use HasFactory;

    protected $table = 'votes_websites';

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
