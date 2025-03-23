<?php

namespace App\Listeners;

use App\Events\PostDeleted;
use App\Notifications\PostDeletedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendPostDeletedNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(PostDeleted $event): void
    {
        $event->post->user->notify(new PostDeletedNotification($event->post));
    }
}
