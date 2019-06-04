<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Đổi mật khẩu</title>

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
                        CHANGE PASSWORD
                    </div>

                    <form id="frm">
                        <div class="form-group">
                            <input type="password" class="form-control" required id="oldPassword" name="oldPassword" placeholder="Mật khẩu cũ" autofocus>
                        </div>

                        <div class="form-group mt-4">
                            <input type="password" class="form-control" required id="newPassword" name="newPassword" placeholder="Mật khẩu mới">
                        </div>

                        <div class="form-group mt-4">
                            <input type="password" class="form-control" required id="rePassword" name="rePassword" placeholder="Nhắc lại mật khẩu mới">
                        </div>

                        <div class="mb-0 mt-5 text-center">
                            <button class="btn btn-primary font-weight-bold" type="submit">
                                Đổi mật khẩu
                            </button>
                        </div>

                        <div class="mt-2 mb-5 message" id="errorMessage" style="color: #E0B750; display: none">
                            Đổi mật khẩu KHÔNG thành công
                        </div>

                        <div class="mt-5 mb-5 message" id="successMessage" style="color: #E0B750; display: none">
                            Đổi mật khẩu thành công
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <script src="js/cookie.js"></script>
        <script src="js/sso.js"></script>
        <script src="js/change-password.js"></script>
    </body>
</html>
