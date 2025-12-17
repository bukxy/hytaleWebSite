<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class VoteWebsite extends Model
{
    /** @use HasFactory<\Database\Factories\VoteWebsiteFactory> */
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
        'user_id'
    ];

    protected static function booted()
    {
        static::deleting(function ($voteWebsite) {
            if ($voteWebsite->logo) {
                Storage::disk('public')->delete($voteWebsite->logo->path);
                $voteWebsite->logo->delete();
            }
        });
    }

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

    public function logo() {
        return $this->morphOne(File::class, 'fileable')
            ->where('type', '=',File::LOGO);
    }
}
