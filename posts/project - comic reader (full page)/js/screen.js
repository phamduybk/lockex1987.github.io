var Screen = (function() {

    function showList() {
        document.querySelector('#listScreen').style.display = 'block';
        document.querySelector('#viewerScreen').style.display = 'none';
    }

    function showViewer() {
        document.querySelector('#listScreen').style.display = 'none';
        document.querySelector('#viewerScreen').style.display = 'block';
    }

    return {
        showList,
        showViewer
    };
})();