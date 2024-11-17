<?php

namespace Database\Seeders;

use App\Models\ToDo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ToDoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ToDo::factory(300)->create();
    }
}
