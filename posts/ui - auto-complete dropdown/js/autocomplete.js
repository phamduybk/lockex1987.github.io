/**
 * Khởi tạo đối tượng auto-complete.
 * @param inp Đối tượng DOM của thẻ text input
 * @param arr Mảng các giá trị
 */
function autocomplete(inp, arr) {

    // Chỉ số của giá trị trang được chọn
    var currentFocus;

    // Thẻ DIV chứa các giá trị gợi ý
    // Tạo thẻ div chứa các giá trị gợi ý và thêm vào trang
    var containerDiv = document.createElement('DIV');
    containerDiv.setAttribute('id', inp.id + 'autocomplete-list');
    containerDiv.setAttribute('class', 'autocomplete-items');
    inp.parentNode.appendChild(containerDiv);

    // Mảng chứa các thẻ DIV
    var items;

    // Hàm thực hiện khi người dùng nhập giá trị
    inp.addEventListener('input', function (evt) {
        reset();

        var val = inp.value;
        if (!val) {
            return;
        }

        // Duyệt qua các giá trị gợi ý, kiểm tra phù hợp
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                // Tạo một thẻ DIV cho giá trị phù hợp
                var b = document.createElement('DIV');
                b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>'
                        + arr[i].substr(val.length)
                        + '<input type="hidden" value="' + arr[i] + '">';

                // Khi người dùng click vào giá trị
                // TODO: Nên sử dụng event delegation
                b.addEventListener('click', function (e2) {
                    inp.value = this.getElementsByTagName('input')[0].value;
                    reset();
                });
                containerDiv.appendChild(b);
                items.push(b);
            }
        }
    });

    // Thay đổi giá trị chọn khi người dùng nhấn phím UP hoặc DOWN
    // Chọn khi người dùng nhấn ENTER
    inp.addEventListener('keydown', function (evt) {
        if (!items) {
            return;
        }

        var keyCode = evt.keyCode;
        if (keyCode == 40) {
            currentFocus++;
            addActive();
        } else if (keyCode == 38) {
            currentFocus--;
            addActive();
        } else if (keyCode == 13) {
            // Đang có một giá trị được active
            if (currentFocus >= 0 && currentFocus < items.length) {
                // Không submit form
                e.preventDefault();

                // Hành động tương tự như được click
                items[currentFocus].click();
            }
        }
    });

    function addActive() {
        // Xóa các giá trị active cũ
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('autocomplete-active');
        }

        // Chỉnh lại chỉ số cho đúng
        if (currentFocus >= items.length) {
            currentFocus = 0;
        }
        if (currentFocus < 0) {
            currentFocus = items.length - 1;
        }
        
        // Highlight active
        items[currentFocus].classList.add('autocomplete-active');
    }

    function reset() {
        // Ẩn thẻ div cũ
        containerDiv.innerHTML = '';

        // Reset lại chỉ số chọn
        currentFocus = -1;
        items = [];
    }

    // Ẩn các thẻ div, trừ khi click vào chính nó hoặc click vào thẻ input tương ứng
    // TODO: Nên để ra ngoài, tránh trường hợp có nhiều autocomplete
    document.addEventListener('click', function (evt) {
        var elmnt = evt.target;
        document.querySelectorAll('.autocomplete-items').forEach(function (x) {
            if (elmnt != x && elmnt != inp) {
                x.innerHTML = '';
            }
        });
    });
}