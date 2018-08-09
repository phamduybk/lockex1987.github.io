// timed-to-srt-converter.js
// Convert from YouTube timed format to popular SRT format.
//----------------------------------------------------------------------------------------
var converter = (function() {

	// Convert from YouTube closed caption format to srt format
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
	
	// Format the time (that is in milisecond) to the hh:mm:ss,SSS
	function formatTime(timeInMiliSec) {
		timeInMiliSec = Math.floor(timeInMiliSec * 1000);
		var SSS = timeInMiliSec % 1000;
		timeInMiliSec = Math.floor(timeInMiliSec / 1000);
		var hh = Math.floor(timeInMiliSec / 3600);
		var mm = Math.floor((timeInMiliSec - (hh * 3600)) / 60);
		var ss = timeInMiliSec - (hh * 3600) - (mm * 60);
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
