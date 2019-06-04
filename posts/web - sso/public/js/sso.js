// Tên cookie lưu giá trị token
const TOKEN_VALUE_COOKIE_NAME = 'token';

/**
 * Lấy domain gốc, ví dụ ".reputa.vn".
 */
function getRootDomain() {
    var temp = location.host.split('.').reverse();
    var rootDomain = '.' + temp[1] + '.' + temp[0];
    return rootDomain;
}

/**
 * Lưu giá trị token vào cookie.
 * @param {String} token Giá trị token
 * @param {Integer} ttl Thời gian sống của cookie (tính theo giây)
 */
function saveTokenCookie(token, ttl) {
    var cname = TOKEN_VALUE_COOKIE_NAME;
    var cvalue = token;
    var exseconds = ttl;
    var domain = getRootDomain();
    setCookie(cname, cvalue, exseconds, domain);
}

/**
 * Lấy giá trị của token trong cookie.
 */
function getTokenCookie() {
    return getCookie(TOKEN_VALUE_COOKIE_NAME);
}

/**
 * Xóa giá trị của token trong cookie.
 */
function deleteTokenCookie() {
    deleteCookie(TOKEN_VALUE_COOKIE_NAME, getRootDomain());
}
