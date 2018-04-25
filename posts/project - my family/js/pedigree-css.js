var PedigreeCss = (function () {

    var onClickFunction;

    function traverse(curNode, level, ul) {
        curNode.level = level;

        var li = document.createElement("LI");
        ul.appendChild(li);

        var div = document.createElement("DIV");
        li.appendChild(div);

        createLink(curNode, div);

        var spouse = DataService.getSpouse(curNode);
        if (spouse) {
            spouse.level = curNode.level;

            createLink(spouse, div);
        }

        var children = DataService.getChildren(curNode, spouse);
        if (children.length > 0) {
            var innerUl = document.createElement("UL");
            li.appendChild(innerUl);

            for (var i = 0; i < children.length; i++) {
                var e = children[i];
                traverse(e, level + 1, innerUl);
            }
        }
    }

    function createLink(personObj, div) {
        var link = document.createElement("A");
        link.href = "";
        link.textContent = personObj.lastName;
        link.dataset.personCode = personObj.code;
        link.addEventListener("click", onClickFunction);
        div.appendChild(link);
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

        // Lay ra phan tu goc
        var root = DataService.getRoot();

        // Duyet cay
        traverse(root, 0, pedigreeChart);
    }

    return {
        buildPedigreeChart: buildPedigreeChart
    };
})();
