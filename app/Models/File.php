<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    /** @use HasFactory<\Database\Factories\FileFactory> */
    use HasFactory;

    protected $table = 'files';

    const LOGO = "logo";

    protected $fillable = [
        'filename',
        'path',
        'type',
        'user_id',
    ];

    public function fileable()
    {
        return $this->morphTo();
    }
}
