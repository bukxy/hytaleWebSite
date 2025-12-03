<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Vote extends Model
{
    /** @use HasFactory<\Database\Factories\VoteFactory> */
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'votes';

    protected $fillable = [
        'user_id',
        'created_at',
        'vote_website_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function voteWebsite()
    {
        return $this->belongsTo(VoteWebsite::class);
    }
}
