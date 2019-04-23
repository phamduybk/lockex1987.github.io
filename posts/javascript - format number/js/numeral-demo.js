// Sử dụng thư viện numeral
function numeralDemo() {
    console.log(numeral(1230974).format('0.00 a'));
    console.log(numeral(100).format('0b')); // 100B
    console.log(numeral(1024).format('0b')); // 1KB
    console.log(numeral(2048).format('0 ib')); // 2 KiB
    console.log(numeral(3072).format('0.0 b')); // 3.1 KB
    console.log(numeral(7884486213).format('0.00b')); // 7.88GB
    console.log(numeral(3467479682787).format('0.000 ib')); // 3.154 TiB
}

//numeralDemo();