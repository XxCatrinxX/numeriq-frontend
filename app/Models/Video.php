<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    // Define la relación con el modelo Tutor (o User)
    public function tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }
}
