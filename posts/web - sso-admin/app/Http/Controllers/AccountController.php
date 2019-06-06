<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
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
        $user = auth()->user();
        return view('account.index', compact('user'));
    }

    /**
     * Đổi mật khẩu.
     */
    public function changePassword(Request $request)
    {
        // Validate tham số
        $request->validate([
            'currentPassword' => 'required',
            'newPassword' => 'required|string|min:8',
            'passwordConfirm' => 'required|same:newPassword'
        ]);

        $user = auth()->user();
        $currentPassword = request('currentPassword');
        $newPassword = request('newPassword');

        // Kiểm tra mật khẩu hiện tại
        if (!Hash::check($currentPassword, $user->password)) {
            return response([
                'errors' => [
                    'currentPassword' => [
                        'Mật khẩu hiện tại không chính xác'
                    ]
                ]
            ], 422);
        }

        // Cập nhật DB mật khẩu mới
        $user->password = Hash::make($newPassword);
        $user->save();

        return [
            'code' => 0,
            'message' => 'Password changed'
        ];
    }

    /**
     * Đổi ảnh đại diện.
     */
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $user = auth()->user();

        // Xóa ảnh cũ
        if ($user->avatar) {
            Storage::delete('public/avatars/' . $user->avatar);
        }

        $avatarName = $user->id . '_avatar_' . time() . '.' . $request->avatar->getClientOriginalExtension();
        $request->avatar->storeAs('public/avatars', $avatarName);
        $user->avatar = $avatarName;
        $user->save();
        return [
            'code' => 0,
            'avatarName' => $avatarName
        ];
    }
}
