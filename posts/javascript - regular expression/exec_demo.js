function simple1() {
    // Match "quick brown" followed by "jumps", ignoring characters in between
    // Remember "brown" and "jumps"
    // Ignore case
    // Hãy thử thêm và bỏ modifier g sẽ thấy lastIndex thay đổi
    var re = /quick\s(brown).+?(jumps)/ig;
    var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
    console.log(result);
    console.log(re);
    console.log(`
        lastIndex: ${re.lastIndex}
        ignoreCase: ${re.ignoreCase}
        global: ${re.global}
        multiline: ${re.multiline}
        source: ${re.source}`);
}

//simple1();


function simple2() {
    // Tìm kiếm xâu "hello", rồi đến một dấu cách, rồi đến các ký tự không phải khoảng trắng
    var matches = /(hello \S+)/.exec('This is a hello world !');

    // This will log a message containing 'hello world'.
    console.log(matches[1]);
}

//simple2();


function successiveMatches() {
    var myRe = /ab*/g;
    var str = 'abbcdefabh';
    var myArray;

    while ((myArray = myRe.exec(str)) !== null) {
        console.log('Found ' + myArray[0] + '. Next match starts at ' + myRe.lastIndex);
    }

    // This script displays the following text:
    // Found abb. Next match starts at 3
    // Found ab. Next match starts at 9

    // Thuộc tính lastIndex không tự reset nên đoạn code sau sẽ không in ra gì nữa
    // Thực ra nó vẫn in ra như trên vì ở vòng lặp trên, sau khi kết thúc vòng lặp thì lastIndex bị quay trở về 0 (ở lần thực hiện cuối mà trả về null)
    // Thử sửa nó xem sao
    // Nếu thiết lập lastIndex bằng 4 thì sẽ không tìm thấy kết quả thứ nhất nữa
    //myRe.lastIndex = 4;
    while ((myArray = myRe.exec(str)) !== null) {
        console.log('Found ' + myArray[0] + '. Next match starts at ' + myRe.lastIndex);
    }
}

//successiveMatches();


function successiveMatches2() {
    // Bắt đầu bằng "fo", sau đó là 0 hoặc nhiều chữ "o"
    var regex1 = RegExp('foo*','g');
    var str1 = 'table football, fooosball';
    var array1;

    while ((array1 = regex1.exec(str1)) !== null) {
        console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
    }

    // expected output:
    // "Found foo. Next starts at 9."
    // "Found foo. Next starts at 20."
}

//successiveMatches2();


function execVsMatch() {
    var myString = "[22].[44].[33].";
    
    console.log(myString.match(/\d+/));
    // [ '22', index: 1, input: '[22].[44].[33].' ]
    console.log(myString.match(/\d+/g));
    // [ '22', '44', '33' ]

    var myRegexp = /\d+/g;
    var result;
    while (result = myRegexp.exec(myString)) {
        console.log(result);
    }
    // [ '22', index: 1, input: '[22].[44].[33].' ]
    // [ '44', index: 6, input: '[22].[44].[33].' ]
    // [ '33', index: 11, input: '[22].[44].[33].' ]
}

//execVsMatch();


/**
 * Thiếu flag g.
 */
function infiniteLoop1() {
    var myString = "[22].[44].[33].";
    var myRegexp = /\d+/;
    var result;
    
    while (result = myRegexp.exec(myString)) {
        console.log(result, myRegexp.lastIndex);
    }
}

//infiniteLoop1();

/**
 * Không dùng biến regex ở ngoài vòng lặp.
 */
function infiniteLoop2() {
    var myString = "[22].[44].[33].";
    var result;
    
    while (result = /\d+/g.exec(myString)) {
        console.log(result);
    }
}

//infiniteLoop2();


/**
 * Trích xuất thông tin ngày tháng năm.
 * @param string Xâu dạng dd-mm-yyyy
 */
function getDate(string) {
    let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    return new Date(year, month - 1, day);
}

//console.log(getDate("1-30-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)


/**
 * Lấy thông tin giữa 2 dấu nháy.
 */
function getQuotedText() {
    let quotedText = /'([^']*)'/;
    console.log(quotedText.exec("she said 'hello'"));
    // → ["'hello'", "hello"]
}

//getQuotedText();


function captureGroupDemo() {
    // Không tìm thấy capture group
    console.log(/bad(ly)?/.exec("bad"));
    // → ["bad", undefined]


    // Chỉ trả về capture group cuối cùng
    console.log(/(\d)+/.exec("123"));
    // → ["123", "3"]
}

//captureGroupDemo();


/**
 * Convert from YouTube closed caption format to srt format
 * @param xml Xâu
 */
function convertFromTimedToSrtFormat(xml) {
    var myRe = /<text start="([\d\.]+)" dur="([\d\.]+)">([^<]*)/g;
    var myArray;
    var content = "";
    var count = 1;
    
    while ((myArray = myRe.exec(xml)) != null) {
        var startTime = parseFloat(myArray[1]);
        var endTime = startTime + parseFloat(myArray[2]);
        var line = myArray[3].replace(/\\n/g, "\n").replace(/\\"/g, "\"").trim();
        
        content += count + "\n" +
                formatTime(startTime) + " --> " + formatTime(endTime) + "\n" +
                line + "\n\n";
        count++;
    }
    return unescapeHTML(content);
}


function search() {
    var obj = /e/.exec("The best things in life are free!");
    console.log("Found " + obj[0] + " in position " + obj.index + " in the text: " + obj.input);
}

search();
