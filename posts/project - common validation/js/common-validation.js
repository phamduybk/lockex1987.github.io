/**
 * Hàm tiện ích dịch message lỗi.
 * Nếu muốn đa ngôn ngữ thì hãy ghi đè hàm này.
 * @param msg Message lỗi
 */
function tranlateErrorMessage(msg) {
	return msg;
}
/**
 * Chuẩn hóa số điện thoại: loại bỏ các ký tự không phải là số.
 * @param value Xâu giá trị
 */
function normalizePhoneNumber(value) {
	return value.replace(/[^0-9]/g, '');
}

/**
 * Chuẩn hóa ngày tháng về dạng dd/mm/yyyy.
 * Test-case:
 * ['1/1/2018'].forEach(s => console.log(normalizeDate(s)))
 * @param value Xâu đầu vào, là một ngày đã hợp lệ
 */
function normalizeDate(value) {
	// Split ngày tháng năm (theo các ký tự gạch ngang, slash, chấm)
	var arr = value.split(/\-|\/|\./);
	var intDay = parseInt(arr[0], 10);
	var intMonth = parseInt(arr[1], 10);
	var intYear = parseInt(arr[2]);

	return (intDay < 10 ? ('0' + intDay) : intDay) +
			'/' +
			(intMonth < 10 ? ('0' + intMonth) : intMonth) +
			'/' +
			intYear;
}
/**
 * Kiểm tra một giá trị có phải là bỏ trống hay không.
 * Chú ý: nhập 0 không coi là rỗng, sẽ trả về false.
 * @param value Giá trị
 * @returns true nếu val là rỗng
 */
function validateEmpty(value) {
	return (value == null || value === '');
}

/**
 * Kiểm tra định dạng ngày.
 * Các định dạng ngày hợp lệ là:
 * dd/mm/yyyy or dd-mm-yyyy or dd.mm.yyyy
 * Test-case:
 * Đúng: ['11/05/1987', '17/05/1987', '1/1/2000', '29/02/2000', '31/12/2018'].forEach(s => console.log(validateDate(s)))
 * Sai: ['29/02/1987', '29/02/1900', '31/04/2000'].forEach(s => console.log(validateDate(s)))
 */
function validateDate(value) {
	var regExp = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/

	// Check to see if in correct format
	if (!regExp.test(value)) {
		// Doesn't match pattern, bad date
		return false;
	} else {
		// Split ngày tháng năm
		var arrayDate = value.split(/\-|\/|\./);
		var intDay = parseInt(arrayDate[0], 10);
		var intMonth = parseInt(arrayDate[1], 10);
		var intYear = parseInt(arrayDate[2]);

		//console.log(intDay, intMonth, intYear);

		// Create a lookup for months not equal to Feb.
		var arrayLookup = {
			'1': 31,
			'3': 31,
			'4': 30,
			'5': 31,
			'6': 30,
			'7': 31,
			'8': 31,
			'9': 30,
			'10': 31,
			'11': 30,
			'12': 31
		}

		// Check if month value and day value agree
		if (arrayLookup[intMonth] != null) {
			if (intDay <= arrayLookup[intMonth] && intDay > 0) {
				// Found in lookup table, good date
				return true;
			}
		}

		// Check for February
		if (intMonth == 2) {
			if (intDay > 0 && intDay < 29) {
				return true;
			} else if (intDay == 29) {
				if ((intYear % 4 == 0 && intYear % 100 != 0) || (intYear % 400 == 0)) {
					// Year div by 4 and ((not div by 100) or div by 400) -> ok
					return true;
				}
			}
		}
	}

	// Any other values, bad date
	return false;
}

/**
 * Validate địa chỉ email.
 * @param value Địa chỉ email
 * @return true nếu địa chỉ email hợp lệ
 */
function validateEmail(value) {
	var regExp = /(^[a-z]([a-z0-9_\.]*)@([a-z_\.]*)([.][a-z]{3})$)|(^[a-z]([a-z0-9_\.]*)@([a-z_\.]*)(\.[a-z]{3})(\.[a-z]{2})*$)/i;
	return regExp.test(value);
}

/**
 * Validate số điện thoại.
 * @param value 
 */
function validatePhoneFormat(value) {
	var regExp = /^\d*$/;
	return regExp.test(value);
}

/**
 * Validate độ dài số điện thoại.
 * @param value 
 */
function validatePhoneLength(value) {
	// Tu 9 den 12 ky tu
	const minLength = 9;
	const maxLength = 12;
	return (minLength <= value.length && value.length <= maxLength);
}

/**
 * Validate là số nguyên.
 * @param value 
 */
function validateInteger(value) {
	var regExp = /(^-?\d\d*$)/;
	return regExp.test(value);
}

/**
 * Validate là số nói chung.
 * @param value Xâu giá trị
 */
function validateNumber(value) {
	// Regular Expression: /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
	return !isNaN(value);
}

/**
 * Validate URL hợp lệ.
 * @param value Giá trị URL
 * @returns true nếu giá trị là một URL hợp lệ
 */
function validateUrl(value) {
	var regExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
	return regExp.test(value);
}

/**
 * Validate chứng minh thư chỉ có 9 hoặc 12 ký tự.
 * @param value Giá trị
 */
function validateIdNumberLength(value) {
	const length1 = 9;
	const length2 = 12;
	return (value.length == length1 || value.length == length2);
}

/**
 * Validate chứng minh thư chỉ chứa chữ hoặc số.
 * @param value Giá trị
 */
function validateIdNumberOnlyLetter(value) {
	return /^[a-zA-Z\d]+$/.test(value);
}

