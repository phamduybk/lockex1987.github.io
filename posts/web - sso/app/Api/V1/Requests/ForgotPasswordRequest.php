<?php

namespace App\Api\V1\Requests;

use Dingo\Api\Http\FormRequest;

class ForgotPasswordRequest extends FormRequest
{
    public function rules()
    {
        return [
            'email' => 'required|email'
        ];
    }

    public function authorize()
    {
        return true;
    }
}
