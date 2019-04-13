var cursor = document.getElementById('cursor-line')

$('#list>div').each(function(i) { Page(this, i) })

function getRect(node) {
  if (node.nodeType === 1) {
    return node.getBoundingClientRect();
  } else if (node.nodeType === 3) {
    var range = document.createRange();
    range.selectNode(node);
    var rect = range.getBoundingClientRect();
    range.detach(); // frees up memory in older browsers
    return rect;
  }
}

function Page(contentDiv, i) {
  var container = $('<div class="row">')
  container.append('<div class="page">').append('<div class="page">')
  container.append('<button class="reset">reset' + i + '</button>')
  
  document.body.appendChild(container[0]);
  
  var a = container.find('.page')[0]
  a.appendChild(contentDiv)
  var b = container.find('.page')[1]

  $(cursor).css({width: $(a).width()})

  $(a).on('mousemove', function(e) {
    var y = e.clientY + $(document).scrollTop()
    $(cursor).css({top: y})
  }).on('click', function(e) {
    reset()
    var y = e.clientY  + $(document).scrollTop() - $(a).offset().top;
    var parts = split4(a, y)
    if (parts) b.appendChild(parts[1])
  })

  var backup = a.firstChild.cloneNode(true)

  $('button.reset', container).on('click', function() {
    reset()
  })

  function reset() {
    $(a).empty().append(backup.cloneNode(true))
    $(b).empty()
  }
}

function split4(a, y) {
  var containerRect = a.getBoundingClientRect();
  var containerTop = containerRect.top
  var containerRight = containerRect.right
  
  var root = a.firstChild
  
  var splitNode = findSplitNode2()
  
  if (!splitNode) return
  
  var partAfter = cloneAfter(root, splitNode)

  removeAfter(root, splitNode)

  return [root, partAfter]
  
  function removeAfter(root, splitNode) {
    var node = splitNode

    do {
      var sibling = node.nextSibling
      while (sibling) {
        var toRemove = sibling
        sibling = sibling.nextSibling
        toRemove.parentNode.removeChild(toRemove)
      }
      
      node = node.parentNode
    } while (node !== root)
  }
  
  function cloneAfter(root, splitNode) {
    var node = splitNode
    
    var newRoot
    do {
      var tmp = node.parentNode.cloneNode(false)
      if (newRoot) {
        tmp.appendChild(newRoot)
      }
      newRoot = tmp
      var sibling = node.nextSibling
      while (sibling) {
        newRoot.appendChild(sibling.cloneNode(true))
        sibling = sibling.nextSibling
      }
      node = node.parentNode
    } while (node !== root)
    
    return newRoot
  }
  
  function findSplitNode2() {
    var splitNode = null
    // breakNode is the first node with exceeding bottom
    // splitNode is the a "good" one just before breakNode
    var breakNode = walk(root, function(node) {
      if (isLeaf(node)) {
        var rect = getRect(node)
        var nodeBottom = rect.bottom - containerTop
        // console.log(nodeBottom, y)
        if (nodeBottom > y) {
          return node
        } else {
          splitNode = node
        }
      }
    })
    
    // try to split text node to find a better split point
    if (breakNode && breakNode.nodeType === 3) {
      var node = breakNode
      var len = node.nodeValue.length
      var i = len - 2
      while (i > 0) {
        const node2 = node.splitText(i)
        const rect2 = getRect(node2)
        const rect1 = getRect(node)
        var rect = getRect(node)
        
        if (rect1.bottom - containerTop < y && rect2.left < containerRight - 0) {
          node.parentNode.normalize()
          node.splitText(i)
          splitNode = node
          break
        }
        
        i--
      }
    }
    
    return splitNode
  }
  
  function isLeaf(node) {
    return node.nodeType !== 1 || node.tagName === 'TABLE' || node.childNodes.length === 0
  }
  
  function walk(node, f) { 
    if (!node || (node.nodeType !== 1 && node.nodeType !== 3)) return;
    var r = f(node)
    if (r) return r;
    
    if (isLeaf(node)) return
    var children = Array.prototype.slice.call(node.childNodes)
    for (var i = 0; i < children.length; i++) {
      r = walk(children[i], f);
      if (r) return r;
    }
  }
}