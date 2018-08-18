/**
 * Xóa các thông báo lỗi.
 * @param formSelector Form CSS selector, có thể nhập hoặc không
 */
function clearErrorMessages(formSelector) {
	var prefix = formSelector ? (formSelector + ' ') : '';
	document.querySelectorAll(prefix + '.validate-container .has-error').forEach(function(el) {
		clearSingleErrorMessage(el);
	});
}

function clearSingleErrorMessage(el) {
    el.classList.remove('has-error');
    var error = el.closest('.validate-container').querySelector('.error-message');
    if (error) {
        error.parentNode.removeChild(error);
    }
}

/**
 * Hiển thị thông báo lỗi.
 * @param el Đối tượng DOM (input, textarea, select)
 * @param errorMessage Thông báo lỗi
 */
function showError(el, errorMessage) {
	// Tạo thẻ span thông báo lỗi
	var message = document.createElement('span');
	message.className = "error-message";
    var text = errorMessage;
    // Hiển thị nhiều thông báo một lúc
    if (Array.isArray(errorMessage)) {
        text = "";
        errorMessage.forEach(function(s) {
            text += s + '\n';
        });
        text = text.trim();
    }
	message.textContent = text;

	// Cập nhật thẻ DOM
	el.classList.add('has-error');

	// Thêm thông báo lỗi
	var p = el.closest('.validate-container');
	p.appendChild(message);
}

/**
 * Chuẩn hóa và validate trường đầu vào.
 * @param el 
 */
function getValidateError(el) {
    // Không validate trường ẩn hoặc bị disabled
    if (el.style.display == 'none' || el.style.visibility == 'hidden' || el.disabled == true) {
        return null;
    }

    // Sau đó validate
    var errorMessage = checkRequired(el) ||
            checkLength(el) ||
            checkType(el) ||
            checkRange(el) ||
            checkPattern(el) ||
            checkMatch(el) ||
            checkFileSizeAndType(el) ||
            '';

    return errorMessage;
}

/**
 * Kiểm tra xem form có dữ liệu hợp lệ không.
 * @param formSelector Form CSS Selector
 * @return true nếu form KHÔNG hợp lệ
 */
function invalidForm(formSelector) {
	// Xóa tất cả thông báo lỗi cũ
	clearErrorMessages(formSelector);

	// Có lỗi hay không
	var flag = false;

	// Lưu thông tin thẻ có lỗi đầu tiên
	var firstField = null;

	// Duyệt qua các thẻ nhập
	document.querySelectorAll(
			formSelector + ' .validate-container input, ' +
			formSelector + ' .validate-container textarea, ' +
			formSelector + ' .validate-container select').forEach(function(el) {
        
        // Trim giá trị
        if (el.type != "file") {
            var value = el.value;
            value = value.trim();
            el.value = value;
        }

        var errorMessage = getValidateError(el);

		// Nếu có lỗi
		if (errorMessage) {
			showError(el, errorMessage);
			flag = true;
			if (firstField == null) {
				firstField = el;
			}
		}
	});

	// Focus và scroll đến phần tử lỗi đầu tiên
	if (firstField != null) {
		firstField.focus();
	}

	return flag;
}

/**
 * Gắn thêm các event để validate khi người dùng nhập (input, blur).
 * @param formSelector Form CSS Selector
 */
function addRealTimeValidation(formSelector) {
    // Duyệt qua các thẻ nhập
	document.querySelectorAll(
			formSelector + ' .validate-container input, ' +
			formSelector + ' .validate-container textarea, ' +
			formSelector + ' .validate-container select').forEach(function(el) {

        el.addEventListener("input", function() {
            if (el.matches('.has-error')) {
                clearSingleErrorMessage(el);
            }
            el.classList.remove('valid');

            var errorMessage = getValidateError(el);

            if (errorMessage) {
                showError(el, errorMessage);
            } else {
                el.classList.add('valid');
            }
        });

        if (el.getAttribute('data-type') === 'date') {
            el.addEventListener("blur", function() {
                var value = el.value;
                if (validateDate(value)) {
                    value = normalizeDate(value);
                    el.value = value;
                }
            });
        }
    });
}
