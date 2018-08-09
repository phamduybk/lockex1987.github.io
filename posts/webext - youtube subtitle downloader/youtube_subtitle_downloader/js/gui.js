// gui.js
// Create a download link under the header.
//----------------------------------------------------------------------------------------
var gui = (function() {
	
	const CONTAINER_ID = "caption-download";

	// La giao dien cu
	var classicGui;

	// Vi tri them
	var insertPosition;

	// Add to the begining of the action toolbar
	function buildGui(languages) {
		removeIfAlreadyExists();

		//console.info("Building GUI");
		var container = createOutterContainer("Subtitle: ");
		for (var i = 0; i < languages.length; i++) {
			var a = createDownloadLink(languages[i].langCode, languages[i].langName, languages[i].displayName);
			container.appendChild(a);
		}
		
		addToCurrentPage(container);
	}

	// Vi tri them link
	function getInsertPosition() {
		// Try Old Youtube GUI first
		var insertPosition = document.querySelector("#watch7-user-header");
		if (insertPosition != null) {
			classicGui = true;
		} else {
			classicGui = false;

			// Try New Youtube GUI
			insertPosition = document.querySelector("#meta"); // "#main #meta"
		}
		return insertPosition;
	}
	
	// Add the GUI to the current page
	function addToCurrentPage(container) {
		insertPosition.parentNode.insertBefore(container,
				classicGui ? insertPosition.nextSibling : insertPosition);
	}

	// Only "view video" page can contain subtitle links.
	// We should only handle "view video" page, not "search" page, "setting" page,...
	function canInsert() {
		// Cap nhat bien insertPosition la thuoc tinh trong lop
		insertPosition = getInsertPosition();
		return insertPosition != null;
	}

	// Create the outter container
	function createOutterContainer(text) {
		var container = document.createElement("div");
		container.setAttribute("id", CONTAINER_ID);
		container.style.padding = "10px 5px";
		container.style.marginBottom = "10px";
		// New YouTube GUI
		container.style.color = "blue";
		container.style.fontSize = "15px";

		container.textContent = text;

		return container;
	}

	// Create link
	function createDownloadLink(langCode, langName, displayName) {
		var a = document.createElement("button");
		a.textContent = displayName;
		a.href = "";
		a.title = "Please click to download";
		a.style.marginRight = "5px";
		a.style.cursor = "pointer";
		a.style.color = "red";
		a.style.textDecoration = "underline";
		a.style.background = "transparent";
		a.style.border = "none";
		a.style.fontSize = "15px";

		a.onclick = function() {
			ysd.downloadCaptionFile(langCode, langName);
			return false;
		};
		return a;
	}
	
	// Check if the container already exists (show we don't have to process again)
	function removeIfAlreadyExists() {
		var container = document.getElementById(CONTAINER_ID);
		if (container != null) {
			container.parentNode.removeChild(container);
		}
	}

	function exists() {
		var container = document.getElementById(CONTAINER_ID);
		return (container != null);
	}
	
	// Notify that there is no subtitle
	function notifyNotFound() {
		removeIfAlreadyExists();

		var container = createOutterContainer("No Subtitle");

		addToCurrentPage(container);
	}

	function isClassicGui() {
		return classicGui;
	}
	
	return {
		buildGui: buildGui,
		notifyNotFound: notifyNotFound,
		canInsert: canInsert,
		isClassicGui: isClassicGui,
		exists: exists
	}
})();
