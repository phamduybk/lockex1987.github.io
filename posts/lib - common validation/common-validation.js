/**
 * Hàm tiện ích dịch message lỗi.
 * Nếu muốn đa ngôn ngữ (ví dụ với jQuery lang) thì hãy ghi đè hàm này.
 * @param msg Message lỗi
 */
function tranlateErrorMessage(msg) {
	return msg;
}

/**
 * Thêm CSS bằng JavaScript, để người sử dụng chỉ cần include 1 file là file JavaScript,
 * không cần include file CSS nữa.
 * @param cssCode Mã CSS
 */
function addCss(cssCode) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = cssCode;
	} else {
		styleElement.appendChild(document.createTextNode(cssCode));
	}
	document.getElementsByTagName("head")[0].appendChild(styleElement);
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
	// Split ngày tháng năm
	var arrayDate = value.split(/\-|\/|\./);
	var intDay = parseInt(arrayDate[0], 10);
	var intMonth = parseInt(arrayDate[1], 10);
	var intYear = parseInt(arrayDate[2]);

	return (intDay < 10 ? ('0' + intDay) : intDay) +
			'/' + (intMonth < 10 ? ('0' + intMonth) : intMonth) +
			'/' + intYear;
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
 * @param el DOM
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

/**
 * Kiểm tra dung lượng file và đuôi file.
 * @param el DOM.
 */
function checkFileSizeAndType(el) {
	// Nếu không phải là file thì bỏ qua luôn
	if (el.type != "file") {
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

	var dataMaxFileSize = el.getAttribute('data-max-file-size');
	if (dataMaxFileSize) {
		var filesize = file.size;
		filesize = parseFloat(filesize / 1024 / 1024).toFixed(2);
		if (filesize > parseFloat(dataMaxFileSize)) {
			msg.push('Dung lượng file vượt quá {0} MB ({1} MB)'.format(dataMaxFileSize, filesize));
		}
	}

	var dataFileTypes = el.getAttribute('data-file-types');
	if (dataFileTypes) {
		var filename = file.name;
		var regex = new RegExp("(.*?)\.(" + dataFileTypes.toLowerCase() + ")$");
		if (!(regex.test(filename.toLowerCase()))) {
			msg.push('Vui lòng chọn file: ' + dataFileTypes.toUpperCase().replace(/\|/g, ', '));
		}
	}

	return msg.join('\n');
}/**
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
	document.addEventListener('input', function(event) {
		var el = event.target;
		if (el.matches('.has-error')) {
			clearSingleErrorMessage(el);
		}
	});
	*/

	// Khi click vào thông báo lỗi thì xóa nó	
	document.addEventListener('click', function(event) {
		var el = event.target;
		if (el.matches('.error-message')) {
			el.style.transition = 'opacity 100ms';
			el.addEventListener('transitionend', function() {
				el.parentNode.removeChild(el);
			});
			el.style.opacity = '0';
		}
	});

	// jQuery plugin
	/*
	$.fn.invalidForm = function () {
		//console.log('id: ' + this.attr('id'));
		return invalidForm('#' + this.attr('id'));
	};
	*/

	addCss(`
			.validate-container { position: relative; }
			.validate-container .has-error { border-color: red; background-color: yellow; }
			.validate-container .valid { /*border-color: green; background-color: cyan;*/ }
			/*.validate-container .error-message { position: absolute; right: 10px; top: 10px; background-color: rgba(255, 0, 0, 0.75); color: white;
					padding: 3px 8px; border-radius: 4px; cursor: pointer; white-space: pre-wrap; }*/
<<<<<<< HEAD
			.validate-container .error-message { margin-top: .25rem; font-size: 80%; color: #dc3545; white-space: pre-wrap; }`);
=======
			.validate-container .error-message { margin-top: .25rem; font-size: 80%; color: #dc3545; }
`);
>>>>>>> 9e2f5e069f4d35f8a10b694ab90b532d86c56106
})();
