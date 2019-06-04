@extends('layout')

@section('style')
    <style>
        /* Change auto-complete styles in Chrome */
        :-webkit-autofill,
        :-webkit-autofill:hover,
        :-webkit-autofill:focus {
            /* Màu của chữ cũng bị thay đổi, chuyển về màu khi bình thường */
            -webkit-text-fill-color: #FFF;

            /* Thời gian đổi màu nền trong 5000s (một thời gian dài) */
            transition: background-color 5000s ease-in-out 0s;
        }

        .form-control {
            border-radius: 0;
            padding: 14px 0px;
        }

        .form-control, .form-control:focus, .form-control:active {
            box-shadow: none;
            background-color: transparent;
            border-color: transparent;
            border-bottom-color: #90959B;
            color: #FFF;
        }

        .btn-primary {
            padding: 10px 40px;
            background-color: #0FA6B9;
            border-color: #0FA6B9;
            border-radius: 3px;
            box-shadow: none !important;
        }
    </style>
@endsection

@section('content')
    <div style="min-height: 100vh; background-image: url(/images/ttcd/bg.png); background-size: cover; background-position: center center; color: #FFF; font-size: 14px;">
        <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
            <div style="width: 560px; background: #393E44; border-radius: 5px; padding: 40px 50px 75px;">
                <div class="text-center">
                    <img src="/images/ttcd/logo.png">
                </div>
                <div style="font-size: 22px; margin-bottom: 45px; margin-top: 40px;">
                    LOGIN
                </div>

                <form id="loginForm">
                    <div class="mt-2 mb-5" id="errorMessage" style="color: #E0B750; display: none">
                        Thông tin đăng nhập không đúng!
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
                </form>
            </div>
        </div>
    </div>
@endsection
