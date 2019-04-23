function prettifyNumber(num, digits) {
    if (!digits) {
        digits = 1;
    }

    var si = [
        { value: 1E18, symbol: "E" },
        { value: 1E15, symbol: "P" },
        { value: 1E12, symbol: "T" },
        { value: 1E9, symbol: "G" },
        { value: 1E6, symbol: "M" },
        { value: 1E3, symbol: "k" }
    ];
    for (var i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            var n = (num / si[i].value).toFixed(digits);

            // Xóa những chữ số 0 đằng sau dấu thập phân
            // Nếu chỉ để 0+ thì sẽ không xóa được dấu .
            // Nếu chỉ để \.0+ thì sẽ không xử lý được trường hợp 123.400
            return n.replace(/\.?0+$/, '') + si[i].symbol;
        }
    }
    return num;
}

function prettifyNumberDemo() {
    console.log(prettifyNumber(123400, 3));       // 123
    console.log(prettifyNumber(123, 1));       // 123
    console.log(prettifyNumber(1234, 1));      // 1.2k
    console.log(prettifyNumber(100000000, 1)); // 100M
    console.log(prettifyNumber(299792458, 1)); // 299.8M

    console.log(prettifyNumber(456)); // 456
    console.log(prettifyNumber(1002)); // 1k
    console.log(prettifyNumber(47000123.848393)); // 47M
    console.log(prettifyNumber(9999999999)); // 10B
    console.log(prettifyNumber(123123123123123)); // 123T
}

prettifyNumberDemo();
