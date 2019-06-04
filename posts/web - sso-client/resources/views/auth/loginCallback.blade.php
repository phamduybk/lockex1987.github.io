<html>
<head>
    <meta charset="utf-8"/>
    <title>...</title>
</head>

<body>
    <p>Đang xử lý token</p>

    <script src="/js/sso.js"></script>

    <script>
        function initNewSession() {
            var token = getTokenCookie();

            // Nếu token rỗng thì chuyển đến trang đăng nhập SSO
            if (!token) {
                window.location = "{{ config('services.sso.loginPage') }}";
                return;
            }

            var csrfToken = '{!! csrf_token() !!}';
            var url = '/login-callback';

            // Sử dụng jQuery để hỗ trợ 1 số trình duyệt trên mobile
            //calAjaxJquery(url, token, csrfToken);
            callAjaxFetch(url, token, csrfToken);
        }

        function callbackSuccess() {
            // Chuyển về trang chủ
            window.location = '/';
        }

        function callbackError() {
            window.location = "{{ config('services.sso.loginPage') }}";
        }

        function callAjaxFetch(url, token, csrfToken) {
            fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                .then(response => response.text())
                .then(data => {
                    //console.log(data);
                    callbackSuccess();
                })
                .catch(error => {
                    //alert(error)
                    callbackError();
                });
        }

        function calAjaxXhr(url, token, csrfToken) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        callbackSuccess();
                    } else {
                        callbackError();
                    }
                }
            };
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            xhr.setRequestHeader('X-CSRF-TOKEN', csrfToken);
            xhr.send();
        }

        function calAjaxJquery(url, token, csrfToken) {
            jQuery.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'X-CSRF-TOKEN': csrfToken
                },
                success: function (data) {
                    callbackSuccess();
                },
                error: function (xhr) {
                    callbackError();
                }
            })
        }

        initNewSession();
    </script>
</body>
</html>