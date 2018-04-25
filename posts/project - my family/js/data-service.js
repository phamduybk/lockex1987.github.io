// Them cac thong tin JSON khac de hien thi cho nhieu
var DataService = (function() {

	var rawData;

	function setRawData(rd) {
		rawData = rd;
	}

	function getRawData() {
		return rawData;
	}

	function getSpouse(curNode) {
		for (var i = 0; i < rawData.length; i++) {
			var e = rawData[i];
			if (e.code == curNode.spouse || e.spouse == curNode.code) {
				return e;
			}
		}
		return null;
	}

	function getPersonWithCode(personCode) {
		if (!personCode) {
			return null;
		}
		for (var i = 0; i < rawData.length; i++) {
			var e = rawData[i];
			if (e.code == personCode) {
				return e;
			}
		}
		return null;
	}

	function getChildren(curNode, spouse) {
		var children = [];
		for (var i = 0; i < rawData.length; i++) {
			var e = rawData[i];
			if (e.parent) {
				if (e.parent == curNode.code || (spouse && e.parent == spouse.code)) {
					children.push(e);
				}
			}
		}
		return children;
	}

	function getDirectChildren(curNode) {
		var children = [];
		for (var i = 0; i < rawData.length; i++) {
			var e = rawData[i];
			if (e.parent == curNode.code) {
				children.push(e);
			}
		}
		return children;
	}

	function getRoot() {
		var root = rawData[0];
		root.isRoot = true;
		return root;
	}

	function getNumberOfLevel() {
		var noLevel = 1;
		for (var i = 0; i < rawData.length; i++) {
			var e = rawData[i];
			if (e.level + 1 > noLevel) {
				noLevel = e.level + 1;
			}
		}
		return noLevel;
	}

	return {
		setRawData: setRawData,
		getRawData: getRawData,
		getPersonWithCode: getPersonWithCode,
		getSpouse: getSpouse,
		getChildren: getChildren,
		//getDirectChildren: getDirectChildren,
		getRoot: getRoot,
		getNumberOfLevel: getNumberOfLevel
	}
})();
