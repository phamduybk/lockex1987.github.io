/**
 * Những script này sẽ được sử dụng ở các modal sửa luồng.
 */

/**
 * Thêm dòng (bao gồm hoặc loại bỏ)
 */
const addKeywordRow = (arr, divId, inputName) => {

    var html = `
            <div>
                <div class="text-warning or-label">
                    hoặc
                </div>

                <div class="d-flex justify-content-between align-items-center mb-1">
                    <ul class="tags-input" name="${inputName}">
                        ${arr.map(s => `
                            <li class="tags">
                                <span class="tag-content" title="${htmlEscapeEntities(s)}">${htmlEscapeEntities(s)}</span>
                                <span class="remove-icon">&times</span>
                            </li>
                        `).join('')}
                        
                        <li class="tags-new">
                            <input type="text" placeholder="Thêm tag">
                        </li>
                    </ul>

                    <span class="cursor-pointer text-danger font-weight-bold delete-icon" title="Xóa" style="margin: 0 10px;">
                        &times;
                    </span>
                </div>
            </div>`;
    
    $(divId).append(html);
    
    toggleOrLabels(divId);
};

/**
 * Ẩn hiện dòng chữ "hoặc"
 */
const toggleOrLabels = (divId) => {
    $(divId + ' .or-label').show();
    $(divId + ' .or-label').first().hide();
};

/**
 * Escape các ký tự đặc biệt thành mã HTML entity tương ứng.
 * Fix bug XSS.
 * @param {String} d Xâu cần escape
 */
const htmlEscapeEntities = function (d) {
    return typeof d === 'string' ?
        d.replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;') :
        d;
};

/**
 * Thêm dòng bao gồm.
 */
export const addContainKeywordRow = (arr) => {
    addKeywordRow(arr, '#containKeywordsDiv', 'containKeywords');
};

/**
 * Thêm dòng loại bỏ.
 */
export const addExcludeKeywordRow = (arr) => {
    addKeywordRow(arr, '#excludeKeywordsDiv', 'excludeKeywords');
};

/**
 * Lắng nghe sự kiện xóa dòng (cả bao gồm và loại bỏ).
 */
export const listenToRemoveRowEvent = () => {
    $('#containKeywordsDiv, #excludeKeywordsDiv').on('click', '.delete-icon', function() {
        var divId = $(this).parent().parent().parent().attr('id');

        $(this).parent().parent().remove();

        toggleOrLabels('#' + divId);

        checkKeywordNumberLimitError();
    });
};

/**
 * Xóa vùng bao gồm.
 */
export const clearContainKeywordDiv = () => {
    $('#containKeywordsDiv').html('');
};

/**
 * Xóa vùng loại bỏ.
 */
export const clearExcludeKeywordDiv = () => {
    $('#excludeKeywordsDiv').html('');
};

/**
 * Kiểm tra tag đã tồn tại hay chưa.
 * @param {String} text Nội dung tag mới
 */
const existingTag = (parentNode, text) => {
    var existing = false;
    
    parentNode.find(".tags span").each(function() {
        if ($(this).text().toLowerCase() == text.toLowerCase()) {
            existing = true;
            return ""; // cái này chỉ là kết thúc hàm foreach thôi
        }
    });

    return existing;
};

/**
 * Lấy dữ liệu JSON của vùng bao gồm, loại bỏ
 */
export const getContentJson = (inputName) => {
    var arr = [];
    document.getElementsByName(inputName).forEach(inputTag => {
        var temp = [];
        inputTag.querySelectorAll('.tag-content').forEach(ele => temp.push(ele.textContent.trim()));
        if (temp.length > 0) {
            arr.push(temp);
        }
    });
    return arr;
};

/**
 * Kiểm tra ẩn hiện thông báo lỗi không nhập quá 20 keyword.
 */
const checkKeywordNumberLimitError = () => {
    var containKeywordsJson = getContentJson('containKeywords');
    var excludeKeywordsJson = getContentJson('excludeKeywords');
    var n = getNumberOfKeywords(containKeywordsJson) + getNumberOfKeywords(excludeKeywordsJson);
    //console.log(n);
    if (n > 20) {
        $('#updateForm #keywordNumberLimitError').show();
    } else {
        $('#updateForm #keywordNumberLimitError').hide();
    }
};

/**
 * Lấy số lượng từ khóa.
 */
export const getNumberOfKeywords = (keywordsJson) => {
    if (keywordsJson.length == 0) {
        return 0;
    }

    return keywordsJson.reduce((total, currentValue) => total + currentValue.length, 0);
};

export const listenToTagsEvents = () => {
    // Sự kiện khi nhập tag
	$(document).on('keypress', ".tags-new input", function(event) {
		// Khi nhấn Enter hoặc dấu phảy
		var key = event.which;
		if (key == 13 || key == 44) {
			// Không submit form
			event.preventDefault();
			
			// Lấy giá trị
			var tag = $(this).val().trim();
			
			// Chuẩn hóa chữ thường
			//tag = tag.toLowerCase();

			// Nếu có nhập
			if (tag.length > 0) {
				var parentNode = $(this).parents(".tags-input");
				
				// Nếu chưa tồn tại
				if (!existingTag(parentNode, tag)) {
					// Thêm tag
					$('<li class="tags"><span class="tag-content" title="' + htmlEscapeEntities(tag) + '">' + htmlEscapeEntities(tag) + '</span> <span class="remove-icon">&times;</span></li>')
						.insertBefore(parentNode.find(".tags-new"))
						.fadeIn(100);
					
					// Reset giá trị ô nhập
					$(this).val('');

                    // Ẩn thông báo lỗi
                    $('#updateForm #containRequiredError').hide();

                    // Kiểm tra
                    checkKeywordNumberLimitError();
				} else {
					// Highlight trùng
				}
				
			}
		}
	});
	
	// Sự kiện khi nhấn vào nút xóa
	$(document).on("click", ".tags .remove-icon", function() {
		// Xóa cả thẻ li
		$(this).parent("li")
			.remove()
			.fadeOut(100);
        
        checkKeywordNumberLimitError();
	});
};
