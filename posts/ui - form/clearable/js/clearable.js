/**
Clearable
Data chooser, date picker,...
How to clear hidden ID field?
 */
$(document)
	.on("input", ".clearable", function() {
		var inputNode = this;
		checkClearable(inputNode);
	})
	.on("click", ".x", function() {
		var clearNode = this;
		clearNode.style.display = "none";
		
		var inputNode = clearNode.previousSibling;
		inputNode.value = "";
		//TODO: Trigger change event for inputNode
	});

function checkClearable(inputNode) {
	var ns = inputNode.nextSibling;

	if (inputNode.value) {
		if (ns && ns.className == "x") {
			ns.style.display = "";
		} else if (!ns || ns.className != "x") {
			insertClearNode(inputNode)	
		}
	} else {
		if (ns && ns.className == "x") {
			ns.style.display = "none";
		}
	}
}

function insertClearNode(inputNode) {
	var clearNode = document.createElement("span");
	clearNode.innerHTML = "&times;";
	clearNode.className = "x";
	clearNode.title = "Click to clear";
	inputNode.parentNode.insertBefore(clearNode, inputNode.nextSibling);
}
	
function checkAllClearables() {
	var a = document.querySelectorAll(".clearable");
	if (a) {
		for (var i = 0; i < a.length; i++) {
			inputNode = a[i];
			checkClearable(inputNode);
		}
	}
}

checkAllClearables();
