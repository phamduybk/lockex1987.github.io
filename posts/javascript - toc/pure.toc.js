// https://ndabas.github.io/toc/
var toc = (function () {

	function extend(out) {
		out = out || {};

		for (var i = 1; i < arguments.length; i++) {
			if (!arguments[i]) {
				continue;
			}
			for (var key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key) && arguments[i][key]) {
					out[key] = arguments[i][key];
				}
			}
		}

		return out;
	}

	function generateUniqueId(text) {
		// Generate a valid ID. Spaces are replaced with underscores. We also check if
		// the ID already exists in the document. If so, we append "_1", "_2", etc.
		// until we find an unused ID.
		if (text.length === 0) {
			text = "my_id";
		}
		var baseId = text.replace(/\s+/g, "_");
		var suffix = "";
		var count = 1;
		while (document.getElementById(baseId + suffix) !== null) {
			suffix = "_" + count++;
		}
		var id = baseId + suffix;
		//console.log("id: " + id);
		//TODO: Liệu có cần bỏ các ký tự đặc biệt?
		return id;
	}

	function getLevel(tagName, headingSelectors) {
		tagName = tagName.toUpperCase();
		for (var i = 0; i < headingSelectors.length; i++) {
			if (tagName === headingSelectors[i]) {
				return i;
			}
		}
		return undefined;
	}

	function process(el, listTag, headings, headingSelectors) {
		// Mảng các thẻ ol hoặc ul, có thể là phần tử gốc hoặc các sub group
		var stack = [el];

		// Level hiện tại
		var currentLevel = 0;

		//console.log("Init: " + stack.length);

		// Xây dựng toc
		headings.forEach((head) => {
			var level = getLevel(head.tagName, headingSelectors);
			//console.log(head.tagName + ": " + level);

			if (level > currentLevel) {
				// Level sâu hơn, chúng ta phải tạo một sub group mới
				// Lấy ra phần tử li cuối cùng parentItem
				// Thêm vào đầu stack
				var children = stack[0].children;
				if (children) {
					var parentItem = children[children.length - 1];
					var subGroupTag = document.createElement(listTag);
					parentItem.appendChild(subGroupTag);
					stack.unshift(subGroupTag);
				}
			} else {
				// Xóa một số phần tử ở đầu mảng
				// Phải giữ ít nhất một phần tử
				var howmany = currentLevel - level;
				stack.splice(0, howmany);
			}

			//console.log(head.textContent + " (" + stack.length + ")");

			// Add the list item
			appendListItem(stack[0], head.textContent, head.id);

			// Cập nhật lại level
			currentLevel = level;
		});
	}

	function appendListItem(listGroupTag, textContent, id) {
		var aTag = document.createElement("a");
		aTag.textContent = textContent;
		aTag.href = "#" + id;

		var liTag = document.createElement("li");
		liTag.appendChild(aTag);

		listGroupTag.appendChild(liTag);
	}

	function normalizeHeadings(headings) {
		// Cập nhật lại ID cho các heading (nếu chưa có)
		headings.forEach((head) => {
			if (!head.id) {
				head.id = generateUniqueId(head.textContent);
			}
		});
	}

	function toc(el, options) {
		// Lấy các tùy chọn
		var thisOptions = extend({
			content: "body",
			headings: "h1,h2,h3"
		}, {
				content: el.dataset.toc,
				headings: el.dataset.tocHeadings
			}, options);
		//console.log("options: " + JSON.stringify(thisOptions));

		// Chuẩn hóa tùy chọn
		var headingSelectors = thisOptions.headings.toUpperCase().split(",");
		for (var i = 0; i < headingSelectors.length; i++) {
			headingSelectors[i] = headingSelectors[i].trim();
		}

		// Lấy ra danh sách các heading
		var headings = document.querySelector(thisOptions.content).querySelectorAll(thisOptions.headings);

		normalizeHeadings(headings);

		// ol hoặc ul
		var listTag = el.tagName;

		process(el, listTag, headings, headingSelectors);
	}

	function init() {
		var a = document.querySelectorAll("[data-toc]");
		a.forEach((e) => {
			toc(e);
		});
	}

	// Thêm sự kiện load trang
	//document.addEventListener("DOMContentLoaded", init);

	// Trả lại hàm để sử dụng ở những chỗ khác
	return toc;
})();

// Gọi JS bình thường
toc(document.querySelector("[data-toc]"));
