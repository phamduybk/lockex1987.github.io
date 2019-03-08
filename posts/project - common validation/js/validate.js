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
