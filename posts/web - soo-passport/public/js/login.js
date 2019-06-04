function getCsrfToken() {
    return document.head.querySelector('meta[name=csrf-token]').content;
}

function saveApiToken(token) {
    var csrfToken = getCsrfToken();
    var formData = new FormData();
    formData.append('token', token);
    fetch('/save-token', {
        method: 'POST',
        body: formData,
        headers:{
            'X-CSRF-TOKEN': csrfToken
        }
    })
    .then(response => {
        //alert(response.status);
        return response.json();
    })
    .then(data => {
        //alert(data);
        //console.log('Success:', data.code);
        window.location = LOGIN_REDIRECT + '?token=' + token;
    })
    .catch(error => alert(error));
}

function init() {
    document.querySelector('#loginForm').addEventListener("submit", function(evt) {
        // Ngăn không submit default
        evt.preventDefault();
        
        // Gọi API bên Reputa
        fetch('https://api.reputa.vn/authentication/login', {
            method: 'POST',
            body: JSON.stringify({
                username: document.querySelector('#username').value.trim(),
                password: document.querySelector('#password').value.trim()
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            //alert(JSON.stringify(data));
            if (data.code == 1) {
                document.querySelector('#errorMessage').style.display = 'block';
            } else {
                var token = data.data;
                saveApiToken(token);
            }
        });
    });
}

init();
