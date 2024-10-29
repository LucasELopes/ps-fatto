<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDo extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'to_dos';
    protected $fillable = [
        'name',
        'cost',
        'due_date',
        'order'
    ];

}
