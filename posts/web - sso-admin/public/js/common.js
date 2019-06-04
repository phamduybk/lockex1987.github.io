/**
 * Các request AJAX thêm CRSF token để phòng chống lỗi CSRF.
 */
function _setupCsrfAjax() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
}

/**
 * Ở các chức năng mà cần hiển thị dữ liệu cũ lên màn hình sửa.
 * @param jsonData Dữ liệu JSON (thường do người dùng trả về)
 * @param formSelector Form DOM
 * @param callbacks Hàm callback trong trường hợp dữ liệu bind ra phức tạp
 */
function bindJsonToForm(jsonData, formSelector, callbacks) {
    if (jsonData != null) {
        for (var k in jsonData) {
            if (jsonData.hasOwnProperty(k)) {
                var v = jsonData[k];

                if (callbacks != null && callbacks.hasOwnProperty(k)) {
                    callbacks[k](v);
                } else {
                    var nodes = document.querySelectorAll(formSelector + ' [name="' + k + '"]');
                    if (nodes.length > 0) {
                        var obj = nodes[0];
                        var type = obj.type;
                        switch (type) {
                            case 'checkbox':
                            case 'radio':
                                nodes.forEach(function(n) {
                                    if (n.value == v) {
                                        n.checked = true;
                                    } else {
                                        n.checked = false;
                                    }
                                });
                                break;
                            default:
                                obj.value = v;
                                break;
                        }
                    }
                }
            }
        }
    }
}

function resetForm(formSelector) {
    document.querySelector(formSelector).reset();
}

$(document).ready(function () {
    _setupCsrfAjax();
});

