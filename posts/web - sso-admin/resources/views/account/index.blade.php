@extends('layouts.app')

@section('breadcrumbTitle', 'Tài khoản')


@section('content')
    <div style="max-width: 300px">
        <form id="frm">
            <div class="form-group validate-container">
                <label class="control-label required">
                    Mật khẩu mới
                </label>
                <div class="">
                    <input type="password"
                            class="form-control clearable"
                            name="password"
                            id="password"
                            autocomplete="off"
                            data-validation="required|password">
                </div>
            </div>

            <div>
                <button type="button" class="btn btn-primary" onclick="saveNewPassword()">
                    Đổi mật khẩu
                </button>
            </div>
        </form>
    </div>
@endsection


@section('script')
    <script>
        function saveNewPassword() {
            if (invalidForm('#frm')) {
                return;
            }

            var params = {
                password: $('#password').val().trim()
            };
            $.ajax({
                url: '/account',
                dataType: 'json',
                type: 'POST',
                data: params,
                success: function (resp) {
                    noti.success('Đổi mật khẩu thành công');
                }
            });
        }
    </script>
@endsection
