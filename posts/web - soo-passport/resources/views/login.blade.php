@extends('layout')

@section('content')
    <div class="container py-4">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body" style="padding: 30px">
                        <form id="loginForm">
                            <div class="text-danger mb-3 text-center" id="errorMessage" style="display: none">
                                Thông tin đăng nhập không đúng!
                            </div>

                            <div class="form-group">
                                <input id="username" type="text" class="form-control" name="username" placeholder="Tên đăng nhập" required autofocus>
                            </div>

                            <div class="form-group">
                                <input id="password" type="password" class="form-control" name="password" placeholder="Mật khẩu" required>
                            </div>

                            <div class="form-group mb-0 text-center">
                                <button type="submit" class="btn btn-primary">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
