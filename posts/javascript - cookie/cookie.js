/**
 * Thiết lập cookie.
 * @param cname Tên cookie
 * @param cvalue Giá trị của cookie
 * @param exdays Thời gian tồn tại của cookie (tính theo ngày)
 * @param domain Domain của cookie
 */
function setCookie(cname, cvalue, exdays, domain) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    document.cookie = cname + "=" + cvalue + ";" + "expires=" + d.toUTCString() + ";path=/" + (domain ? ";domain=" + domain : "");
}

/**
 * Lấy giá trị cookie.
 * @param cname Tên cookie
 * @returns Giá trị của cookie
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


