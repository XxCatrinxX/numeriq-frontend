<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Validation\ValidatesRequests;


class VideoController extends Controller
{

    use ValidatesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('video.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación de campos requeridos
        $this->validate($request, [
            'titulo' => 'required|min:5',
            'descripcion' => 'required',
            'video' => 'required|mimes:mp4',
            'image' => 'required|mimes:jpg,jpeg,png,gif'
        ]);

        $video = new Video();
        $tutor = Auth::user(); // Asegúrate de que el tutor esté autenticado
        $video->tutor_id = $tutor->id; // Asigna el ID del tutor al video
        $video->titulo = $request->input('titulo');
        $video->descripcion = $request->input('descripcion');

        // Subida de la miniatura
        $image = $request->file('image');
        if ($image) {
            $image_path = time() . '_' . $image->getClientOriginalName();
            Storage::disk('images')->put($image_path, File::get($image));
            $video->image = $image_path;
        }

        // Subida del video
        $video_file = $request->file('video');
        if ($video_file) {
            $video_path = time() . '_' . $video_file->getClientOriginalName();
            Storage::disk('videos')->put($video_path, File::get($video_file));
            $video->video_path = $video_path;
        }

        $video->status = 1;
        $video->save();

        return redirect()->route('dashboard')->with('message', 'El video se ha subido correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
