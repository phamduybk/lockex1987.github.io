document.write('<iframe style="position:absolute;top:58px;left:0%;width:100%;height:0px;"  name="dum"   frameborder="0" src="../~hans-kuipers2/ie-style/dum.htm"> </iframe>')
document.write('<iframe style="position:absolute;top:68px;left:0%;width:100%;height:0px;"  name="dum2"  frameborder="0" src="../~hans-kuipers2/ie-style/dum.htm"> </iframe>')
//document.write('<iframe style="position:absolute;top:81px;left:10%;width:90%;height:32px;"  frameborder="0" src="../~hans-kuipers3/site-optimization.htm"> </iframe>')
function bm(){
var title = "Free WebDesign Examples"
var url = "http://www.designsoft.nl"
window.dum.location.href = "../~hans-kuipers2/ie-style/bm-top.htm"  
if (document.all)window.external.AddFavorite(url, title);
else if (window.sidebar)window.sidebar.addPanel(title, url, "");
}
document.write('<div style="position:absolute;top:0px;left:0px;width:20%;height:84px;background-color:transparent;">')
document.write('<input style="position:absolute;top:1px;width:120px;right:15px;color:#cc0000;margin:0;font:normal 12px arial;" type="button" value="Bookmark !" onClick="javascript:bm();">')
//document.write('<iframe style="position:absolute;bottom:4px;width:120px;right:15px;height:20px;padding:0;" frameborder="0" src="../~hans-kuipers/find.htm"></iframe> ')
document.write('</div>')

