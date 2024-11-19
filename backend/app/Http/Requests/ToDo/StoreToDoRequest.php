<?php

namespace App\Http\Requests\ToDo;

use Illuminate\Foundation\Http\FormRequest;

class StoreToDoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:2|max:50|unique:to_dos,name',
            // 'description' => 'nullable|string|max:255',
            'cost' => 'required|numeric|min:0',
            'due_date' => 'required|date|date_format:Y-m-d',
        ];
    }

    public function messages(): array {
        return [
            'name.required' => 'O nome da tarefa é obrigatório.',
            'name.string' => 'O nome da tarefa deve ser um texto.',
            'name.min' => 'O nome da tarefa deve ter pelo menos :min caracteres.',
            'name.max' => 'O nome da tarefa não pode exceder :max caracteres.',
            'name.unique' => 'O nome da tarefa já existe.',

            'cost.required' => 'O custo é obrigatório.',
            'cost.numeric' => 'O custo deve ser um número válido.',
            'cost.min' => 'O custo deve ser pelo menos :min.',

            'due_date.required' => 'A data de vencimento é obrigatória.',
            'due_date.date' => 'A data de vencimento deve ser uma data válida.',
            'due_date.date_format' => 'A data de vencimento deve estar no formato :format.',
        ];
    }
}
