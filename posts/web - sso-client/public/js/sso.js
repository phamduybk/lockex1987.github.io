// PART 1: CÁC HÀM XỬ LÝ COOKIE

/**
 * Thiết lập cookie.
 * @param cname Tên cookie
 * @param cvalue Giá trị của cookie
 * @param exseconds Thời gian tồn tại của cookie (tính theo giây)
 * @param domain Domain của cookie (thiết lập domain là domain chính để share cookie giữa các sub-domain)
 */
function setCookie(cname, cvalue, exseconds, domain) {
    var d = new Date();
    d.setTime(d.getTime() + (exseconds * 1000));
    document.cookie = cname + "=" + encodeURIComponent(cvalue) +
			";expires=" + d.toUTCString() +
			";path=/" +
            (domain ? ";domain=" + domain : "");
}

/**
 * Lấy giá trị cookie.
 * @param cname Tên cookie
 * @returns Giá trị của cookie
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        c = c.trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

/**
 * Xóa cookie.
 * @param cname Tên cookie
 * @param domain Domain của cookie (thiết lập domain là domain chính để share cookie giữa các sub-domain)
 */
function deleteCookie(cname, domain) {
    // Thiết lập giá trị rỗng
    // với thời hạn là một ngày trong quá khứ
	document.cookie = cname + "=" +
            ";expires=Thu, 01 Jan 1970 00:00:00 UTC" +
            ";path=/" +
            (domain ? ";domain=" + domain : "");
}

// PART 2: CÁC HÀM TIỆN ÍCH

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
