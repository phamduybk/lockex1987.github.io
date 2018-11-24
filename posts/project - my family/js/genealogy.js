function clickPersonOnChart(evt) {
	evt.preventDefault();
	evt.stopPropagation();

	var personCode = this.dataset.personCode;
	viewPersonByCode(personCode);

	detailInfo.style.display = "";

	return false;
}

function viewPersonByCode(personCode) {
	
	var personObj = personMap[personCode];
	
	viewPerson(personObj);
}

// TODO: Chuyển về code Angular JS (hay là view?)
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
	if (!personObj.father) {
		if (personObj.moreInfo) {
			fatherDiv.textContent = personObj.moreInfo.fatherName || "";
			motherDiv.textContent = personObj.moreInfo.motherName || "";
		} else {
			fatherDiv.textContent = "";
			motherDiv.textContent = "";
		}
	} else {
		fatherDiv.innerHTML = "";
		motherDiv.innerHTML = "";

		createViewLink(personObj.father, fatherDiv);
		createViewLink(personObj.mother, motherDiv);
	}

	var spouse = personObj.spouse;
	var spouseDiv = document.querySelector("#spouse");
	if (spouse) {
		spouseDiv.innerHTML = "";
		createViewLink(spouse, spouseDiv);
	} else {
		spouseDiv.textContent = "N/A";
	}

	var children = personObj.directChildren;
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



var detailInfo = document.querySelector('#detailInfo');

window.addEventListener("click", function() {
	//detailInfo.style.display = 'none';
});

detailInfo.addEventListener("click", function(evt) {
	evt.stopPropagation();
});

var dTreeData = [personMap['ONGNGOAI']];

var options = {
    target: '#graph',
    debug: false,
    width: 1600,
    height: 600,
    callbacks: {
        nodeClick: function(name, extra) {
            //console.log(name, extra);

            //evt.preventDefault();
	        //evt.stopPropagation();

            var personCode = extra.code;
	        viewPersonByCode(personCode);

	        detailInfo.style.display = "";
        },
        /*
        textRenderer: function(name, extra, textClass) {
            if (extra && extra.nickname) {
                name = name + " (" + extra.nickname + ")";
            }
            return "<p align='center' class='" + textClass + "'>" + name + "</p>";
        }
        */
    },
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    nodeWidth: 100,
    styles: {
        node: 'node',
        linage: 'linage',
        marriage: 'marriage',
        text: 'nodeText'
    }
};

dTree.init(dTreeData, options);


var app = angular.module('treeDemo', []);
app.controller('TreeFormController', function($scope) {

    $scope.people = people.map(p => p.code);
    $scope.you = $scope.people[0];
    $scope.relative = $scope.people[1];
    $scope.linkType = '';

    $scope.changed = function() {
        console.log($scope.you, $scope.relative);
        $scope.linkType = calculateRelation($scope.you, $scope.relative);
    };

    $scope.swap = function() {
        var temp = $scope.you;
        $scope.you = $scope.relative;
        $scope.relative = temp;
        $scope.changed();
    };

    $scope.changed();
});
