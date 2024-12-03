<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreOrderRequest extends FormRequest
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
            'orders' => 'required|array',
            'type' => 'required|numeric',
            'total' => 'required|numeric',
            'amount_render' => 'required|numeric'
        ];
    }

    public function after(): array {
        return [
            function (Validator $validator){
                if($this->input('total') > $this->input('amount_render')){
                    $validator->errors()->add('amount_render', 'Not enough payment');
                }
            }
        ];
    }

    public function messages(): array
    {
        return [
            'type.required' => 'Select an order type.'
        ];
    }
}
