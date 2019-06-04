<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
{
    public function rules()
    {
        return [
            'oldPassword' => 'required',
            'newPassword' => 'required',
            'rePassword' => 'required'
        ];
    }

    public function authorize()
    {
        return true;
    }
}
