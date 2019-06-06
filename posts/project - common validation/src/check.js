/**
 * Yêu cầu nhập.
 * @param el DOM
 */
function checkRequired(el) {
	if (!el.validation.requiredMessage) {
		return '';
	}

	var value = el.value.trim();

	// Chú ý trường hợp nhập 0 nên không sử dụng "if (!value)"
	if (validateEmpty(value)) {
		return tranlateErrorMessage(el.validation.requiredMessage);
	}
}

/**
 * Chiều dài dữ liệu.
 * @param el Đối tượng DOM 
 */
function checkLength(el) {
	var value = el.value.trim();

	var min = el.validation.minLength;
	if (min) {
		if (value.length < min) {
			return tranlateErrorMessage('Vui lòng nhập ít nhất {0} ký tự').format(min);
		}
	}

	var max = el.validation.maxLength;
	if (max) {
		if (value.length > parseInt(max)) {
			return tranlateErrorMessage('Vui lòng nhập nhiều nhất {0} ký tự').format(max);
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

	// Nếu không nhập rồi thì không validate nữa
	if (validateEmpty(value)) {
		return '';
	}

	if (el.validation.email) {
		if (!validateEmail(value)) {
			return tranlateErrorMessage('Email không hợp lệ');
		}
	}

	if (el.validation.phone) {
        value = normalizePhoneNumber(value);
        el.value = value;

		if (!validatePhoneLength(value)) {
			return 'Số điện thoại dài từ 9 đến 12 số. Bạn nhập vào {0} số'.format(value.length);
		}

		if (!validatePhoneFormat(value)) {
			return tranlateErrorMessage('Số điện thoại chỉ được bao gồm số');
		}
	}

	if (el.validation.integer) {
		if (!validateInteger(value)) {
			return tranlateErrorMessage('Số nguyên không hợp lệ');
		}
	}

	if (el.validation.numeric) {
		if (!validateNumber(value)) {
			return tranlateErrorMessage('Số không hợp lệ');
		}
	}

    if (el.validation.date) {
        if (!validateDate(value)) {
            return tranlateErrorMessage('Ngày không hợp lệ');
        } else {
            //value = normalizeDate(value);
            //el.value = value;
        }
    }

    if (el.validation.idNumber) {
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
    if (el.validation.password) {
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

	// Domain, IP, URL, time,...

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

	var minValue = el.validation.min;
	if (minValue) {
		if (minValue > parseFloat(value)) {
			return tranlateErrorMessage('Giá trị nhỏ nhất là {0}').format(minValue);
		}
	}

	var maxValue = el.validation.max;
	if (maxValue) {
		if (maxValue < parseFloat(value)) {
			return tranlateErrorMessage('Giá trị lớn nhất là {0}').format(maxValue);
		}
	}

	/*
	var lessThan = ;
	var greaterThan = ;
	var before = ;
	var after = ;
	*/

	return '';
}

/**
 * Kiểm tra theo biểu thức chính quy nào đó.
 * @param el DOM
 */
function checkPattern(el) {
	var value = el.value.trim();

	if (el.validation.regexPattern) {
		if (value && !new RegExp(el.validation.regexPattern).test(value)) {
			return tranlateErrorMessage(el.validation.regexPatternMessage);
		}
	}

	return '';
}

/**
 *Don't use this, use 'Show password' instead.
 * @param el DOM
 */
function checkMatch(el) {
	var value = el.value.trim();

	var match = el.validation.same;
	if (match) {
		if (value != document.querySelector(match).value) {
			return tranlateErrorMessage(el.validation.sameMessage);
		}
	}

	return '';
}

/**
 * Kiểm tra dung lượng file và đuôi file.
 * @param el DOM.
 */
function checkFileSizeAndType(el) {
	// Nếu không phải là file thì bỏ qua luôn
	if (el.type != 'file') {
		return '';
	}

	// Nếu chưa chọn file cũng bỏ qua luôn
	if (el.files.length == 0) {
		return '';
	}

	// File là phần tử thứ nhất
	var file = el.files[0];
	
	// Danh sách lỗi
	var msg = [];

	var maxFileSize = el.validation.maxFileSize;
	if (maxFileSize) {
		var filesize = file.size;
		filesize = parseFloat(filesize / 1024 / 1024).toFixed(2);
		if (filesize > maxFileSize) {
			msg.push('Dung lượng file vượt quá {0} MB ({1} MB)'.format(maxFileSize, filesize));
		}
	}

	var fileTypes = el.validation.fileTypes;
	if (fileTypes) {
		var filename = file.name;
		var regex = new RegExp('(.*?)\.(' + fileTypes.toLowerCase().replace(/,/g, '|') + ')$');
		if (!(regex.test(filename.toLowerCase()))) {
			msg.push('Vui lòng chọn file: ' + fileTypes.toUpperCase().replace(/\|/g, ', '));
		}
	}

	return msg.join('\n');
}