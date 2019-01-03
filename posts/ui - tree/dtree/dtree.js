/*--------------------------------------------------|
|---------------------------------------------------|
| Copyright (c) 2002-2003 Geir Landr�               |
|                                                   |
| This script can be used freely as long as all     |
| copyright messages are intact.                    |
|                                                   |
| Updated: 17.04.2003                               |
|--------------------------------------------------*/
// Node object
	this.id = id;				// ID
	this.pid = pid;				// Parent's ID
	this.name = name;			// Name
	this.url = url;				// URL (link)
	this.title = title;			// Tooptip
	this.target = target;		// Target of the link
	this.icon = icon;			// Icon when close
	this.iconOpen = iconOpen;	// Icon when open
	this._io = open || false;	// Node is open or close
	this._is = false;			// Is selected
	this._ls = false;			// Last sibling
	this._hc = false;			// Has children
	this._ai = 0;				// In order
	this._p;					// Parent
};
// Tree object
function dTree(objName) {
	this.config = {
		target				: null,
		folderLinks			: true,
		useSelection		: true,
		useCookies			: true,
		useLines			: true,
		useIcons			: true,
		useStatusText		: false,
		closeSameLevel		: false,
		inOrder				: false
	}
	this.icon = {
		root			: 'img/base.gif',
		folder			: 'img/folder.gif',
		folderOpen		: 'img/folderopen.gif',
		node			: 'img/page.gif',
		empty			: 'img/empty.gif',
		line			: 'img/line.gif',
		join			: 'img/join.gif',
		joinBottom		: 'img/joinbottom.gif',
		plus			: 'img/plus.gif',
		plusBottom		: 'img/plusbottom.gif',
		minus			: 'img/minus.gif',
		minusBottom		: 'img/minusbottom.gif',
		nlPlus			: 'img/nolines_plus.gif',
		nlMinus			: 'img/nolines_minus.gif'
	};
	this.obj = objName;
	this.aNodes = [];
	this.aIndent = [];
	this.root = new Node(-1);
	this.selectedNode = null;
	this.selectedFound = false;
	this.completed = false;
};
// Adds a new node to the node array
	this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, target, icon, iconOpen, open);
};
// Open/close all nodes
	this.oAll(true);
};
dTree.prototype.closeAll = function() {
	this.oAll(false);
};
// Outputs the tree to the page
	var str = '<div class="dtree">\n';
	if (document.getElementById) {
		if (this.config.useCookies) {
		str += this.addNode(this.root);
	} else {
	str += '</div>';
	if (!this.selectedFound) {
	this.completed = true;
	return str;
};
// Creates the tree structure
dTree.prototype.addNode = function(pNode) {
	var str = '';
	var n = 0;
	if (this.config.inOrder) {
	for (n; n < this.aNodes.length; n++) {
		if (this.aNodes[n].pid == pNode.id) {
			var cn = this.aNodes[n];
			cn._p = pNode;
			cn._ai = n;
			this.setCS(cn);
			if (!cn.target && this.config.target) {
			if (cn._hc && !cn._io && this.config.useCookies) {
			if (!this.config.folderLinks && cn._hc) {
			if (this.config.useSelection && (cn.id == this.selectedNode) && !this.selectedFound) {
				cn._is = true;
				this.selectedNode = n;
				this.selectedFound = true;
			}
			str += this.node(cn, n);
			if (cn._ls) {
		}
	}
	return str;
};
// Creates the node icon, url and text
	var str = '<div class="dTreeNode">' + this.indent(node, nodeId);
	if (this.config.useIcons) {
		if (!node.icon) {
		if (!node.iconOpen) {
		if (this.root.id == node.pid) {
			node.icon = this.icon.root;
			node.iconOpen = this.icon.root;
		}
		str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt="" />';
	}
	if (node.url) {
		str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + node.url + '"';
		if (node.title) {
		if (node.target) {
		if (this.config.useStatusText) {
		if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc)) {
			str += ' onclick="javascript: ' + this.obj + '.s(' + nodeId + ');"';
		str += '>';
	} else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id) {
		str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');" class="node">';
	str += node.name;
	if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) {
	str += '</div>';
	if (node._hc) {
		str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
	this.aIndent.pop();
// Adds the empty and line icons
	var str = '';
	if (this.root.id != node.pid) {
		for (var n = 0; n < this.aIndent.length; n++) {
			str += '<img src="' + (((this.aIndent[n] == 1) && this.config.useLines) ? this.icon.line : this.icon.empty ) + '" alt="" />';
		if (node._ls) {
		if (node._hc) {
			str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
			if (!this.config.useLines) {
			str += '" alt="" /></a>';
		} else {
	}
// Checks if a node has any children and if it is the last sibling
	var lastId;
	for (var n = 0; n < this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.id) {
		if (this.aNodes[n].pid == node.pid) {
// Returns the selected node
// Highlights the selected node
// Toggle Open or close
// Open or close all nodes
// Opens the tree to a specific node
// Closes all nodes on the same level as certain node
// Closes all children of a node
// [Cookie] Clears a cookie
// [Cookie] Sets value in a cookie
// [Cookie] Gets a value from a cookie
// [Cookie] Returns ids of open nodes as a string
// [Cookie] Checks if a node id is in a cookie
// If Push and pop is not implemented by the browser
if (!Array.prototype.pop) {