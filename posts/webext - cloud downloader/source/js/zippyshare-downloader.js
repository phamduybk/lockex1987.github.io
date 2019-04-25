console.info("Zippyshare downloader");

function checkDownloadButton() {
    //console.log('Check download button href');
    var dlbutton = document.getElementById('dlbutton');

    if (dlbutton != null && dlbutton.href) {
        window.location = dlbutton.href;
    } else {
        setTimeout(checkDownloadButton, 1000);
    }
}

checkDownloadButton();