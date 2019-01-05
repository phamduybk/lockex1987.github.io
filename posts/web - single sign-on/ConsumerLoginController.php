<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\User;
use App\Helpers\Sso;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Log;
use Auth;


class ConsumerLoginController extends Controller {

    public function __construct() {
        //$this->middleware('guest')->except('logout');
    }

	public function login() {
		$url = Sso::getSsoLoginUrl();
		return redirect($url);
	}

	public function logout() {
		$url = Sso::getSsoLogoutUrl();
		return redirect($url);
	}

	public function loginCallback(Request $request) {
		$obj = Sso::checkLoginCallback();
		if (! empty($obj->error)) {
			return 'Đã có lỗi xảy ra';
		}

		$user = $this->findOrCreateUser($obj);
		Auth::login($user);
		return redirect('/home');
	}

	public function logoutCallback(Request $request) {
		$obj = Sso::checkLogoutCallback();
		if (! empty($obj->error)) {
			return 'Đã có lỗi xảy ra';
		}

		// Hết hiệu lực session
		$this->guard()->logout();
        $request->session()->invalidate();
        return redirect('/');
	}

	/**
     * Get the guard to be used during authentication.
     */
    private function guard() {
        return Auth::guard();
    }

	/**
	 * Kiểm tra xem đã tồn tại người dùng hay chưa.
	 * Nếu chưa tồn tại thì thêm mới.
	 */
	private function findOrCreateUser($passportUser) {
        $authUser = User::where('email', $passportUser->email)->first();
        if ($authUser) {
            return $authUser;
        }
        return User::create([
            'name' => $passportUser->name,
            'email' => $passportUser->email
        ]);
    }
}
