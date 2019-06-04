<!--
    Một ứng dụng nên sử dụng các thư viện cơ bản sau:
    - Bootstrap
    - jQuery (đằng nào các thư viện khác như Bootstrap cũng yêu cầu jQuery)
        + AJAX vì không phải trình duyệt nào cũng hỗ trợ Fetch API, thêm CRSF ở một chỗ
        + Event delegation
        + DOM Manipulation cho ngắn gọn
    - common-validation
    - noti
-->
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link rel="stylesheet" href="/libs/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/libs/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/libs/noti/css/noti.css">
    <link rel="stylesheet" href="/libs/common-validation/css/common-validation.css">
    <link rel="stylesheet" href="/css/style.css">

    <link href="/images/logo.png" rel="icon"/>

    @yield('style')
</head>

<body class="d-flex" style="min-height: 100vh">
    @include('layouts.sidebar')

    <div class="flex-grow-1 bg-white px-2">
        <div class="" style="height: 60px; border-bottom: 1px solid #DDD; padding-top: 10px; padding-left: 20px;
                font-size: 22px; font-weight: 500; margin-bottom: 50px;">
            @yield('breadcrumbTitle')
        </div>

        @yield('content')
    </div>

    <!-- Scripts -->
    <script src="/libs/jquery/js/jquery.min.js"></script>
    <script src="/libs/popper/js/popper.min.js"></script>
    <script src="/libs/bootstrap/js/bootstrap.min.js"></script>
    <script src="/libs/noti/js/noti.js"></script>
    <script src="/libs/common-validation/js/common-validation.js"></script>
    <script src="/js/common.js"></script>

    @yield('script')
</body>
</html>
