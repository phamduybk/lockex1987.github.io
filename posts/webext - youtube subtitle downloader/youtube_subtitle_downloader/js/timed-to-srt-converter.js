// timed-to-srt-converter.js
// Convert from YouTube timed format to popular SRT format.
//----------------------------------------------------------------------------------------
var converter = (function() {

	// Convert from YouTube closed caption format to srt format
	function convertFromTimedToSrtFormat(xml) {
        // Ví dụ 1 dòng dữ liệu:
        //   <p t="9720" d="2680">Lately, I&#39;ve been, I&#39;ve been thinking</p>
        // Đầu tiên là thời gian bắt đầu
        // Tiếp theo là độ dài
        // Tiếp theo là xâu nội dung
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
	
	// Format the time (that is in second) to the hh:mm:ss,SSS
	function formatTime(timeInSec) {
		var SSS = Math.floor(timeInSec * 1000) % 1000;
		timeInSec = Math.floor(timeInSec);
		var hh = Math.floor(timeInSec / 3600);
		var mm = Math.floor((timeInSec - (hh * 3600)) / 60);
		var ss = timeInSec - (hh * 3600) - (mm * 60);
		return fillZero(hh, 2) + ":" +
				fillZero(mm, 2) + ":" +
				fillZero(ss, 2) + "," +
				fillZero(SSS, 3);
	}

	// Fill the zero (0) to the left (padding)
	function fillZero(num, len) {
		var result = "" + num;
		var i;
		for (i = result.length; i < len; i++) {
			result = "0" + result;
		}
		return result;
	}

	return {
		convertFromTimedToSrtFormat: convertFromTimedToSrtFormat
	}
})();

