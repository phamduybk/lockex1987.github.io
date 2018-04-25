// https://www.familyecho.com/#view:START

var PedigreePosition = (function () {

    var leafy = 0;

    var nodeHeight = 40;
    var nodeMarginBottom = 20;
    var familyMarginBottom = 50;

    var onClickFunction;

    function traverse(curNode, rawData, level) {
        curNode.level = level;
        
        var spouse = DataService.getPersonWithCode(curNode.spouse);
        if (spouse) {
            spouse.level = curNode.level;
        }

        var children = DataService.getChildren(curNode, spouse);
        if (children.length > 0) {
					isLeaf = false;
					
					for (var i = 0; i < children.length; i++) {
						var e = children[i];
						traverse(e, rawData, level + 1);
					}
					
					processBranchNode(curNode, spouse, rawData, children);
        } else {
					processLeafNode(curNode, spouse, rawData);
				}
    }

    function processLeafNode(curNode, spouse, rawData) {
        curNode.y = leafy;
        leafy += nodeHeight + nodeMarginBottom;
        if (spouse) {
            leafy += nodeHeight + nodeMarginBottom;
        }

        if (!spouse) {
            curNode.actualY = curNode.y + nodeHeight / 2;
        } else if (spouse.gender == "female") {
            curNode.actualY = curNode.y + nodeHeight / 2;
        } else {
            curNode.actualY = curNode.y + nodeHeight / 2 + nodeHeight + nodeMarginBottom;
        }
    }

    function processBranchNode(curNode, spouse, rawData, children) {
        var min = Number.MAX_VALUE;
        var max = 0;
        for (var i = 0; i < children.length; i++) {
            var e = children[i];            
						if (e.y < min) {
								min = e.actualY;
						}
						if (e.y > max) {
								max = e.actualY;
						}
        }

        var mid = (min + max) / 2;

        if (!spouse) {
            curNode.y = mid - nodeHeight / 2;
            curNode.actualY = mid;
        } else if (spouse.gender == "female") {
            curNode.y = mid - nodeHeight - nodeMarginBottom / 2;
            curNode.actualY = mid - nodeHeight / 2 - nodeMarginBottom / 2;
        } else {
            curNode.y = mid - nodeHeight - nodeMarginBottom / 2;
            curNode.actualY = mid + nodeHeight / 2 + nodeMarginBottom / 2;
        }
    }

    function buildGeneration(pedigreeChart, rawData, level) {
        var generation = document.createElement("DIV");
        generation.className = "generation";
        buildSiblings(generation, rawData, level);
        pedigreeChart.appendChild(generation);
    }

    function buildSiblings(generation, rawData, level) {
        var curParent;
        var siblingsNode;

        var tempSiblings = [];

        for (var i = 0; i < rawData.length; i++) {
            var curNode = rawData[i];
            if (curNode.level == level && (curNode.isRoot || curNode.parent)) {
                if (!curNode.parent || curNode.parent != curParent) {
                    // Tao 1 the moi
                    siblingsNode = document.createElement("DIV");
                    siblingsNode.className = "siblings";
                    generation.appendChild(siblingsNode);

                    buildSiblingsConnector(siblingsNode, tempSiblings);

                    curParent = curNode.parent;

                    tempSiblings = [];
                }

                buildCouple(siblingsNode, curNode, rawData);
                tempSiblings.push(curNode);
            }
        }

        buildSiblingsConnector(siblingsNode, tempSiblings);
    }

    function buildSiblingsConnector(siblingsNode, tempSiblings) {
        if (tempSiblings.length > 0) {
            var firstObj = tempSiblings[0];
            var lastObj = tempSiblings[tempSiblings.length - 1];
            var firstY = firstObj.actualY;
            var lastY = lastObj.actualY;

            if (firstObj.parent) {
                var toParentConnector = document.createElement("DIV");
                toParentConnector.className = "toParentConnector";
                toParentConnector.style.top = (firstY + (lastY - firstY) / 2) + "px";
                siblingsNode.appendChild(toParentConnector);
            }

            if (tempSiblings.length > 1) {
                var siblingsConnector = document.createElement("DIV");
                siblingsConnector.className = "siblingsConnector";
                siblingsConnector.style.top = firstY + "px";
                siblingsConnector.style.height = (lastY - firstY) + "px";
                siblingsNode.appendChild(siblingsConnector);
            }
        }
    }

    function buildCouple(siblingsNode, curNode, rawData) {
        var coupleNode = document.createElement("DIV");
        coupleNode.className = "couple";
        siblingsNode.appendChild(coupleNode);

        coupleNode.style.top = curNode.y + "px";

        var spouse = DataService.getPersonWithCode(curNode.spouse);

        if (!spouse) {
            buildPerson(coupleNode, curNode);
        } else if (spouse.gender == "female") {
            buildPerson(coupleNode, curNode);
            buildPerson(coupleNode, spouse);
            buildCoupleConnector(coupleNode);
        } else {
            buildPerson(coupleNode, spouse);
            buildPerson(coupleNode, curNode);
            buildCoupleConnector(coupleNode);
        }
    }

    function buildPerson(coupleNode, personObj) {
        var personWrapper = document.createElement("DIV");
        personWrapper.className = "personWrapper";
        coupleNode.appendChild(personWrapper);

        var person = document.createElement("DIV");
        person.className = "person";
        person.textContent = personObj.lastName;
        person.dataset.personCode = personObj.code;
        person.addEventListener("click", onClickFunction);
        personWrapper.appendChild(person);

        if (!personObj.isRoot && personObj.parent) {
            var isDirect = document.createElement("DIV");
            isDirect.className = "isDirect";
            personWrapper.appendChild(isDirect);
        }
    }

    function buildCoupleConnector(coupleNode) {
        var coupleConnector = document.createElement("DIV");
        coupleConnector.className = "coupleConnector";
        coupleNode.appendChild(coupleConnector);
    }

    /**
     * Ve bieu do gia pha.
     * @param pedigreeChart
     *     Doi tuong DOM dat bieu do
     * @param onClickFunctionFromUser
     *     Ham se thuc hien khi click vao tung not tren bieu do
     */
    function buildPedigreeChart(pedigreeChart, onClickFunctionFromUser) {
        // Truyen tham so vao bien global
        onClickFunction = onClickFunctionFromUser;

        // Mang JSON du lieu
        var rawData = DataService.getRawData();

        // Lay ra phan tu goc
        var root = DataService.getRoot();

        // Duyet cay
        traverse(root, rawData, 0);

        // Lay ra so cap cua cay
        var noLevel = DataService.getNumberOfLevel();
        
        // Duyet cac cap cua cay
        for (var level = 0; level < noLevel; level++) {
            buildGeneration(pedigreeChart, rawData, level);
        }

        // Cap nhat lai chieu dai cua bieu do
        pedigreeChart.style.height = (leafy + 0) + "px";
    }

    return {
        buildPedigreeChart: buildPedigreeChart
    };
})();
