$(function() {
	// Kiểm tra tag đã tồn tại
	function existingTag(text) {
		var existing = false;
		
		$(".tags span").each(function() {
			if ($(this).text() == text) {
				existing = true;
				return ""; // cái này chỉ là kết thúc hàm foreach thôi
			}
		});

		return existing;
	}

	// Focus vào trường nhập tag
	$(".tags-new input").focus();
	
	// Sự kiện khi nhập tag
	$(".tags-new input").keypress(function(event) {
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
				// Nếu chưa tồn tại
				if (!existingTag(tag)) {
					// Thêm tag
					$('<li class="tags"><span>' + tag + '</span> <i>x</i></li>')
						.insertBefore($(".tags-new"))
						.fadeIn(100);
					
					// Reset giá trị ô nhập
					$(this).val("");
				} else {
					// Highlight trùng
				}
				
			}
		}
	});
	
	// Sự kiện khi nhấn vào nút xóa
	$(".tags-input").on("click", ".tags i", function() {
		// Xóa cả thẻ li
		$(this).parent("li")
			.remove()
			.fadeOut(100)
			;
	});
});