<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tutor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Validator;

class TutorController extends Controller
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
        return view('tutor.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación de campos requeridos
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'apellido' => 'required',
            'email' => 'required|email|unique:tutors,email',
            'password' => 'required|min:8',
            'bio' => 'required',
            'especialidad' => 'required',
            'anios_experiencia' => 'required|integer',
            'foto_perfil' => 'required|mimes:jpg,jpeg,png,gif'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $tutor = new Tutor();
        $tutor->nombre = $request->input('nombre');
        $tutor->apellido = $request->input('apellido');
        $tutor->email = $request->input('email');
        $tutor->password = bcrypt($request->input('password')); // Hash de la contraseña
        $tutor->bio = $request->input('bio');
        $tutor->especialidad = $request->input('especialidad');
        $tutor->anios_experiencia = $request->input('anios_experiencia');

        // Subida de la foto de perfil
        $foto_perfil = $request->file('foto_perfil');
        if ($foto_perfil) {
            $foto_path = time() . '_' . $foto_perfil->getClientOriginalName();
            Storage::disk('images')->put($foto_path, File::get($foto_perfil));
            $tutor->foto_perfil = $foto_path;
        }

        $tutor->save();

        return response()->json(['message' => 'El tutor se ha subido correctamente'], 200);
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
