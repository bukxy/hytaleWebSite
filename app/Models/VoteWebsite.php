<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoteWebsite extends Model
{
    /** @use HasFactory<\Database\Factories\VotesWebsitesFactory> */
    use HasFactory;

    protected $table = 'votes_websites';

    protected $fillable = [
        'name',
        'url',
        'is_enabled',
        'verification_key',
        'has_verification',
        'created_by',
        'updated_by',
        'user_id',
        'file_logo_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
