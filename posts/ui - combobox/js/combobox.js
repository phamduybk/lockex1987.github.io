/**
Tạo combobox. Người dùng vừa có thể nhập giá trị như thẻ input bình thường, vừa có thể chọn từ danh sách như thẻ select.
Có thể thêm tùy chọn validate nếu giá trị nhập giống hay không giống trong danh sách.
 */
(function() {
    function initAllCombobox() {
        var allCombobox = document.querySelectorAll('.combobox');
        allCombobox.forEach(ele => initSingleCombobox(ele));

        // Khi không focus nữa thì ẩn danh sách
        document.addEventListener('click', () => {
            allCombobox.forEach(ele => ele.classList.remove('expanded'));
        });

        // Cần thêm cả đoạn code dưới
        // Sẽ bị lỗi khi đang ở combobox1, đang mở combobox1, nếu click tiếp vào combobox2
        // thì hiển thị cả combobox1 và combobox2
        allCombobox.forEach(ele => {
            ele.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                //ele.classList.add('expanded');
            });
        });
    }

    function initSingleCombobox(ele) {
        var inputTag = ele.querySelector('input');

        // Khi focus thì hiển thị danh sách
        inputTag.addEventListener('focus', () => {
            ele.classList.add('expanded');
        });

        // Duyệt danh sách các tùy chọn của danh sách
        ele.querySelectorAll('ul li').forEach(liTag => {
            var text = liTag.textContent.trim();

            // Nếu click vào một giá trị ở danh sách thì thiết lập giá trị của thẻ input
            liTag.addEventListener('click', () => {
                console.log('clicked');
                inputTag.value = text;
                ele.classList.remove('invalid');
                ele.classList.remove('valid');
                ele.classList.remove('expanded');
            }); 
        });

        addValidation(ele);   
    }

    function addValidation(ele) {
        // Danh sách các giá trị (có phân biệt hoa thường, không phân biệt hoa thường)
        var combolist = [];
        var combolist2 = [];

        ele.querySelectorAll('ul li').forEach(liTag => {
            var text = liTag.textContent.trim();

            // Thêm vào danh sách
            combolist.push(text);
            combolist2.push(text.toLowerCase());
        });

        // Khi người dùng nhập thì kiểm tra xem có giống trong danh sách hay không
        var inputTag = ele.querySelector('input');
        inputTag.addEventListener('input', () => {
            var val = inputTag.value.trim();
            if (combolist.includes(val) || combolist2.includes(val.toLowerCase())) {
                ele.classList.remove('invalid');
                ele.classList.add('valid');
            } else {
                ele.classList.remove('valid');
                ele.classList.add('invalid');
            }
        });
    }

    initAllCombobox();
})();