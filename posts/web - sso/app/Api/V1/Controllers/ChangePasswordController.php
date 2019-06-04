<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Requests\ChangePasswordRequest;
use App\Http\Controllers\Controller;
use App\User;
use Auth;
use Illuminate\Support\Facades\Hash;

class ChangePasswordController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', []);
    }

    /**
     * Đổi mật khẩu
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        // Các tham số người dùng truyền
        $oldPassword = $request->input('oldPassword');
        $newPassword = $request->input('newPassword');
        $rePassword = $request->input('rePassword');

        //$user = Auth::guard()->user();
        $userId = Auth::guard()->id();
        $user = User::find($userId);

        if (! $this->validateOldPassword($oldPassword, $user)) {
            return [
                'code' => 'error',
                'message' => 'Invalid old password'
            ];
        }

        if ($newPassword != $rePassword) {
            return [
                'code' => 'error',
                'message' => 'rePassword not match newPassword'
            ];
        }

        // Lưu thông tin mật khẩu mới
        // Reset các thông tin hash mật khẩu theo cách cũ
        $user->password = $newPassword; // Laravel thấy chưa hash sẽ tự hash?
        $user->salt = null;
        $user->hash_algorithm = null;
        $user->save();

        return [
            'code' => 'success',
            'message' => 'Change password success',
            //'user' => $user
        ];
    }

    private function validateOldPassword($oldPassword, $user)
    {
        // Password được hash trong DB
        $dbPasssword = $user->getAuthPassword();

        // Nếu mật khẩu được hash mặc định theo bcrypt
        if (empty($user->hash_algorithm)) {
            return Hash::check($oldPassword, $dbPasssword);
        }

        // Nếu mật khẩu được hash theo SHA1 cũ
        $salt = $user->salt;
        $hashedPass = sha1($oldPassword . $salt);
        if ($hashedPass == $dbPasssword) {
            return true;
        }

        return false;
    }
}
