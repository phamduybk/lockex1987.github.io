// Scale de zoom
//document.addEventListener("DOMContentLoaded", function() {


DataService.setRawData(rawData);

function clickPersonOnChart(evt) {
	evt.preventDefault();
	evt.stopPropagation();

	var personCode = this.dataset.personCode;
	viewPersonByCode(personCode);

	detailInfo.style.display = "";

	return false;
}

function viewPersonByCode(personCode) {
	
	var personObj = DataService.getPersonWithCode(personCode);
	
	viewPerson(personObj);
}

function viewPerson(personObj) {
	document.querySelector("#personName").textContent = personObj.fullName;
	document.querySelector("#gender").src = "images/" + personObj.gender + ".png";
	document.querySelector("#yearOfBirth").textContent = personObj.dob || "N/A";
	//document.querySelector("#isLiving").textContent = "YES";
	document.querySelector("#level").textContent = personObj.level;
	document.querySelector("#job").innerHTML = personObj.job || "&nbsp;";
	document.querySelector("#photo").src = personObj.avatar ? "avatar/" + personObj.avatar : "images/default.png";

	var fatherDiv = document.querySelector("#father");
	var motherDiv = document.querySelector("#mother");
	if (!personObj.parent) {
		fatherDiv.textContent = personObj.fatherName || "";
		motherDiv.textContent = personObj.motherName || "";
	} else {
		var parent = DataService.getPersonWithCode(personObj.parent, rawData);
		if (!parent) {
			fatherDiv.textContent = "";
			motherDiv.textContent = "";
		} else {
			var spouseOfParent = DataService.getSpouse(parent, rawData);

			var father;
			var mother;
			if (parent.gender == "male") {
				father = parent;
				mother = spouseOfParent;
			} else {
				father = spouseOfParent;
				mother = parent;
			}

			fatherDiv.innerHTML = "";
			motherDiv.innerHTML = "";

			createViewLink(father, fatherDiv);
			createViewLink(mother, motherDiv);
		}
		
	}

	var spouse = DataService.getSpouse(personObj);
	var spouseDiv = document.querySelector("#spouse");
	if (spouse) {
		spouseDiv.innerHTML = "";
		createViewLink(spouse, spouseDiv);
	} else {
		spouseDiv.textContent = "N/A";
	}

	var children = DataService.getChildren(personObj, spouse);
	buildChildren(children);
}

function createViewLink(personObj, div) {
	var link = document.createElement("A");
	link.href = "";
	link.dataset.personCode = personObj.code;
	link.addEventListener("click", clickPersonOnChart);
	link.textContent = personObj.lastName;

	//div.innerHTML = "";
	div.appendChild(link);
}

function buildChildren(children) {
	var childrenTag = document.querySelector("#children");
	if (children.length == 0) {
		childrenTag.textContent = "N/A";
	} else {
		childrenTag.innerHTML = "";
		for (var i = 0; i < children.length; i++) {
			if (i > 0) {
				childrenTag.appendChild(document.createTextNode(", "));
			}
			createViewLink(children[i], childrenTag);
		}
	}
}

var version = 2;
if (version == 1) {
	PedigreePosition.buildPedigreeChart(document.querySelector("#pedigreeChart1"), clickPersonOnChart);
	document.querySelector("#pedigreeChart2").style.display = "none";
} else {
	PedigreeCss.buildPedigreeChart(document.querySelector("#pedigreeChart2"), clickPersonOnChart);
	document.querySelector("#pedigreeChart1").style.display = "none";
}

var detailInfo = document.querySelector("#detailInfo");

window.addEventListener("click", function() {
	detailInfo.style.display = "none";
});

detailInfo.addEventListener("click", function(evt) {
	evt.stopPropagation();
});

detailInfo.style.display = "none";
