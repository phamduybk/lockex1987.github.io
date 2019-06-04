<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;


/*
 | Controller này quản lý việc đăng nhập và đăng xuất của người dùng.
 */
class LoginController extends Controller {

    /**
     * Hiển thị form đăng nhập.
     */
    public function login(Request $request) {
        // Lấy ứng dụng ở DB
        $app = $request->input('app');
        $appRecord = DB::table('sso_app')->where('code', $app)->first();

        // Kiểm tra đã có token trong cookie hoặc session chưa
        $token = $request->session()->get('token');

        if (!empty($token)) {    
            // Nếu có token rồi thì trả coi như là đăng nhập rồi, trả token đó về cho người dùng
            // Redirect về ứng dụng vệ tinh
            $redirectUrl = $appRecord->login_redirect . '?token=' . $token;
            return redirect($redirectUrl);
        } else {
            // Nếu không có token thì hiển thị trang đăng nhập
            // Có thể tùy biến màn hình đăng nhập cho các ứng dụng khác nhau
            $viewPath = $appRecord->view_path ?: 'login';
            return view($viewPath, [
                'appName' => $appRecord->name,
                'loginRedirect' => $appRecord->login_redirect
            ]);
        }
    }

    /**
     * Lưu thông tin token.
     */
    public function saveToken(Request $request) {
        $token = $request->input('token');
        $request->session()->put('token', $token);
        return response()->json([
            'code' => '0',
            'token' => $token
        ]);
    }

    /**
     * Đường dẫn /logout.
     */
    public function logout(Request $request) {
        // Xóa và hết hiệu lực session
        $request->session()->forget('token');
        $request->session()->invalidate();

        // Redirect về trang login ứng dụng khác
        $app = $request->input('app');
        return redirect()->route('login', ['app' => $app]);;
    }
}
