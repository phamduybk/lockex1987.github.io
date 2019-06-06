@extends('layouts.app')

@section('breadcrumbTitle', 'Tài khoản')


@section('content')
    <div style="max-width: 300px">
        <div class="pb-4 mb-4 border-bottom">
            <label class="text-warning">
                * Click vào ảnh đại diện để đổi ảnh
            </label>
            <div class="text-center">
                <img class="rounded-circle"
                        id="avatarImage"
                        src="/storage/avatars/{{ $user->avatar }}"
                        style="width: 100px; height: 100px; object-fit: cover; cursor: pointer;"
                        title="Đổi ảnh đại diện"
                        onclick="$('#avatar').click()"
                        onerror="this.src = '/images/user-avatar.png'"/>
            </div>

            <input type="file"
                    id="avatar"
                    onchange="updateAvatar()"
                    accept="image/*,.png,.jpeg,.jpg,.gif;capture=camera"
                    style="display: none;">
        </div>

        <div class="pb-2 mb-4 border-bottom">
            <div class="form-group">
                <label>Tên tài khoản</label>
                <div class="text-success">{{ $user->name }}</div>
            </div>

            <div class="form-group">
                <label>Tên đầy đủ</label>
                <div class="text-success">{{ $user->fullname }}</div>
            </div>

            <div class="form-group">
                <label>Email</label>
                <div class="text-success">{{ $user->email }}</div>
            </div>
        </div>

        <form id="frm">
            <div class="form-group validate-container">
                <label class="control-label required">
                    Mật khẩu hiện tại
                </label>
                <input type="password"
                        class="form-control"
                        name="currentPassword"
                        data-validation="required"
                        autocomplete="off">
            </div>

            <div class="form-group validate-container">
                <label class="control-label required">
                    Mật khẩu mới
                </label>
                <input type="password"
                        class="form-control"
                        id="newPassword"
                        name="newPassword"
                        data-validation="required|password"
                        autocomplete="off">
            </div>

            <div class="form-group validate-container">
                <label class="control-label required">
                    Xác nhận mật khẩu
                </label>
                <input type="password"
                        class="form-control"
                        name="passwordConfirm"
                        data-validation="required|same:#newPassword:Không khớp với mật khẩu mới"
                        autocomplete="off">
            </div>

            <div>
                <button type="button" class="btn btn-primary" onclick="changePassword()">
                    Đổi mật khẩu
                </button>
            </div>
        </form>
    </div>
@endsection


@section('script')
    <script src="/js/account.js"></script>
@endsection
