<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Ixudra\Curl\Facades\Curl;
use App\User;


class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function loginCallback(Request $request)
    {
        $authorization = $request->header('Authorization');
        $token = str_replace('Bearer ', '', $authorization);

        $ssoUser = json_decode($this->callSsoApi($token));

        $user = User::where('name', '=', $ssoUser->name)->first();
        if (! $user) {
            $user = new User();
            $user->name = $ssoUser->name;
            //$user->display_name = $ssoUser->fullname;
            $user->email = $ssoUser->email;
            $user->save();
        }

        auth()->login($user);

        return response()->json([
            'message' => 'Successfully logged in'
        ]);
    }

    /**
     * Gọi API để lấy thông tin người dùng.
     */
    private function callSsoApi($token)
    {
        $url = config('services.sso.apiRoot') . '/api/user';
        $request = Curl::to($url)
                ->withHeader('Authorization: Bearer ' . $token)
                ->returnResponseObject();
        $response = $request->get();
        //Log::info(json_encode($response));
        if ($response->status == 200) {
            return $response->content;
        } else {
            return '';
        }
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->invalidate();

        //return $this->loggedOut($request) ?: redirect('/');

        $ssoRoot = config('services.sso.loginPage');

        if (empty($ssoRoot)) {
            return redirect('/');
        } else {
            return redirect($ssoRoot);
        }
    }
}
