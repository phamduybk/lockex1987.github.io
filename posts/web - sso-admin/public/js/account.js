/**
 * Đổi mật khẩu.
 */
function changePassword() {
    if (invalidForm('#frm')) {
        return;
    }

    var params = $('#frm').serialize();
    $.ajax({
        url: '/account/change-password',
        dataType: 'json',
        type: 'POST',
        data: params,
        success: function (resp) {
            noti.success('Đổi mật khẩu thành công');
        },
        error: function (xhr) {
            processLaravelValidationErrors(xhr);
        }
    });
}

/**
 * Đổi ảnh avatar.
 */
function updateAvatar() {
    var fileData = $('#avatar').prop('files')[0];   
    var params = new FormData();
    params.append('avatar', fileData);
    $.ajax({
        url: '/account/update-avatar',
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        data: params,
        type: 'POST',
        success: function (resp) {
            noti.success('Đổi ảnh đại diện thành công');
            $('#avatarImage').attr('src', '/storage/avatars/' + resp.avatarName);
        },
        error: function (xhr) {
            processLaravelValidationErrors(xhr);
        }
    });
}
