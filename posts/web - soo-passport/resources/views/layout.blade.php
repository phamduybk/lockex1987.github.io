<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Passport {{ $appName }}</title>

    <!-- Styles, Bootstrap -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <!-- Style riêng của từng trang -->
    @yield('style')
</head>

<body>
    <!--
        Hiển thị trang đăng nhập, gọi api.reputa.vn để kiểm tra.
        Nếu thất bại thì thông báo lỗi.
        Nếu thành công thì lưu token vào session (cookie), sau đó redirect về trang vệ tinh với token.
    -->
    
    @yield('content')

    <!-- Scripts, pure JS -->
    <script>
        const LOGIN_REDIRECT = '{{ $loginRedirect }}';
    </script>

    <script src="js/login.js"></script>
</body>
</html>
