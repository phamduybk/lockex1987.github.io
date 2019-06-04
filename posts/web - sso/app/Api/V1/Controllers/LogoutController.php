<?php

namespace App\Api\V1\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Cookie;

class LogoutController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth', []);
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::guard()->logout();

        // Xóa cookie
        $path = '/';
        $domain = $this->getRootDomain($request);
        $cookie = Cookie::forget('token', $path, $domain);

        return response()
                ->json(['message' => 'Successfully logged out'])
                ->cookie($cookie);
    }

    private function getRootDomain($request)
    {
        $host = $request->getHost();
        $temp = array_reverse( explode('.', $host) );
        $domain = '.' . $temp[1] . '.' . $temp[0];
        return $domain;
    }
}
