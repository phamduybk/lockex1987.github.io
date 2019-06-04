<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Hệ thống đăng nhập tập trung SSO</title>

        <!-- Favicon -->
        <link rel="shortcut icon" href="/images/favicon.png">

        <!-- Bootstrap -->
        <link href="/css/bootstrap.min.css" rel="stylesheet">

        <!-- Styles riêng -->
        <link href="/css/style.css" rel="stylesheet">
    </head>

    <body>
        <div style="min-height: 100vh; background-image: url(/images/bg.png); background-size: cover; background-position: center center; color: #FFF; font-size: 14px;">
            <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
                <div style="width: 560px; background: #393E44; border-radius: 5px; padding: 40px 50px 75px;">
                    <div class="text-center">
                        <img src="/images/logo.png">
                    </div>
                    <div style="font-size: 22px; margin-bottom: 45px; margin-top: 40px;">
                        LOGIN
                    </div>

                    <form id="loginForm">
                        <div class="mt-2 mb-5 message" id="errorMessage" style="color: #E0B750; display: none">
                            Thông tin đăng nhập không chính xác
                        </div>

                        <div class="form-group">
                            <input id="username" type="text" class="form-control" name="username" placeholder="Tên đăng nhập" required autofocus>
                        </div>

                        <div class="form-group mt-4">
                            <input id="password" type="password" class="form-control" name="password" placeholder="Mật khẩu" required>
                        </div>

                        <div class="mb-0 mt-5 text-center">
                            <button class="btn btn-primary font-weight-bold" type="submit">
                                Đăng nhập
                            </button>
                        </div>

                        <div class="mt-5 mb-5 message" id="noAppMessage" style="color: #E0B750; display: none">
                            Người dùng chưa được phân quyền vào ứng dụng nào
                        </div>

                        <div class="mt-5 mb-5 message" id="chooseApp" style="color: #E0B750; display: none">
                            <div>Chọn ứng dụng truy cập:</div>
                            <ul>
                                <li>
                                    <a href="">
                                        Truyền thông chủ động 1
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <script src="js/cookie.js"></script>
        <script src="js/sso.js"></script>
        <script src="js/login.js"></script>
    </body>
</html>
