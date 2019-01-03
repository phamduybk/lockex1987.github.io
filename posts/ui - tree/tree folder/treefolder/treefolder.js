/////////////////////////////////////////////////////////////////////
//                                                                 //
//                   THE SCRIPT GOES HERE                          //
//                                                                 // 
////////////////YOU CAN CHANGE THESE SETTINGS////////////////////////
//nom is the number of menus on your tree, change this if your want more menus
var nom = 4; // Number of menus
var usePictures = 1; // use pictures?  1 = yes, 0 = no
var hidefolder = 1; // hide previous folder when you click on another folder?  1 = yes, 0 = no
var ttls = new Array(); // An array for the title objects
var subs = new Array(); // An array for the submenu objects
var openimg  = 'open.gif'; // the image appears when the folder is opened
var closeimg = 'closed.gif'; // the image appears when the folder is closed
var lineimg  = 'line.gif'; // the image appears before each menutext

//////////////////////////D'ONT CHANGE HERE//////////////////////////
var lastn;
var lastmove;

if (document.layers) {visible = 'show';hidden = 'hide';}
else if (document.all) {visible = 'visible';hidden = 'hidden';}
for (var i = 0; i < nom; i++) {ttls[i] = ('title' + i);subs[i] = ('submenu' +i);}

function picopen(n) {
title = ('title' + n);pic = ('pic' + n);
if (document.layers) {document.layers[title].document.images[pic].src = openimg;}
else if (document.all) {document.all(pic).src = openimg;   }
}

function picclose(n) {
title = ('title' + n);pic = ('pic' + n);
if (document.layers) {document.layers[title].document.images[pic].src = closeimg;}
else if (document.all) {document.all(pic).src = closeimg;}
}

lastn = (nom + 1);
lastmove = 0;

function lasttoggle(n,move) {
if (n <= nom) {menu = ('submenu' + n);
if (document.layers) {
submenu = document.layers[menu];}
else if (document.all) {submenu = document.all(menu).style;}
if (submenu.visibility == visible) {
submenu.visibility = hidden;picclose(n);
for (var i = (n+1); i <= nom; i++) {
if (document.layers) {document.layers[ttls[i]].top -= move;document.layers[subs[i]].top -= move;}
else if (document.all) {document.all(ttls[i]).style.pixelTop -= move;document.all(subs[i]).style.pixelTop -= move;}
         }
      }
   }
}

function toggle(n,move) {
menu = ('submenu' + n);
if (document.layers) {submenu = document.layers[menu];}
else if (document.all) {submenu = document.all(menu).style;}
if (submenu.visibility == visible) {
submenu.visibility = hidden;
if (usePictures) picclose(n);
for (var i = (n+1); i <= nom; i++) {
if (document.layers) {document.layers[ttls[i]].top -= move;document.layers[subs[i]].top -= move;}
else if (document.all) {document.all(ttls[i]).style.pixelTop -= move;document.all(subs[i]).style.pixelTop -= move;}
   }
}
else {
submenu.visibility = visible;
if (usePictures) picopen(n);
if (hidefolder) if (lastn != n) {lasttoggle(lastn,lastmove);}
for (var i = (n+1); i <= nom; i++) {
if (document.layers) {document.layers[ttls[i]].top += move;document.layers[subs[i]].top += move;}
if (document.all) {document.all(ttls[i]).style.pixelTop += move;document.all(subs[i]).style.pixelTop += move;}
   }
}
lastn = n;
lastmove = move;
}