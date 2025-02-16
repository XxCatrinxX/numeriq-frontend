<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\TutorController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Rutas de videos
Route::get('/videos/create', function (){
    return Inertia::render('videos/CreateVideo');
})->name('videos.create')->middleware('auth');

Route::post('/videos', [VideoController::class, 'store'])->name('videos.store');


//Rutas de tutores
Route::get('/tutores/create', function (){
    return Inertia::render('Tutors/CreateTutor');
})->name('tutores.create')->middleware('auth');

Route::post('/tutores', [TutorController::class, 'store'])->name('tutores.store');

require __DIR__.'/auth.php';