/**
 * Validate chứng minh thư phải có số (không được chỉ gồm chữ thôi).
 * @param value Giá trị
 */
function validateIdNumberHasNumber(value) {
	return /\d+/.test(value);
}

/**
 * Validate mật khẩu ít nhất 8 ký tự.
 * @param value 
 */
function validatePasswordLength(value) {
	return value.length >= 8;
}

/**
 * Validate mật khẩu không được chứa dấu cách.
 * @param value 
 */
function validatePasswordSpace(value) {
	const spacePattern = /\s/g;
	return value.match(spacePattern);
}

/**
 * Validate mật khẩu không được chứa ký tự tiếng Việt.
 * @param value 
 */
function validatePasswordVietnamese(value) {
	const vietnamesePattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi;
	return value.match(vietnamesePattern);
}
/**
 * Parse các valiation rule, cho vào thuộc tính validation.
 * @param {DOMNode} el Đối tượng DOM
 */
function parseValidation(el) {
    el.validation = {};

    // Người dùng truyền bằng thuộc tính data-validation
    if (el.dataset.validation) {
        var arr = el.dataset.validation.split('|');
        arr.forEach(rule => {
            var temp = rule.split(':');
            var s = temp[0];
            if (s == 'required') {
                el.validation.requiredMessage = (temp.length > 1) ? temp[1] : 'Vui lòng nhập trường này';
            } else if (s == 'email') {
                el.validation.email = true;
            } else if (s == 'phone') {
                el.validation.phone = true;
            } else if (s == 'integer') {
                el.validation.integer = true;
            } else if (s == 'numeric') {
                el.validation.numeric = true;
            } else if (s == 'date') {
                el.validation.date = true;
            } else if (s == 'idNumber') {
                el.validation.idNumber = true;
            } else if (s == 'password') {
                el.validation.password = true;
            } else if (s == 'regex') {
                el.validation.regexPattern = temp[1];
                el.validation.regexPatternMessage = temp[2];
            } else if (s == 'minLength') {
                el.validation.minLength = parseInt(temp[1]);
            } else if (s == 'maxLength') {
                el.validation.maxLength = parseInt(temp[1]);
            } else if (s == 'min') {
                el.validation.min = parseFloat(temp[1]);
            } else if (s == 'max') {
                el.validation.max = parseFloat(temp[1]);
            } else if (s == 'same') {
                el.validation.same = temp[1];
                el.validation.sameMessage = temp[2];
            } else if (s == 'maxFileSize') {
                el.validation.maxFileSize = parseFloat(temp[1]);
            } else if (s == 'fileTypes') {
                el.validation.fileTypes = temp[1];
            }
        })
    }
}
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
}/**
 * Xóa các thông báo lỗi.
 * @param formSelector Form CSS selector, có thể nhập hoặc không
 */
function clearErrorMessages(formSelector) {
	var prefix = formSelector ? (formSelector + ' ') : '';
	document.querySelectorAll(prefix + '.validate-container .has-error').forEach(function (el) {
		clearSingleErrorMessage(el);
	});
}

/**
 * Xóa thông báo lỗi.
 * @param {DOMNode} el Đối tượng input
 */
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
	message.className = 'error-message';
    var text = errorMessage;
    // Hiển thị nhiều thông báo một lúc
    if (Array.isArray(errorMessage)) {
        text = '';
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
 * Validate trường đầu vào.
 * Lấy thông báo lỗi của 1 trường input.
 * Trả về khác NULL và khác rỗng nếu có lỗi.
 * @param el 
 */
function getValidateError(el) {
    // Không validate trường ẩn hoặc bị disabled
    if (el.style.display == 'none' || el.style.visibility == 'hidden' || el.disabled == true) {
        return null;
    }

    // Nếu chưa parse các luật validation thì parse
    if (!el.validation) {
        parseValidation(el);
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
			formSelector + ' .validate-container select').forEach(function (el) {
        
        // Trim giá trị
        if (el.type != 'file') {
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
		} else {
            // Chuẩn hóa định dạng ngày tháng
            if (el.validation.date) {
                var value = el.value;
                if (validateDate(value)) {
                    value = normalizeDate(value);
                    el.value = value;
                }
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
function addRealTimeValidation() {
    document.addEventListener('input', function (evt) {
        var target = evt.target;
        if (target.matches(' .validate-container input, ' +
			        ' .validate-container textarea, ' +
			        ' .validate-container select')) {
            var el = target;
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
        }
    });
}
// Init
(function() {
	// Thêm hàm String format
	if (!String.prototype.format) {
		String.prototype.format = function () {
			var args = arguments;

			return this.replace(/{(\d+)}/g, function (match, number) {
				return (typeof args[number] != 'undefined') ? args[number] : match;
			});
		};
	}

	// Khi người dùng đánh vào hoặc sửa phần tử bị lỗi thì xóa thông báo lỗi của phần tử đó
	/*
	document.addEventListener('input', function (event) {
		var el = event.target;
		if (el.matches('.has-error')) {
			clearSingleErrorMessage(el);
		}
	});
	*/

	// Khi click vào thông báo lỗi thì xóa nó
	// Trường hợp .error-message có position absolute
	document.addEventListener('click', function (event) {
		var el = event.target;
		if (el.matches('.error-message')) {
			el.style.transition = 'opacity 100ms';
			el.addEventListener('transitionend', function () {
				el.parentNode.removeChild(el);
			});
			el.style.opacity = '0';
		}
	});

	addRealTimeValidation();
})();
