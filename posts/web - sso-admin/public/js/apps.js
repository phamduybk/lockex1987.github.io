/**
 * Tìm kiếm.
 */
function search() {
    var params = {};
    $.ajax({
        url: '/apps/list',
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
}

/**
 * Mở form cập nhật.
 */
function openUpdateForm(id) {
    // Lấy thông tin bản ghi
    $.ajax({
        url: '/apps/' + id,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            // Xóa các thông báo lỗi cũ
            clearErrorMessages('#frm');

            // Reset các trường thông tin
            resetForm('#frm');

            // Bind dữ liệu ra form
            bindJsonToForm(data, '#frm');

            // Đổi tên nhãn
            $('#frm .action-type').text('Cập nhật');

            // Mở popup
            openForm();
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
            url: '/apps',
            type: 'POST',
            data: params,
            success: function (data) {
                var code = parseInt(data.code);
                switch (code) {
                    case 1:
                        if (data.errors.code) {
                            showError(document.querySelector('input[name=code]'), 'Mã đã tồn tại');
                        }
                        if (data.errors.url) {
                            showError(document.querySelector('input[name=url]'), 'URL đã tồn tại');
                        }
                        break;

                    case 0:
                        // Đóng cửa sổ
                        closeForm();

                        // Thông báo
                        noti.success('Lưu thành công');

                        // Tìm kiếm lại
                        search();

                        break;
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
                url: '/apps/' + id,
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

$(document).ready(function () {
    search();

    handleDeleteEvent();
    handlePagination();
});
