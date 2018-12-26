function loadSvg(svgUrl, containerId) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //console.log(this.responseText);
          document.getElementById(containerId).innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", svgUrl, true);
      xhttp.send();
    }

    loadSvg('images/kiwi.svg', 'demo');
	loadSvg('images/vn-all.svg', 'map');
	
	var tooltip = document.querySelector('.tooltip');
	document.querySelector('#map').addEventListener('mousemove', function(e) {
		if (e.target.tagName.toLowerCase() == 'path') {
			tooltip.style.display = 'block';
			tooltip.style.left = (e.pageX - 50) + 'px';
			tooltip.style.top = (e.pageY - 60) + 'px';
			tooltip.textContent = e.target.querySelector('hc-key').textContent;
		} else {
			tooltip.style.display = 'none';
		}
	});