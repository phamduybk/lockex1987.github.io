/**
Khi sử dụng thư viện highlight.js, HTML structure của đoạn code là:

<pre>
    <code class="lang hljs">
        <span class="hljs-*">...</span>
        <span class="hljs-*">...</span>
        ...
    </code>
</pre>      

Thẻ pre không có định dạng gì.

Thẻ code có định dạng theo class hljs:

    background-color
    color

Các thẻ span có định dạng theo class hljs-*:

    color

x
 */
function highlightJsInlineAll() {
    var codes = document.querySelectorAll("pre > code");
    for (var i = 0; i < codes.length; i++) {
        var code = codes[i];
        highlightJsInlineOne(code);
    }
}

function highlightJsInlineOne(code) {
    var cs = window.getComputedStyle(code, null);
    var color = cs.getPropertyValue("color");
    var backgroundColor = cs.getPropertyValue("background-color");
    code.style.cssText = "";
    code.style.color = color;
    code.style.backgroundColor = backgroundColor;
    code.style.display = "block";
    code.style.padding = "5px";
    //c.className = "";
    //delete c.className;
    code.removeAttribute("class");

    var spans = code.querySelectorAll("span");
    for (var i = 0; i < spans.length; i++) {
        var s = spans[i];
        var cs = window.getComputedStyle(s, null);
        var color = cs.getPropertyValue("color");
        s.style.cssText = "";
        s.style.color = color;
        //s.className = "";
        //delete s.className;
        s.removeAttribute("class");
    }
}

(function() {
    var highlight = document.querySelector("#highlight");
    var code = document.querySelector("#code");
    var lang = document.querySelector("#lang");
    var output = document.querySelector("#output");

    highlight.addEventListener("click", function(event) {
        //output.innerHTML = code.value;
        output.textContent = code.value;
        output.className = lang.value;
        hljs.highlightBlock(output);
        //highlightJsInlineAll();
        highlightJsInlineOne(output);
    });
})();
