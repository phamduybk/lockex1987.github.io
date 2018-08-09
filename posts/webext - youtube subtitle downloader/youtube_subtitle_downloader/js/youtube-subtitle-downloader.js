// youtube-subtitle-downloader.js
// Main functions
//----------------------------------------------------------------------------------------
var ysd = (function() {

	// The ID of the video
	var videoId;

	// Dia chi URL hien tai
	var currentLocation = "";

	const DELAY_CHECK = 500;

	/**
	 * Hàm này sẽ được gọi định kỳ.
	 */
	function checkSubtitle() {
		if (currentLocation != location.href) {
			var queryString = getQueryString();
			videoId = extractVideoId(queryString);
			if (videoId) {
                console.log("videoId: " + videoId);
				// La dia chi co video
				if (gui.canInsert()) {
					// Neu co the them
					if (!gui.isClassicGui() || !gui.exists()) {
						// Neu la giao dien moi
						// hoac giao dien cu va chua ton tai
						// Phai cho cho cac chan co the them video
						currentLocation = location.href;
						//console.log("Current location: " + currentLocation + ", Video ID: " + videoId);
						getSubtitleList(videoId);
					}
				}
			} else {
				// Neu la dia chi ma khong phai la xem (khong co video thi dung luon)
				currentLocation = location.href;
				//console.log("Current location (no video): " + currentLocation);
			}
		}

		setTimeout(checkSubtitle, 500);
	}

	// Initialize
	function init() {
		setTimeout(checkSubtitle, 500);
	}


	function addAjaxListener() {
		console.log("Register Structured Page Fragments event");
		document.addEventListener("spfdone", function() {
			console.log("Structured Page Fragments done");
			ysd.init();
		});
	}

	

	// Get the video ID
	// Video ID is provided by "v" parameter
	function extractVideoId(queryString) {
		var a = queryString.split("&");
		var i;	
		for (i = 0; i < a.length; i++) {
			var temp = a[i].split("=");
			if (temp[0] === "v") {
				return temp[1];
			}
		}
		return "";
	}

	// After have ID of the video, we will get the list of available subtitle.
	// We do this by get XML data from a particular URL with the ID of the video.
	function getSubtitleList(videoId) {
		//var url = "https://video.google.com/timedtext?type=list&v=" + videoId;
		var url = "https://www.youtube.com/api/timedtext" +
					"?type=list" +
					"&v=" + videoId;
		updateAjax(url, buildSubtitleList);
	}
	
	// Build a select box to choose subtitle language
	// The XML looks like this:
	// <transcript_list docid="6824816026201807091">
	//   <track id="2" name="French (fr)" lang_code="fr" lang_original="Français" lang_translated="French"/>
	//   <track id="0" name="German (de)" lang_code="de" lang_original="Deutsch" lang_translated="German"/>
	//   <track id="3" name="Italian (it)" lang_code="it" lang_original="Italiano" lang_translated="Italian"/>
	//   <track id="4" name="Japanese" lang_code="ja" lang_original="日本語" lang_translated="Japanese"/>
	//   <track id="1" name="Spanish (es)" lang_code="es" lang_original="Español" lang_translated="Spanish"/>
	// </transcript_list>
	//
	// TODO: Is there some way that we can determine a video has subtitle or not?
	// For example, a video doesn't have subtitle will not have the CC button too.  
	function buildSubtitleList(xml) {
		var languages = null;
		if (xml) {
			languages = parseLanguageXml(xml);
		}
		if (languages != null && languages.length > 0) {
			gui.buildGui(languages);
		} else {
			gui.notifyNotFound();
		}
	}

	// Get the URL of an subtitle file
	// This is often changed
	// https://video.google.com/timedtext?type=track&v=XraeBDMm2PM&name=Spanish (es)&lang=es
	// langName is required
	function getCaptionFileURL(videoId, langCode, langName) {
		// A line contains only "return" will be very dangerous!
		//"https://video.google.com/timedtext?type=track"
		return "https://www.youtube.com/api/timedtext" +
				"?type=track" +
				"&v=" + videoId +
				"&lang=" + langCode +
				"&name=" + unescapeHTML(langName);
	}

	// Download the caption file
	function downloadCaptionFile(langCode, langName) {
		//console.info(videoId + ", " + langCode + ", " + langName);
		var url = getCaptionFileURL(videoId, langCode, langName);
		//console.info(url);
		updateAjax(url, function(xml) {
			var content = converter.convertFromTimedToSrtFormat(xml);
			var fileName = document.title.replace(/ - YouTube/gi, "") + "." + langCode + ".srt";
			saveTextAsFile(content, fileName);
		});
	}
	
	// Parse the XML of the language list to an array
	function parseLanguageXml(xml) {
		var languages = [];
		var myRe = /<track [^<]*name="([^<]*)" [^<]*lang_code="([^"]+)" [^<]*lang_translated="([^"]+)"/g;
		var myArray;
		while ((myArray = myRe.exec(xml)) != null) {
			languages.push({
				langName: myArray[1],
				langCode: myArray[2],
				displayName: myArray[3]
			});
		}
		return languages;
	}

	return {
		init: init,
		downloadCaptionFile: downloadCaptionFile
	};
})();
