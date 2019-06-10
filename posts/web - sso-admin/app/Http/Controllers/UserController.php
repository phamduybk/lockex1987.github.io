<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\User;
use App\App;
use Validator;


class UserController extends Controller
{

    public function __construct()
    {
        // Chức năng yêu cầu cần phải đăng nhập
        $this->middleware('auth');
    }

    /**
     * Vào menu.
     */
    public function index()
    {
        $apps = App::all();
        return view('users.index', compact('apps'));
    }

    /**
     * Tìm kiếm.
     */
    public function search()
    {
        $search = request('search');
        $orderBy = 'id';
        $orderType = 'desc';
        $pageSize = 10;
        $users = User::with('apps')
                ->where('name', 'LIKE', "%$search%")
                ->orWhere('email', 'LIKE', "%$search%")
                ->orWhere('full_name', 'LIKE', "%$search%")
                ->orWhere('phone', 'LIKE', "%$search%")
                ->orderBy($orderBy, $orderType)
                ->paginate($pageSize);
        return view('users.list', compact('users', 'search'));
    }

    /**
     * Thêm mới hoặc cập nhật người dùng.
     */
    public function save(Request $request)
    {
        $id = $request->input('id');

        // Validate trùng name và email
        if (empty($id)) {
            $rules = [
                'name' => 'bail|required|unique:users',
                'email' => 'bail|required|unique:users',
                'phone' => 'required',
                'fullName' => 'required'
            ];
        } else {
            $rules = [
                'name' => 'bail|required|unique:users,name,' . $id,
                'email' => 'bail|required|unique:users,email,' . $id,
                'phone' => 'required',
                'fullName' => 'required'
            ];
        }
        $this->validate($request, $rules);

        // Lưu vào DB
        if (empty($id)) {
            $user = new User();
        } else {
            $user = User::findOrFail($id);
            $user->apps()->detach();
        }
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->is_admin = $request->input('is_admin');
        $user->phone = $request->input('phone');
        $user->fullName = $request->input('fullName');
        if (empty($id) || $request->input('password') != '') {
            $user->password = bcrypt($request->input('password'));
        }
        $user->save();

        // Thêm các ứng dụng gán cho người dùng
        $apps = $request->input('apps');
        if ($apps != null && count($apps) > 0) {
            $user->apps()->attach($apps);
        }

        return [
            'code' => 0,
            'message' => 'Saved'
        ];
    }

    /**
     * Lấy thông tin người dùng.
     *
     * @param  int  $id ID của người dùng
     */
    public function find(User $user)
    {
        // Lấy ra thông tin ứng dụng của người dùng
        $user->apps;
        return $user;
    }

    /**
     * Xóa người dùng.
     *
     * @param  int  $id ID người dùng
     */
    public function destroy(User $user)
    {
        $user->apps()->detach();
        $user->delete();
        return [
            'code' => 0,
            'message' => 'Deleted'
        ];
    }
}
