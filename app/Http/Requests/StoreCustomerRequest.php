<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
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
            "first_name" => "required|string",
            "last_name" => "required|string",
            "phone" => "required|string|unique:users|min:11|max:11",
            "email" => "required|email|string|unique:users",
            "password" => "required|string|same:confirm_password|min:7",
            "confirm_password" => "required|string|min:7",
            "valid_id" => "required|image|mimes:png,jpg,jpeg",
        ];
    }
}
