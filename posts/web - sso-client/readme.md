Thêm cấu hình

.env

SSO_LOGIN_PAGE=http://sso.cttd.tk
SSO_API_ROOT=http://sso.cttd.tk

config/services.php


'sso' => [
    'loginPage' => env('SSO_LOGIN_PAGE'),
    'apiRoot' => env('SSO_API_ROOT')
],

Sửa login.blade.php

    @if (!empty(config('services.sso.loginPage')))
        <script>
            // Chuyển đến trang đăng nhập SSO
            window.location = "{{ config('services.sso.loginPage') }}";
        </script>
    @else
        ...
    @endif

Sửa routes/web.php
    Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
    Route::post('login', 'Auth\LoginController@login');
    Route::post('logout', 'Auth\LoginController@logout')->name('logout');
    Route::get('/login-callback', function () {
        return view('auth.loginCallback');
    });
    Route::post('/login-callback', 'Auth\LoginController@loginCallback');

Thêm file resources/view/auth/loginCallback.blade.php

Thêm file /js/sso.js

Thêm thư viện Curl
    composer require ixudra/curl
    

Sửa LoginController

    use Ixudra\Curl\Facades\Curl;
    use App\User;
    use Illuminate\Http\Request;

    public function loginCallback(Request $request)
    {
        $authorization = $request->header('Authorization');
        $token = str_replace('Bearer ', '', $authorization);

        $ssoUser = json_decode($this->callSsoApi($token));

        $user = User::where('username', '=', $ssoUser->name)->first();
        if (! $user) {
            $user = new User();
            $user->username = $ssoUser->name;
            $user->display_name = $ssoUser->fullname;
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
        Log::info(json_encode($response));
        if ($response->status == 200) {
            return $response->content;
        } else {
            
            return '';
        }
    }

    /**
     * Log the user out of the application.
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();
        $request->session()->flush();
        $request->session()->regenerate();

        $ssoRoot = config('services.sso.loginPage');

        if (empty($ssoRoot)) {
            return redirect('/');
        } else {
            return response()->json([
                'message' => 'Successfully logged out'
            ]);
        }
    }


    /**
     * Gọi API để đổi mật khẩu người dùng.
     */
    private function changePassword($token, $passwordOld, $passwordNew, $passwordNewConfirmation)
    {
        $params = [
            'oldPassword' => $passwordOld,
            'newPassword' => $passwordNew,
            'rePassword' => $passwordNewConfirmation
        ];
        $url = config('services.sso.apiRoot') . '/api/change-password';
        $request = Curl::to($url)
                ->withData($params)
                ->withHeader('Authorization: Bearer ' . $token)
                ->returnResponseObject();
        $response = $request->post();
        Log::info(json_encode($response));
        if ($response->status == 200) {
            $result = json_decode($response->content);
            if ($result->code != 'success') {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

Sửa chỗ logout

    // Invalidate session và chuyển đến trang logout của SSO

<script>
    function logoutSso() {
        fetch('/logout')
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                deleteTokenCookie();
                window.location = "{{ config('services.sso.loginPage') }}";
                //processLogoutApi();
            });
    }

    /**
     * Xử lý đăng xuất.
     */
    function processLogoutApi() {
        var token = getTokenCookie();
        if (!token) {
            console.log('Không có token');
            window.location = '/';
            return;
        }

        fetch('{{ config('services.sso.apiRoot') }}/api/logout', {
                method: 'POST',
                headers:{
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(data => {
                //console.log('Cookie deleted');
                //window.location = "{{ config('services.sso.loginPage') }}";
            })
            .catch(error => console.error(error));
    }
</script>


Xóa các bảng thừa, trường thừa ở MySQL
    migrations
    password_resets
    users
        email_verified_at
        password
        remember_token
        
