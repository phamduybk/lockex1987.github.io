/////////////////////////////////////////////////////////////////////
//                                                                 //
//                   THE CONTENT OF YOUR MENU                      //
//                                                                 // 
///////////////////CHANGE ANYTHING YOU WANT HERE/////////////////////
//change your title here
var texttitle = ['Yahoo' ,'Search' ,'Mail' ,'Forum' ];

//change the height of each submenu here: linenumber*15+5(space) 
var menutoggle = ['35' ,'35' ,'35' ,'35' ];

//change the menu number of each submenu here
var menunb = ['2' ,'2' ,'2' ,'2' ];

//change your textmenu here
var textmenu = [
//the menutext for each submenu here
['Yahoo!Mail' ,'Yahoo!Messenger' ],
['Google' ,'Altavista' ],
['HopThu' ,'EasyVN' ],
['Le Hoan Forum' ,'Echip Forum' ],
];

//change link of your textmenu here
var linkmenu = [
//the link for each menutext here
['http://mai.yahoo.com' ,'http://messenger.yahoo.com' ],
['http://www.google.com.vn' ,'http://www.altavista.com' ],
['http://www.hopthu.com' ,'http://www.easyvn.com' ],
['http://www.ktlehoan.com/forum' ,'http://diendan.vietnamnet.vn/echip' ],
];

//change target of your link here: _self = same window , _blank = new window 
var targetmenu = [
//the target for each link
['_blank' ,'_blank' ],
['_blank' ,'_self' ],
['_self' ,'_blank' ],
['_self' ,'_self' ],
];
////////////////////////D'ONT CHANGE HERE////////////////////////////
function drawmenu() {
var imgline = '<img src='+lineimg+' border=0>'
document.writeln('<div class=menu>');
for (i=0; i<nom; i++) {
//title
document.writeln('<div class=title id=title'+i+' style=\"top: '+i*20+'px\">');
document.writeln('<a href="" onclick=\"javascript: toggle('+(i)+','+menutoggle[i]+'); return false\">');
document.writeln('<img name=pic'+i+' src='+closeimg+' border=0> ');
document.writeln(texttitle[i]);
document.writeln('</a></div>');

//submenu
document.writeln('<div class=submenu id=submenu'+i+' style=\"top: '+(i+1)*20+'px\">');
for (j=0; j<menunb[i]; j++) {
document.writeln('<a href='+linkmenu[i][j]+' target='+targetmenu[i][j]+'>'+imgline+textmenu[i][j]+'</a><br>');
}
document.writeln('</div>');
}
document.writeln('</div>');
}