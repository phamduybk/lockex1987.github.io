
function bm(){
var arrElem = document.getElementsByTagName("h1")
//alert(arrElem[0].innerHTML)
var title = arrElem[0].innerHTML
var url = document.location
parent.toppie.dum.location.href = "../../~hans-kuipers2/ie-style/bm.htm"  
if (document.all)window.external.AddFavorite(url, title);
else if (window.sidebar)window.sidebar.addPanel(title, url, "");
}
//mystats(1,19352,'designsoft','2',''); 
//	 google_page_url = document.location;

if ( ( top.document.referrer.length == 0 )  &&  ( top.toppie.document.getElementById('hidDirect').value == 0 )  ){
    var sc_project=3160804; 
    var sc_invisible=1; 
    var sc_partition=1; 
    var sc_security="4897fca3"; 
    
		document.write('<div style="position:absolute;top:-100px;">')
    document.write('<script type="text/javascript" src="http://www.statcounter.com/counter/counter_xhtml.js"></script>')
		document.write('</div>')
		top.toppie.document.getElementById('hidDirect').value = 1
}

document.write('<br><iframe style="height:28px;margin:0;margin-top:10px;padding:0;overflow:hidden;background-color:#ffffff;width:80%;" name="dum"  frameborder="0" src="../../~hans-kuipers2/ie-style/bot.htm"> </iframe><br><br>')





