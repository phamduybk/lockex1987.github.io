/**
 * Xử lý đăng nhập.
 */
function handleLogin() {
    var formData = new FormData(document.querySelector('#loginForm'));
    fetch('/api/login', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
			// Ẩn các thông báo lỗi cũ
			document.querySelectorAll('.message').forEach(div => div.style.display = 'none');

            if (data.status != 'ok') {
                // Hiển thị thông báo lỗi
                document.querySelector('#errorMessage').style.display = 'block';
            } else {
                // Lưu token vào cookie
                var ttl = data.ttl; // thời gian hiệu lực của token (theo giây)
                var token = data.token;

                // Lưu cookie
                // Thiết lập cookie bằng HTTP rồi
                //saveTokenCookie(token, ttl);

                // Chuyển đến ứng dụng vệ tinh luôn
                getUserInfo(token);
            }
        })
        .catch(error => {
            console.error(error)
        });
}

/**
 * Lấy thông tin người dùng.
 */
function getUserInfo(token) {
    fetch('/api/user', {
            headers:{
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            // Nếu có lỗi (ví dụ token không hợp lệ) thì dừng lại
            if (data.error) {
                console.log(data.error);
                return;
            }

            var apps = data.apps;
            if (apps && apps.length > 0) {
                if (apps.length == 1) {
                    // Chuyển đến ứng dụng
                    window.location = apps[0].url;
                } else {
                    // Hiển thị chọn ứng dụng
                    var appList = document.querySelector('#chooseApp ul');
                    appList.innerHTML = '';
                    apps.forEach(a => {
                        var liTag = document.createElement('li');
                        var aTag = document.createElement('a');
                        aTag.href = a.url;
                        aTag.textContent = a.name;
                        liTag.appendChild(aTag);
                        appList.appendChild(liTag);
                    });

                    document.querySelector('#chooseApp').style.display = 'block';
                }
            } else {
                // Hiển thị thông báo
                document.querySelector('#noAppMessage').style.display = 'block';
            }
        })
        .catch(error => alert(error));
}

/**
 * Refresh token.
 */
function processRefreshToken() {
    var token = getTokenCookie();
    if (!token) {
        console.log('Không có token');
        return;
    }

    fetch('/api/refresh', {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            // Lưu token mới vào cookie
            saveTokenCookie(data.token, data.ttl);

            console.log('Refresh thành công');
        })
        .catch(error => {
            console.error(error)
        });
}

function initLogin() {
    document.querySelector('#loginForm').addEventListener("submit", function(evt) {
        // Ngăn không submit default
        evt.preventDefault();

        handleLogin();
    });

    // Nếu vẫn có token rồi thì xử luôn
    var token = getTokenCookie();
    if (token) {
        getUserInfo(token);
    }    
}

initLogin();