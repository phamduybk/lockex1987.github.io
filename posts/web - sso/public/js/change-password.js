/**
 * Xử lý đổi mật khẩu.
 */
function handleChangePassword() {
    var token = getTokenCookie();
    if (!token) {
        console.log('Không có token');
        return;
    }

    var formData = new FormData(document.querySelector('#frm'));
    fetch('/api/change-password', {
            method: 'POST',
            body: formData,
            headers:{
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

			// Ẩn các thông báo lỗi cũ
			document.querySelectorAll('.message').forEach(div => div.style.display = 'none');

            if (data.code == 'error') {
                // Hiển thị thông báo lỗi
                document.querySelector('#errorMessage').style.display = 'block';
            } else {
                // Hiển thị thông báo thành công
                document.querySelector('#successMessage').style.display = 'block';
            }
        })
        .catch(error => console.error(error));
}

function init() {
    document.querySelector('#frm').addEventListener("submit", function(evt) {
        // Ngăn không submit default
        evt.preventDefault();

        handleChangePassword();
    });
}

init();