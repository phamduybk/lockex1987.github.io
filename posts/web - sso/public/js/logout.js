/**
 * Xử lý đăng xuất.
 */
function processLogout() {
    var token = getTokenCookie();
    if (!token) {
        console.log('Không có token');
        window.location = '/';
        return;
    }

    fetch('/api/logout', {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            // Xóa cookie
            // Xóa bằng server rồi
            //deleteTokenCookie();

            window.location = '/';
        })
        .catch(error => console.error(error));
}

processLogout();
