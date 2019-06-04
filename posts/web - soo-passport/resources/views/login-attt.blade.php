@extends('layout')

@section('style')
    <style>
        /* Change auto-complete styles in Chrome */
        :-webkit-autofill,
        :-webkit-autofill:hover,
        :-webkit-autofill:focus {
            /* Màu của chữ cũng bị thay đổi, chuyển về màu khi bình thường */
            -webkit-text-fill-color: #9ECCF8;

            /* Thời gian đổi màu trong 5000s (một thời gian dài) */
            transition: background-color 5000s ease-in-out 0s;
        }
    </style>
@endsection

@section('content')
    <div class="container-fluid login-attt">
        <div class="d-flex justify-content-center justify-content-lg-end align-items-center" style="height: 100vh">
            <div class="authentication-wrapper">
                <div class="authentication-box">
                    <div>
                        <div class="text-center">
                            <img src="/images/attt/logo-large.png">
                        </div>
                        
                        <h4 class="text-center">
                            Trung tâm phân tích xu hướng<br />
                            Mạng Xã Hội
                        </h4>

                        <form id="loginForm">
                            <div class="text-danger my-3 text-center" id="errorMessage" style="display: none">
                                Thông tin đăng nhập không đúng!
                            </div>

                            <div class="form-group">
                                <input id="username" type="text" class="form-control" name="username" placeholder="Tên đăng nhập" required autofocus>
                            </div>

                            <div class="form-group">
                                <input id="password" type="password" class="form-control" name="password" placeholder="Mật khẩu" required>
                            </div>

                            
                            <div class="form-group mb-0 text-center">
                                <a href="javascript:;">
                                    <button class="btn btn-primary w-100 font-weight-bold" type="submit">
                                        Đăng nhập
                                    </button>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
