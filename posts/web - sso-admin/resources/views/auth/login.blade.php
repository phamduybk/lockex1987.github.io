
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Đăng nhập</title>

    <link rel="stylesheet" href="/libs/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/libs/common-validation/css/common-validation.css">
    <link rel="stylesheet" href="/css/style.css">

    <link href="/images/logo.png" rel="icon"/>

    <style>
        .validate-container {
            /*min-height: 80px;*/
        }
    </style>
</head>

<body class="d-flex justify-content-center align-items-center" style="height: 100vh">                
    <div class="text-center w-100" style="max-width: 300px">
        <div class="mb-4">
            <img src="/images/logo.png"/>
        </div>

        <h3 class="mb-4">
            Đăng nhập
        </h3>

        <form method="POST" action="{{ route('login') }}" id="frm">
            @csrf

            <div class="form-group validate-container">
                <input
                        id="name"
                        type="text"
                        class="form-control form-control-lg @error('name') is-invalid @enderror"
                        name="name"
                        value="{{ old('name') }}"
                        data-validation="required"
                        autocomplete="name"
                        autofocus
                        placeholder="Tên đăng nhập">

                @error('name')
                    <span class="invalid-feedback text-left" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

            <div class="form-group validate-container">
                <input
                        id="password"
                        type="password"
                        class="form-control form-control-lg @error('password') is-invalid @enderror"
                        name="password"
                        data-validation="required"
                        autocomplete="current-password"
                        placeholder="Mật khẩu">

                @error('password')
                    <span class="invalid-feedback text-left" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

            <div class="form-group mt-4">
                <button type="submit" class="btn btn-primary btn-lg w-100" onclick="return validateForm()">
                    Đăng nhập
                </button>
            </div>
        </form>

        <p class="mt-5 text-muted">
            © 2019
        </p>
    </div>

    <script src="/libs/common-validation/js/common-validation.js"></script>
    <script>
        function validateForm() {
            if (invalidForm('#frm')) {
                return false;
            }
            return true;
        }
    </script>
</body>
</html>
