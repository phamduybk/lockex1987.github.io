varff = '<LINK REL="stylesheet" TYPE="text/css" HREF="../../~hans-kuipers2/ie-style/algemeen-ff.css" TITLE="style">'
if (!document.all) { document.write(varff) }
function setFS() {
  if (screen.width) {
    if (screen.width<600) {_baseSize = .5;}
    if ((screen.width>=600)&&(screen.width<800)) {_baseSize = .6;}
    if ((screen.width>=800)&&(screen.width<=1000)) {_baseSize = .8;}
    if ((screen.width>=1000)&&(screen.width<=1100)) {_baseSize = 1;}
    if ((screen.width>=1100)&&(screen.width<=1300)) {_baseSize = 1.3;}
    if ((screen.width>=1300)&&(screen.width<=1500)) {_baseSize = 1.5;}
    if (screen.width>=1500) {_baseSize = 1.8;}
    document.getElementsByTagName("body")[0].style.fontSize=_baseSize+'em';
  }
}
document.write('<meta name="keywords" content="SEO, Search engine opimiztion, Hosting, Web Hosting, HTML, CSS, Javascript, DHTML, Internet, Explorer, Fiefox" />')

