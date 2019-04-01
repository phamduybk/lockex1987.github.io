var tag = (function() {
	/**
	 * Kiểm tra tag đã tồn tại hay chưa.
	 * Cần phân biệt trong trường hợp nhiều vùng tag.
	 * @param {String} text Nội dung tag mới
	 */
	function existingTag(parentNode, text) {
		var existing = false;
		
		parentNode.find('.tag-item .tag-content').each(function() {
			if ($(this).text() == text) {
				existing = true;
				return ''; // cái này chỉ là kết thúc hàm foreach thôi
			}
		});

		return existing;
	}
	
	// Sự kiện khi nhập tag
	function listenToTagsEvents() {
		// Sự kiện khi nhập tag
		$(document).on('keypress', '.tag-new input', function(event) {
			// Khi nhấn Enter hoặc dấu phảy
			var key = event.which;
			if (key == 13 || key == 44) {
				// Không submit form
				event.preventDefault();
				
				// Lấy giá trị
				var tag = $(this).val().trim();
				
				// Chuẩn hóa chữ thường
				tag = tag.toLowerCase();
				
				// Nếu có nhập
				if (tag.length > 0) {
					var parentNode = $(this).parents('.tags-wrapper');

					// Nếu chưa tồn tại
					if (!existingTag(parentNode, tag)) {
						// Thêm tag
						var html = `
								<li class="tag-item">
									<span class="tag-content">${tag}</span>
									<span class="remove-icon">&times;</span>
								</li>`;
						$(html).insertBefore(parentNode.find(".tag-new"))
								.fadeIn(100);
						
						// Reset giá trị ô nhập
						$(this).val('');
					} else {
						// Highlight trùng
					}
					
				}
			}
		});

		// Remove previous tag item
		$(document).on('keydown', '.tag-new input', function(event) {
			if (event.keyCode == 8 && $(this).val() == '') {
					//event.preventDefault();
					
			}
		});
		
		// Sự kiện khi nhấn vào nút xóa
		$(document).on('click', '.tag-item .remove-icon', function() {
			// Xóa cả thẻ li
			$(this).parent('li')
				.remove()
				.fadeOut(100)
				;
		});
	}

	/**
	 * Hiển thị các tag đang có (chức năng cập nhật).
	 * @param {Array} arr Mảng dữ liệu hiện tại
	 * @param {String} divId ID vùng div
	 */
	function bindTags(arr, divId) {
		var html = `
				<ul class="tags-wrapper">
					${arr.map(s => `
						<li class="tag-item">
							<span class="tag-content">${s}</span>
							<span class="remove-icon">&times</span>
						</li>
					`).join('')}

					<li class="tag-new">
						<input type="text" placeholder="Thêm tag">
					</li>
				</ul>`;
		
		$(divId).html(html);
	}

	/**
	 * Lấy dữ liệu của vùng tag.
	 */
	function getContent(divId) {
		var arr = [];
		document.querySelectorAll(divId + ' .tag-content').forEach(ele => arr.push(ele.textContent));
		return arr;
	}

	// Thực hiện luôn
	listenToTagsEvents();

	// Chìa API ra cho bên ngoài sử dụng
	return {
		bindTags,
		getContent
	}
})();