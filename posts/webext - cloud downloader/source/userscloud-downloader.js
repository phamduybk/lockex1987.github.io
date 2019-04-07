// If the page contains a download form, start download automatically
console.info("Usercloud downloader");

var frm = document.getElementsByName("F1");
if (frm && frm.length > 0) {
    frm[0].submit();
}

var btnSuccess = document.querySelector(".btn-success");
if (btnSuccess) {
    btnSuccess.click();
}
