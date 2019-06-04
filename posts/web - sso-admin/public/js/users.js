/**
 * Tìm kiếm.
 */
function search(page) {
    var params = {
        search: $('#search').val().trim()
    };
    if (page) {
        params.page = page;
    }
    $.ajax({
        url: '/users/search',
        data: params,
        type: 'GET',
        success: function (data) {
            $('#searchResult').html(data);
        }
    });
}

/*
 * Mở popup form.
 */
function openForm() {
    $('#formModal').modal('show');
}

/**
 * Đóng popup form.
 */
function closeForm() {
    $('#formModal').modal('hide');
}

/**
 * Mở form thêm mới.
 */
function openCreateForm() {
    // Xóa các thông báo lỗi cũ
    clearErrorMessages('#frm');

    // Reset các trường thông tin
    resetForm('#frm');

    // Xóa trường ẩn ID
    $('#id').val('');

    // Đổi tên nhãn
    $('#frm .action-type').text('Thêm mới');

    // Mở popup
    openForm();

    // Khi thêm mới phải nhập password
    var passwordField = document.querySelector('[name=password]');
    passwordField.setAttribute('data-validation', 'required|password');
    parseValidation(passwordField);
    $('#passwordLabel').addClass('required');
}

/**
 * Mở form cập nhật.
 */
function openUpdateForm(id) {
    // Lấy thông tin bản ghi
    $.ajax({
        url: '/users/' + id,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            // Xóa các thông báo lỗi cũ
            clearErrorMessages('#frm');

            // Reset các trường thông tin
            resetForm('#frm');

            // Bind dữ liệu ra form
            bindJsonToForm(data, '#frm', {
                apps: function (apps) {
                    // Cập nhật thông tin ứng dụng
                    apps.forEach(a => {
                        document.querySelector('#app' + a.id).checked = true;
                    });
                }
            });

            // Đổi tên nhãn
            $('#frm .action-type').text('Cập nhật');

            // Mở popup
            openForm();

            // Cập nhật thì không phải nhập password
            var passwordField = document.querySelector('[name=password]');
            passwordField.setAttribute('data-validation', '');
            parseValidation(passwordField);
            $('#passwordLabel').removeClass('required');
        }
    });
}

/**
 * Lưu thông tin.
 */
function saveInfo() {
    if (invalidForm('#frm')) {
        return;
    }

    noti.confirm('Bạn có muốn lưu dữ liệu?', function () {
        var params = $('#frm').serialize();

        $.ajax({
            url: '/users',
            type: 'POST',
            data: params,
            success: function (data) {
                // Đóng cửa sổ
                closeForm();

                // Thông báo
                noti.success('Lưu thành công');

                // Tìm kiếm lại
                search();
            },
            error: function (xhr) {
                if (xhr.status == 422) {
                    var data = JSON.parse(xhr.responseText);
                    if (data.errors.name) {
                        showError(document.querySelector('input[name=name]'), 'Tên đã tồn tại');
                    }
                    if (data.errors.email) {
                        showError(document.querySelector('input[name=email]'), 'Email đã tồn tại');
                    }
                }
            }
        });
    });
}

/**
 * Khi người dùng click vào nút xóa.
 */
function handleDeleteEvent() {
    $(document).on('click', '.table-action-delete', function () {
        var btn = $(this);
        var id = btn.attr('data-id');

        noti.confirm('Bạn có muốn xóa người dùng?', function () {
            $.ajax({
                url: '/users/' + id,
                dataType: 'json',
                type: 'DELETE',
                success: function (data) {
                    // Tìm kiếm lại
                    search();

                    noti.success('Xóa người dùng thành công');
                }
            });
        });
    });
}

/**
 * Tìm kiếm khi người dùng nhập.
 */
function handleSearchEvent() {
    $('#search').on('input', function () {
        search();
    });
}

/**
 * Phân trang Laravel bằng AJAX.
 */
function handlePagination() {
    $(document).on('click', '.pagination a', function (evt) {
        evt.preventDefault();
        var page = $(this).attr('href').split('page=')[1];
        search(page);
    });
}

$(document).ready(function () {
    search();

    handleDeleteEvent();
    handleSearchEvent();
    handlePagination();
});
