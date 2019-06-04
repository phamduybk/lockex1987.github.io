<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\App;
use Validator;


class AppController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Vào menu.
     */
    public function index()
    {
        return view('apps.index');
    }

    /**
     * Liệt kê danh sách.
     */
    public function list()
    {
        // Không dùng App::all()
        $apps = App::orderBy('id', 'desc')->get();
        return view('apps.list', compact('apps'));
    }

    /**
     * Thêm mới hoặc cập nhật.
     */
    public function save(Request $request)
    {
        $id = $request->input('id');

        // Validate
        if (empty($id)) {
            $rules = [
                'code' => 'bail|required|unique:sso_app',
                'url' => 'bail|required|unique:sso_app',
                'name' => 'required'
            ];
        } else {
            $rules = [
                'code' => 'bail|required|unique:sso_app,code,' . $id,
                'url' => 'bail|required|unique:sso_app,url,' . $id,
                'name' => 'required'
            ];
        }
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return [
                'code' => 1,
                'errors' => $validator->errors()
            ];
        }

        // Lưu vào DB
        if (empty($id)) {
            $app = new App();
        } else {
            $app = App::findOrFail($id);
        }
        $app->code = $request->input('code');
        $app->name = $request->input('name');
        $app->url = $request->input('url');
        $app->save();

        return [
            'code' => 0,
            'message' => 'Saved'
        ];
    }

    /**
     * Lấy thông tin.
     *
     * @param  int  $id ID của bản ghi
     */
    public function find(App $app)
    {
        return $app;
    }

    /**
     * Xóa bản ghi.
     *
     * @param  int  $id ID của bản ghi.
     */
    public function destroy(App $app)
    {
        $app->users()->detach();
        $app->delete();
        return [
            'code' => 0,
            'message' => 'Deleted'
        ];
    }
}
