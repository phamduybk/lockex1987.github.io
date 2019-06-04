<?php

namespace App\Http\Controllers;

use App\User;

class AccountController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Vào trang đổi mật khẩu.
     */
    public function index()
    {
        return view('account.index');
    }

    /**
     * Thực hiện đổi mật khẩu.
     */
    public function save()
    {
        $password = request('password');
        $user = auth()->user();
        $user->password = bcrypt($password);
        $user->save();
        return [
            'code' => 0
        ];
    }
}
