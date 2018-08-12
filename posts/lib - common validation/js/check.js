/**
 * Yêu cầu nhập.
 * @param el DOM
 */
function checkRequired(el) {
	var value = el.value.trim();

	var required = el.getAttribute('data-required');
	if (required === 'false') {
		return '';
	}

	if (!required) {
		required = el.hasAttribute("required");
	}

	if (required) {
		// Chú ý trường hợp nhập 0
		if (validateEmpty(value)) {
			// Người dùng có thể cung cấp thông báo lỗi riêng
			var msg = el.getAttribute('data-required-error-message') ||  "Vui lòng nhập trường này";
			return tranlateErrorMessage(msg);
		}
	}

	return '';
}

/**
 * Chiều dài dữ liệu.
 * @param el Đối tượng DOM 
 */
function checkLength(el) {
	var value = el.value.trim();

	var min = el.getAttribute('data-min-length');
	if (min) {
		if (value.length < parseInt(min)) {
			return tranlateErrorMessage("Vui lòng nhập ít nhất {0} ký tự").format(min);
		}
	}

	var max = el.getAttribute('data-max-length');
	if (max) {
		if (value.length > parseInt(max)) {
			return tranlateErrorMessage("Vui lòng nhập nhiều nhất {0} ký tự").format(max);
		}
	}

	return '';
}

/**
 * Kiểm tra kiểu dữ liệu (email, số điện thoại, số nguyên, số, tên miền, date, chứng minh thư,...)
 * @param item Đối tượng DOM
 */
function checkType(el) {
	var value = el.value.trim();

	if (validateEmpty(value)) {
		return '';
	}

	var type_1 = el.getAttribute('data-type');
	var type_2 = el.getAttribute('type');

	if (type_1 === 'email' || type_2 === "email") {
		if (!validateEmail(value)) {
			return tranlateErrorMessage('Email không hợp lệ');
		}
	}

	if (type_1 === 'phone' || type_2 === "tel") {
        value = normalizePhoneNumber(value);
        el.value = value;

		if (!validatePhoneLength(value)) {
			return 'Số điện thoại dài từ 9 đến 12 số. Bạn nhập vào {0} số'.format(value.length);
		}

		if (!validatePhoneFormat(value)) {
			return tranlateErrorMessage('Số điện thoại chỉ được bao gồm số');
		}
	}

	if (type_1 === 'integer') {
		if (!validateInteger(value)) {
			return tranlateErrorMessage('Số nguyên không hợp lệ');
		}
	}

	if (type_1 === 'number' || type_2 === 'number') {
		if (!validateNumber(value)) {
			return tranlateErrorMessage('Số không hợp lệ');
		}
	}

    if (type_1 === 'date') {
        if (!validateDate(value)) {
            return tranlateErrorMessage('Ngày không hợp lệ');
        } else {
            //value = normalizeDate(value);
            //el.value = value;
        }
    }

    if (type_1 === 'id-number') {
        if (!validateIdNumberLength(value)) {
            return tranlateErrorMessage('Chứng minh thư phải chứa 9 hoặc 12 ký tự. Bạn nhập vào {0} ký tự.').format(value.length);
        }

        if (!validateIdNumberOnlyLetter(value)) {
            return tranlateErrorMessage('Chứng minh thư chỉ được chứa chữ và số');
        }

        if (!validateIdNumberHasNumber(value)) {
            // Không được chỉ có chữ không
            return tranlateErrorMessage('Chứng minh thư phải chứa số');
        }
    }

    // Không được bắt theo type='password' vì có thể bắt khi người dùng đăng nhập
    // Chỉ validate khi thêm mới người dùng, hoặc đổi mật khẩu mới
    if (type_1 === 'password') {
        var a = [];
        if (!validatePasswordLength(value)) {
            a.push(tranlateErrorMessage('Mật khẩu phải chứa ít nhất 8 ký tự. Bạn nhập vào {0} ký tự.').format(value.length));
        }

        if (validatePasswordSpace(value)) {
            a.push(tranlateErrorMessage('Mật khẩu không được chứa dấu cách'));
        }

        if (validatePasswordVietnamese(value)) {
            a.push(tranlateErrorMessage('Mật khẩu không được chứa ký tự tiếng Việt'));
        }

        if (a.length > 0) {
            return a;
        } else {
            return '';
        }
    }

	// Ten mien, time,...

	return '';
}

/**
 * Kiểm tra khoảng của số hoặc ngày tháng:
 * - Nhỏ nhất
 * - Lớn nhất
 * - Nhỏ hơn
 * - Lớn hơn
 * - Ngày trước khoảng thời gian
 * - Ngày sau khoảng thời gian
 * @param el 
 */
function checkRange(el) {
	var value = el.value.trim();

	if (validateEmpty(value)) {
		return '';
	}

	var minValue = el.getAttribute('data-min');
	if (minValue) {
		if (parseFloat(minValue) > parseFloat(value)) {
			return tranlateErrorMessage("Giá trị nhỏ nhất là {0}").format(minValue);
		}
	}

	var maxValue = el.getAttribute('data-max');
	if (maxValue) {
		if (parseFloat(maxValue) < parseFloat(value)) {
			return tranlateErrorMessage("Giá trị lớn nhất là {0}").format(maxValue);
		}
	}

	var lessThan = el.getAttribute('data-less');
	var greaterThan = el.getAttribute('data-greater');
	var before = el.getAttribute('data-before');
	var after = el.getAttribute('data-after');

	return '';
}

/**
 * Kiểm tra theo biểu thức chính quy nào đó.
 * @param item DOM
 */
function checkPattern(el) {
	var value = el.value.trim();

	var reg = el.getAttribute('data-pattern');
	if (reg) {
		if (value && !new RegExp(reg).test(value)) {
			return tranlateErrorMessage(el.getAttribute('data-pattern-error-message'));
		}
	}

	return '';
}

/**
 * TODO: Don't use this, use "Show password" instead.
 * @param el DOM
 */
function checkMatch(el) {
	var value = el.value.trim();

	var match = el.getAttribute('data-match');
	if (match) {
		if (value != document.querySelector(match).value) {
			return tranlateErrorMessage(el.getAttribute('data-match-error-message'));
		}
	}

	return '';
}
