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
