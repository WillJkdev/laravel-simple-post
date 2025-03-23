<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('posts.index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('posts.index');
    });

    Route::resource('posts', PostController::class)
        ->only(['index', 'store', 'update', 'destroy']);
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
