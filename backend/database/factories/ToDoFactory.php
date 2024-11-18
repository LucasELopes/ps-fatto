<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ToDo>
 */
class ToDoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $addWeek = fake()->numberBetween(0, 52); 

        return [
            'name' => fake()->unique()->text(20),
            'cost' => fake()->randomFloat(2, 1, 2000),
            'due_date' => date('Y-m-d', strtotime("01/01/2024 +$addWeek week")),
            'order' => fake()->unique()->numberBetween(0, 1000)
        ];
    }
}
