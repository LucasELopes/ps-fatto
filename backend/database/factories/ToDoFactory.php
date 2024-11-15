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
        $addWeek = fake()->numberBetween(0, 160); 

        return [
            'name' => fake()->text(50),
            // 'description' => fake()->text(),
            'cost' => fake()->numberBetween(1, 1200),
            'due_date' => date('Y-m-d', strtotime("01/01/2024 +$addWeek week")),
            'order' => date('Y-m-d H:i:s', strtotime('now'))
        ];
    }
}
