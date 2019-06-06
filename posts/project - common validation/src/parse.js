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
