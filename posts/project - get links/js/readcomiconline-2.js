// https://readcomiconline.to/Comic/Justice-Society-of-America





//fetchIssue('https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-54?id=11830', '54.json');

var issues = [];

document.querySelectorAll('.listing a').forEach((aTag, idx, arr) => {
	var title = aTag.textContent;
	var issueLink = aTag.href;
	
	title = title.replace(/\s+/g, ' ').trim();
	var jsonLink = '';
	var group = /Issue #(\d+)/gi.exec(title);
	if (group) {
		jsonLink = group[1] + '.json';
	} else {
		group = /Annual (\d+)/gi.exec(title);
		if (group) {
			jsonLink = 'a' + group[1] + '.json';
		}	
	}
	
	//console.log(issueLink);
	//console.log(title);
	console.log(jsonLink);
	//console.log(idx, arr.length);
	
	//fetchIssue(issueLink, jsonLink);
	
	// Thêm vào đầu
	issues.unshift({
		title,
		jsonLink,
		issueLink
	});
});

saveTextAsFile(JSON.stringify(issues, null, 2), 'list.json');
//console.log();



// --------------------------------------------------------------------------------------------------------------------
var issues = [
  {
    "title": "Justice Society of America (2007) Issue #43",
    "jsonLink": "43.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-43?id=11788"
  },
  {
    "title": "Justice Society of America (2007) Issue #44",
    "jsonLink": "44.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-44?id=11793"
  },
  {
    "title": "Justice Society of America (2007) Issue #45",
    "jsonLink": "45.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-45?id=11797"
  },
  {
    "title": "Justice Society of America (2007) Issue #46",
    "jsonLink": "46.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-46?id=11801"
  },
  {
    "title": "Justice Society of America (2007) Issue #47",
    "jsonLink": "47.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-47?id=11804"
  },
  {
    "title": "Justice Society of America (2007) Issue #48",
    "jsonLink": "48.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-48?id=11808"
  },
  {
    "title": "Justice Society of America (2007) Issue #49",
    "jsonLink": "49.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-49?id=11811"
  },
  {
    "title": "Justice Society of America (2007) Issue #50",
    "jsonLink": "50.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-50?id=11818"
  },
  {
    "title": "Justice Society of America (2007) Issue #51",
    "jsonLink": "51.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-51?id=11821"
  },
  {
    "title": "Justice Society of America (2007) Issue #52",
    "jsonLink": "52.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-52?id=11824"
  },
  {
    "title": "Justice Society of America (2007) Issue #53",
    "jsonLink": "53.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-53?id=11827"
  },
  {
    "title": "Justice Society of America (2007) Issue #54",
    "jsonLink": "54.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Issue-54?id=11830"
  },
  {
    "title": "Justice Society of America (2007) Annual 1",
    "jsonLink": "a1.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Annual-1?id=11844"
  },
  {
    "title": "Justice Society of America (2007) Annual 2",
    "jsonLink": "a2.json",
    "issueLink": "https://readcomiconline.to/Comic/Justice-Society-of-America/Annual-2?id=11846"
  }
];

var currentIndex = 0;

function fetchIssue(issueLink, jsonLink) {
	fetch(issueLink)
	    .then(response => response.text())
	    .then(htmlCode => {
			//console.log(htmlCode);
			var images = [];
			var regex = /lstImages\.push\("(.+?)"\)/g;
			var group;
			while ((group = regex.exec(htmlCode)) !== null) {
				var imageLink = group[1];
				//console.log(imageLink);
				images.push(imageLink);
			}
			
            if (images.length == 0) {
                console.log('Stop', jsonLink);
            } else {
                var text = JSON.stringify(images, null, 2);
			    //console.log(text);
			    saveTextAsFile(text, jsonLink);
			    console.log('Save', jsonLink);
			
			    // Chờ 20 giây rồi mới crawl tập mới, nếu không sẽ bị tưởng là robot và chặn
			    currentIndex++;
                if (currentIndex < issues.length) {
			        setTimeout(function() {
				        crawl();
			        }, 20 * 1000);
                }
            }
		});
		
}

function crawl() {
	fetchIssue(issues[currentIndex].issueLink, issues[currentIndex].jsonLink);
}



crawl();



