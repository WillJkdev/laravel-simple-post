<?php

namespace App\Models;

use App\Events\PostCreated;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    protected $fillable = ['title', 'body'];

    //2. Dispara el evento PostCreated
    protected $dispatchesEvents = [
        'created' => PostCreated::class,
    ];
}
