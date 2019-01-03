//function vs(page) {window.location = "view-source:" + page}
loc = location.href
//var ar = loc.getElementsByTagName("title").text = "www.designsoft.nl"
//var ar = loc.document.getElementsByTagName("title")
//alert(ar[0].text)

var ref = document.referrer
if (self.name != "rechts") {
    document.write('<frameset border="0" cols="0px,22%,*,0px,0px,0px">')
    document.write('<frame  src="../../~hans-kuipers/bottom.htm" name="bot" noresize  scrolling="auto">')
    document.write('<frame  src="../../~hans-kuipers/subject.htm" name="links" noresize  scrolling="auto">')
//    document.write('<frameset border="0" rows="71px,*">')
    document.write('<frameset border="0" rows="0px,*">')
    document.write('<frame  src="../../~hans-kuipers3/toppie.htm" name="toppie">')
    document.write('<frame  src="../../~hans-kuipers/tmp4.htm" noresize name="rechts">')
    document.write('</frameset>')
    document.write('<frame  src="../../~hans-kuipers/bottompage.htm" name="ga" scrolling="auto"  >')
    document.write('<frame  src="../../~hans-kuipers/other.htm" scrolling="auto"  >')
    document.write('<frame  src="../../~hans-kuipers/other2.htm" scrolling="auto"  >')
    document.write('</frameset>')
		rechts.location.href = loc
}

//var ar = parent.rechts.document.getElementsByTagName("title")
//alert(ar[0].text)
//parent.rechts.document.getElementsByTagName("title").InnerText = "Designsoft.nl"



