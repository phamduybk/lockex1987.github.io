<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\LoginRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Auth;
use DB;

class UserController extends Controller
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
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user()
    {
        $user = Auth::guard()->user();

        // Lấy thêm thông tin các app được truy cập
        $sql = '
                select
                    a.code,
                    a.name,
                    a.url
                from user_app ua, sso_app a
                where ua.user_id = ?
                and a.id = ua.app_id ';
        $apps = DB::select($sql, [ $user->id ]);
        $user->apps = $apps;

        return response()->json($user);
    }
}
