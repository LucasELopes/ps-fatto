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
        $addWeek = fake()->numberBetween(0, 12); 

        return [
            'name' => fake()->text(50),
            'cost' => fake()->numberBetween(1, 1200),
            'due_date' => date('Y-m-d', strtotime("now +$addWeek week")),
            'order' => date('Y-m-d H:i:s', strtotime('now'))
        ];
    }
}
