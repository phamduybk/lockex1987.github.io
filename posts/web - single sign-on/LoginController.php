<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Illuminate\Validation\ValidationException;
use DB;
use Log;


/*
 | Controller này quản lý việc đăng nhập của người dùng.
 */
class LoginController extends Controller {

    // Chống dò mật khẩu
    use ThrottlesLogins;

    /**
     * Khởi tạo.
     */
    public function __construct() {
        //$this->middleware('guest')->except('logout');
    }

    /**
     * Hiển thị form đăng nhập.
     */
    public function showLoginForm(Request $request) {
        // App mà sau khi đăng nhập sẽ redirect đến
        $app = $request->input('app');

        if (Auth::check()) {
            // Nếu đã login rồi
            return $this->redirectToApp($app, Auth::user());
        } else {
            // Nếu chưa login thì hiển thị form
            return view('auth.login', ['app' => $app]);
        }
    }

    /**
     * Xử lý đăng nhập.
     */
    public function login(Request $request) {
        // Kiểm tra
        $this->validateLogin($request);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            // TODO: Phải truyền tham số app
            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
            return $this->sendLoginResponse($request);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    /**
     * Kiểm tra thông tin đầu vào.
     */
    private function validateLogin(Request $request) {
        $request->validate([
            $this->username() => 'required|string',
            'password' => 'required|string',
        ]);
    }

    /**
     * Trường thông tin để đăng nhập (email hay username).
     * Hàm này còn dùng ở trait ThrottlesLogins nên chưa xóa được.
     */
    public function username() {
        return 'email';
    }

    /**
     * Thử login sử dụng các thông tin của người dùng nhập vào.
     */
    private function attemptLogin(Request $request) {
        return $this->guard()->attempt(
            $this->credentials($request), $request->filled('remember')
        );
    }

    /**
     * Các thông tin cần thiết để login (username và password).
     */
    private function credentials(Request $request) {
        return $request->only($this->username(), 'password');
    }

    /**
     * Login thành công.
     */
    private function sendLoginResponse(Request $request) {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        // App mà sau khi đăng nhập sẽ redirect đến
        $app = $request->input('app');

        // Người dùng
        $user = $this->guard()->user();

        return $this->redirectToApp($app, $user);
    }

    private function redirectToApp($app, $user) {
        // Nếu không nhập mã ứng dụng khác thì trở về trang chủ
        // Ở trang chủ này có thể đổi password hoặc là đổi avatar
        if (empty($app)) {
            return redirect('/home');
        }

        // Lấy ứng dụng khác ở DB
        $appRecord = DB::table('sso_app')->where('name', $app)->first();
        if (empty($appRecord)) {
            return [
                'error' => 'App does not exist'
            ];
        }

        // Sinh code và lưu ở Redis trong 1 phút
        $code = uniqid();
        $redisKey = 'sso_login_code_' . $code;
        $redisValue = json_encode($user);
        Redis::set($redisKey, $redisValue, 'EX', 60);

        // Redirect về ứng dụng khác
        // TODO: ký số code
        $redirectUrl = $appRecord->login_redirect . '?code=' . $code;

        return redirect($redirectUrl);
    }

    /**
     * Login thất bại.
     */
    private function sendFailedLoginResponse(Request $request) {
        throw ValidationException::withMessages([
            $this->username() => [trans('auth.failed')],
        ]);
    }

    /**
     * Đường dẫn /logout.
     */
    public function logout(Request $request) {
        $this->guard()->logout();
        $request->session()->invalidate();
        return redirect('/');
    }

    /**
     * Log the user out of the application.
     */
    public function logoutSso(Request $request) {
        // App mà sau khi đăng nhập sẽ redirect đến
        $app = $request->input('app');

        // Lấy ứng dụng khác ở DB
        $appRecord = DB::table('sso_app')->where('name', $app)->first();
        if (empty($appRecord)) {
            return [
                'error' => 'App does not exist'
            ];
        }

        // Nếu đã login rồi thì hết hiệu lực session
        if (Auth::check()) {
            $this->guard()->logout();
            $request->session()->invalidate();
        }

        // Sinh code và lưu ở Redis trong 1 phút
        $code = uniqid();
        $redisKey = 'sso_logout_code_' . $code;
        $redisValue = 'LOGOUT';
        Redis::set($redisKey, $redisValue, 'EX', 60);

        // Redirect về ứng dụng khác
        // TODO: ký số code
        $redirectUrl = $appRecord->logout_redirect . '?code=' . $code;

        return redirect($redirectUrl);
        //return $redirectUrl;
    }

    /**
     * Get the guard to be used during authentication.
     */
    private function guard() {
        return Auth::guard();
    }
	
	public function checkLoginCode(Request $request) {
        // Kiểm tra mã truyền vào
        $code = $request->input('code');
        $redisKey = 'sso_login_code_' . $code;
        $redisValue = Redis::get($redisKey);

        if (empty($redisValue)) {
            return [
                'error' => 'Invalid code'
            ];
        }

        // Xóa luôn key ở Redis
        Redis::del($redisKey);

        $user = json_decode($redisValue, true);
		return $user;
	}

    public function checkLogoutCode(Request $request) {
        // Kiểm tra mã truyền vào
        $code = $request->input('code');
        $redisKey = 'sso_logout_code_' . $code;
        $redisValue = Redis::get($redisKey);
        //Log::debug($redisKey . ', ' . $redisValue);

        if (empty($redisValue)) {
            return [
                'error' => 'Invalid code'
            ];
        }

        // Xóa luôn key ở Redis
        Redis::del($redisKey);

		return [
            'success' => 'OK'
        ];
	}
}
