<?php

namespace App\Http\Controllers;

use App\Events\PostDeleted;
use App\Events\PostUpdated;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Posts/index', [
            'posts' => Post::with('user:id,name')->latest()->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'body' => 'required|string|max:255',
        ]);
        $request->user()->posts()->create($validated); //1. create post
        return redirect()->route('posts.index')->with('flash', [
            'type' => 'success',   // 'error', 'warning', 'info'
            'message' => '¡Post creado con éxito!',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('update', $post);
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'body' => 'required|string|max:255',
        ]);
        $post->update($validated);
        event(new PostUpdated($post));
        return redirect(route('posts.index'))->with('flash', [
            'type' => 'info',   // 'error', 'warning', 'info'
            'message' => '¡Post actualizado con éxito!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('delete', $post);
        event(new PostDeleted($post));
        $post->delete();
        return redirect(route('posts.index'))->with('flash', [
            'type' => 'error',   // 'error', 'warning', 'info'
            'message' => '¡Post eliminado con éxito!',
        ]);
    }
}
