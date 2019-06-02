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
