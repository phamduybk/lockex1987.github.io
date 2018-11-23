var PedigreeCss = (function() {

    function traverse(curNode, ul) {
        var li = document.createElement("LI");
        ul.appendChild(li);

        var div = document.createElement("DIV");
        li.appendChild(div);

        createLink(curNode, div);

        var spouse = DataService.getSpouse(curNode);
        if (spouse) {
            createLink(spouse, div);
        }

        var children = DataService.getChildren(curNode, spouse);
        if (children.length > 0) {
            var innerUl = document.createElement("UL");
            li.appendChild(innerUl);

            for (var i = 0; i < children.length; i++) {
                var e = children[i];
                traverse(e, innerUl);
            }
        }
    }

    function createLink(personObj, div) {
        var link = document.createElement("A");
        link.textContent = personObj.lastName;
        div.appendChild(link);
    }

    /**
     * Ve bieu do gia pha.
     * @param pedigreeChart
     *     Doi tuong DOM dat bieu do
     */
    function buildPedigreeChart(pedigreeChart) {
        // Lay ra phan tu goc
        var root = DataService.getRoot();

        // Duyet cay
        traverse(root, pedigreeChart);
    }

    return {
        buildPedigreeChart
    };
})();
