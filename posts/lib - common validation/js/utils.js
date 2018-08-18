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
