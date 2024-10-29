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
            'cost' => 'required|numeric|min:0',
            'due_date' => 'required|date|date_format:Y-m-d|after_or_equal:today',
            'order' => 'required|date|date_format:Y-m-d H:i:s|after_or_equal:today',
        ];
    }
}
