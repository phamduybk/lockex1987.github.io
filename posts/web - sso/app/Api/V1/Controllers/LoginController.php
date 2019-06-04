<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\LoginRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Auth;
use Cookie;

class LoginController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('customThrottle:10,1,7');
    }

    /**
     * Log the user in
     *
     * @param LoginRequest $request
     * @param JWTAuth $JWTAuth
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request, JWTAuth $JWTAuth)
    {
        $username = $request->input('username');
        $password = $request->input('password');
        $credentials = [
            'name' => $username,
            'password' => $password
        ];

        $token = Auth::guard()->attempt($credentials);
        if (!$token) {
            return response()
                    ->json([
                        'status' => 'failed',
                        'message' => 'Access Denied'
                    ])
                    ->header('throttleIt', true);
        }

        $ttlMinutes = Auth::guard()->factory()->getTTL();

        // Thêm cookie
        $path = '/';
        $domain = $this->getRootDomain($request);
        $secure = false;
        $httpOnly = false;
        $cookie = Cookie::make('token', $token, $ttlMinutes, $path, $domain, $secure, $httpOnly);

        return response()
            ->json([
                'status' => 'ok',
                'token' => $token,
                // Thời gian hiệu lực của token (theo giây)
                'ttl' => $ttlMinutes * 60
            ])
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
