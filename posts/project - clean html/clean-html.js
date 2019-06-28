function unwrapNode(el) {
	// get the element's parent node
	var parent = el.parentNode;

	// move all children out of the element
	while (el.firstChild) {
		parent.insertBefore(el.firstChild, el);
	}

	// remove the empty element
	parent.removeChild(el);
}

function wrapTextNode() {
	var children = document.body.childNodes;
	for (let i = 0; i < children.length; i++) {
		var node = children[i];
		var nodeName = node.nodeName.toLowerCase();
		//['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table']
		if (['#text', 'img', 'a'].includes(nodeName)) {
			var pTag = document.createElement('p');
			pTag.appendChild(node.cloneNode(true));
			node.replaceWith(pTag);
		} else if (['br'].includes(nodeName)) {
			node.remove();
		}
	}
}

function removeAttributes() {
	var attributes = [
		'style',
		'class',
		'id',
		//'name',
		'ng-if',
		'ng-click',
		'ng-non-bindable',
		'spellcheck',
		'border',
		'cellpadding',
		'cellspacing',
		'data-lazy-type',
		'data-lazy-src',
		'data-lazy-srcset',
		'data-lazy-sizes',
		'data-file',
		'data-filename',
		//'rel',
		'height',
		'width',
		'alt',
		'scope',
		'srcset'
	];
	
	attributes.forEach(attr => {
		document.querySelectorAll(`[${attr}]`).forEach(ele => ele.removeAttribute(attr));
		
	});
}

function unwrapDiv() {
	// Bỏ các thẻ div
	document.querySelectorAll('div').forEach(el => unwrapNode(el));
}

function unwrapSpan() {
	// Bỏ các thẻ span
	document.querySelectorAll('span').forEach(el => unwrapNode(el));
}

function removeNoHrefLink() {
	// Bỏ các thẻ a mà không có thuộc tính href
	document.querySelectorAll('a').forEach(el => {
		if (!el.href) {
			unwrapNode(el)
		}
	});
}

function replaceItalicWithEm() {
	document.querySelectorAll('span[class=italic').forEach(spanTag => {
		var emTag = document.createElement('em');
		emTag.innerHTML = spanTag.innerHTML;
		spanTag.replaceWith(emTag);
	});
}

function getHtmlCode() {
	var code = document.documentElement.outerHTML;
	code = code.replace(/&nbsp;/gi, ' ');
	//data = data.replace(r'<p><a></a></p>', '')
	return code;
}

function removeEmptyNode(node) {
	var nodeName = node.nodeName.toLowerCase();
	if (['#text', 'img', 'script'].includes(nodeName)) {
		return;
	}
	
	// Xử lý những thằng con trước
	var children = node.childNodes;
	for (let i = 0; i < children.length; i++) {
		removeEmptyNode(children[i]);
	}
	
	var content = node.textContent.trim();
	if (!content) {
		var hasImage = node.querySelectorAll('img').length > 0;
		if (!hasImage) {
			console.log('Remove', node.outerHTML);
			node.remove();
		}
	}
}


//replaceItalicWithEm();

removeAttributes();

removeNoHrefLink();

unwrapDiv();
unwrapSpan();

wrapTextNode();

// Phải hỏi hàm này nhiều lần (có thể do quá nhiều node)
for (var i = 0; i < 5; i++) {
	removeEmptyNode(document.body);
}

getHtmlCode();
