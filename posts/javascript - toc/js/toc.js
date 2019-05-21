var toc = (function () {

	/**
	 * Extend các tùy chọn.
	 * @param {Object} out Tham số thứ nhất (tùy chọn mặc định)
	 */
	function extend(out) {
		// Kiểm tra đối tượng trả về là tham số thứ nhất
		out = out || {};

		// Duyệt tiếp các tham số, ghi đè các thuộc tính
		for (var i = 1; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) {
				continue;
			}
			for (var key in arg) {
				if (arg.hasOwnProperty(key) && arg[key]) {
					out[key] = arg[key];
				}
			}
		}

		return out;
	}

	/**
	 * Sinh ra ID mặc định.
	 * @param {String} text 
	 */
	function generateUniqueId(text) {
		// Thay thế ký tự . bằng ký tự _
		var baseId = text.replace(/\./g, '_');

		// Kiểm tra xem ID đã tồn tại hay chưa,
		// nếu ID đã tồn tại thì thêm các hậu tố _1, _2,... cho đến khi tìm thấy ID chưa sử dụng
		var suffix = '';
		var count = 1;
		while (document.getElementById(baseId + suffix) !== null) {
			suffix = '_' + count++;
		}

		return baseId + suffix;
	}

	/**
	 * Lấy ra cấp độ của thẻ heading
	 * @param {String} tagName Tên tag (h1, h2, h3, h4, h5, h6)
	 * @param {Array} headingSelectors Mảng các heading tùy chọn
	 */
	function getLevel(tagName, headingSelectors) {
		tagName = tagName.toUpperCase();
		return headingSelectors.indexOf(tagName);
	}

	/**
	 * Hàm xử lý chính.
	 * @param {DOMNode} el Thẻ danh sách gốc
	 * @param {String} listTag Tên thẻ (ol hoặc ul)
	 * @param {Array} headings Danh sách các heading
	 * @param {Array} headingSelectors Danh sách các tag
	 */
	function process(el, listTag, headings, headingSelectors) {
		// Level hiện tại
		var currentLevel = 0;

		// Mảng các thẻ ol hoặc ul, có thể là phần tử gốc hoặc các sub group
		var stack = [el];
		stack.push(el);

		// Chỉ số
		var indice = [];
		indice.push(0);

		// Duyệt danh sách heading
		headings.forEach((head) => {
			// Cấp độ của heading hiện tại
			var level = getLevel(head.tagName, headingSelectors);

			if (level > currentLevel) {
				// Level sâu hơn, chúng ta phải tạo một sub group mới
				// Lấy ra phần tử li cuối cùng parentItem
				// Thêm vào đầu stack
				var children = stack[stack.length - 1].children;
				if (children) {
					var parentItem = children[children.length - 1];
					var subGroupTag = document.createElement(listTag);
					parentItem.appendChild(subGroupTag);
					stack.push(subGroupTag);
				}

				indice.push(1);
			} else if (currentLevel == level) {
				indice[level]++;
			} else {
				// Xóa một số phần tử ở đầu mảng
				// Phải giữ ít nhất một phần tử
				var howMany = currentLevel - level;
				//console.log(level, howMany);
				stack.splice(stack.length - howMany, howMany);
				
				indice[level]++;
				indice.splice(level + 1, howMany);
			}

			// Cập nhật lại level
			currentLevel = level;

			//console.log(indice);

			// Thêm các số ở đầu
			var headingPrefix = indice.join('.');
			head.textContent = headingPrefix  + '. ' + head.textContent;

			// Cập nhật lại ID cho các heading (nếu chưa có)
			if (!head.id) {
				head.id = generateUniqueId('heading_' + headingPrefix); // head.textContent
			}

			// Thêm phần tử vào danh sách
			appendListItem(stack[stack.length - 1], head.textContent, head.id);
		});
	}

	/**
	 * Thêm phần tử vào danh sách.
	 * @param {DOMNode} listGroupTag Thẻ ol hoặc ul hiện tại
	 * @param {String} textContent Nhãn của heading
	 * @param {String} id ID của heading
	 */
	function appendListItem(listGroupTag, textContent, id) {
		// Tạo thẻ a, bao bởi thẻ li, rồi thêm vào thẻ ol hoặc ul
		var aTag = document.createElement("a");
		aTag.textContent = textContent;
		aTag.href = "#" + id;

		var liTag = document.createElement("li");
		liTag.appendChild(aTag);

		listGroupTag.appendChild(liTag);
	}

	/**
	 * Khởi tạo mục lục.
	 * @param {DOMNode} el Đối tượng DOM danh sách
	 * @param {Object} options Tùy chọn
	 */
	function toc(el, options) {
		// Lấy các tùy chọn
		var thisOptions = extend(
			// Mặc định
			{
				content: "article",
				headings: "h3, h4"
			},
			// Thiết lập bằng các thuộc tính data-
			{
				content: el.dataset.toc,
				headings: el.dataset.tocHeadings
			},
			// Người dùng nhập
			options
		);

		// Chuẩn hóa tùy chọn headings
		var headingSelectors = thisOptions.headings
					.toUpperCase()
					.split(',')
					.map(s => s.trim());

		// Lấy ra phần tử bao
		var rootElement = document.querySelector(thisOptions.content);
		if (!rootElement) {
			return;
		}

		// Lấy ra danh sách các heading và chuẩn hóa
		var headings = rootElement.querySelectorAll(thisOptions.headings);

		// Danh sách là thẻ ol hoặc ul
		var listTag = el.tagName;

		// Xử lý
		process(el, listTag, headings, headingSelectors);
	}

	/**
	 * Tự động khởi tạo với các phần tử có thuộc tính 'data-toc'.
	 */
	function init() {
		var arr = document.querySelectorAll('[data-toc]');
		if (arr.length > 0) {
			arr.forEach((el) => {
				toc(el);
			});
		} else {
			var el = document.createElement('ul');
			el.className = 'toc';
			var rootElement = document.querySelector('article');
			rootElement.insertBefore(el, rootElement.children[1]);
			toc(el);
		}
	}

	// Thêm sự kiện load trang
	// https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
	if (document.readyState === 'loading') {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}

	// Trả lại hàm để sử dụng ở những chỗ khác
	return toc;
})();

// Gọi JS bình thường
//toc(document.querySelector("[data-toc]"));
