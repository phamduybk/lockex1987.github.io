// Phân cách dấu phảy phần ngàn
function formatThousands(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function formatThousandsDemo() {
    console.info(formatThousands(2665)) // 2,665
    console.info(formatThousands(102665)) // 102,665
    console.info(formatThousands(111102665)) // 111,102,665
    console.info(formatThousands(1240.5)) // 1,240.5
    console.info(formatThousands(1000240.5)) // 1,000,240.5
    console.info(formatThousands(1.234567)) // 1.234,567
}

//formatThousandsDemo();
