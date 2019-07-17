/**
 * Định dạng ngày của Việt Nam.
 */
const VIETNAMESE_DATE_FORMAT = 'DD/MM/YYYY';

/**
 * Cấu hình mặc định, ngôn ngữ tiếng Việt.
 */
const DEFAULT_DATERANGEPICKER_OPTIONS = {
    // Khi click ra ngoài thì không thiết lập input
    autoUpdateInput: false,
    // Chọn riêng lẻ
    singleDatePicker: true,
    locale: {
        format: VIETNAMESE_DATE_FORMAT,
        separator: ' - ',
        applyLabel: 'Áp dụng',
        cancelLabel: 'Hủy',
        customRangeLabel: 'Tùy chỉnh',
        fromLabel: 'Từ',
        toLabel: 'Đến',
        daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', '7'],
        monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        firstDay: 1
    }
};

/**
 * Khởi tạo chọn khoảng thời gian.
 */
function initFilterDateRange() {
    var options = Object.assign({},
        DEFAULT_DATERANGEPICKER_OPTIONS,
        {
            singleDatePicker: false,
            ranges: {
                'Tất cả': [moment(), moment()], // nếu để là [null, null] sau khi chọn tất cả mà chọn tùy chỉnh sẽ bị lỗi, vì nó có hiển thị lại các ngày đang chọn hiện tại
                '30 ngày trước': [moment().subtract(29, 'days'), moment()],
                'Tuần này': [moment().startOf('week'), moment().endOf('week')],
                'Tuần trước': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
                'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                'Tháng trước': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Hôm nay': [moment(), moment()],
                'Hôm qua': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '7 ngày trước': [moment().subtract(6, 'days'), moment()],
                '30 ngày trước': [moment().subtract(29, 'days'), moment()],
            }
        }
    );

    $('#filterDateRange').daterangepicker(options, applyDateRangeFilter);
}

/**
 * Xử lý khi chọn khoảng thời gian.
 */
function applyDateRangeFilter(start, end, label) {
    if (label != 'Tất cả') {
        $('#filterDateRange .range-label').text(start.format(VIETNAMESE_DATE_FORMAT) + ' - ' + end.format(VIETNAMESE_DATE_FORMAT));
    } else {
        $('#filterDateRange .range-label').text('Tất cả');
    }
}

/**
 * Khởi tạo chọn ngày đơn giản, không có ràng buộc gì.
 */
function initSingleDate() {
    var options = Object.assign({},
        DEFAULT_DATERANGEPICKER_OPTIONS
    );

    var callback = function (chosenDate) {
		console.log(chosenDate);
        $('#singleDate').val(chosenDate.format(VIETNAMESE_DATE_FORMAT));
    };

    $('#singleDate').daterangepicker(options, callback);
}

/**
 * Khởi tạo datepicker cho ngày bắt đầu và ngày kết thúc.
 */
function initStartDateAndEndDate() {
    var options = Object.assign({},
        DEFAULT_DATERANGEPICKER_OPTIONS
    );
        
    initStartDate(options, null);
    initEndDate(options, null);
}

/**
 * Chọn ngày bắt đầu.
 */
function initStartDate(options, maxDate) {
    if ($('#startDate').data('daterangepicker') != null) {
        $('#startDate').data('daterangepicker').remove();
    }

    options.minDate = moment().subtract(100, 'years');
    options.maxDate = maxDate || moment().add(100, 'years');

    var callback = function (evt, picker) {
		console.log('Apply');
		var chosenDate = picker.startDate;
        var value;
		if (chosenDate.isValid()) {
			value = chosenDate.format(VIETNAMESE_DATE_FORMAT);
			$('#startDate').val(value);
		} else {
			value = null;
			$('#startDate').val('');
		}
        initEndDate(options, value);
    };

	// Phải làm thế này, nếu không sẽ không chọn được ngày hiện tại
    $('#startDate').daterangepicker(options)
			.on('apply.daterangepicker', callback)
			;
}

/**
 * Chọn ngày kết thúc.
 */
function initEndDate(options, minDate) {
    if ($('#endDate').data('daterangepicker') != null) {
        $('#endDate').data('daterangepicker').remove();
    }

	// Không thể để minDate, maxDate là các giá trị null, nếu không chỉ thiết lập được tháng hiện tại
    options.minDate = minDate || moment().subtract(100, 'years');
    options.maxDate = moment().add(100, 'years');

    var callback = function (evt, picker) {
        var chosenDate = picker.startDate;
		var value;
		if (chosenDate.isValid()) {
			value = chosenDate.format(VIETNAMESE_DATE_FORMAT);
			$('#endDate').val(value);
		} else {
			value = null;
			$('#endDate').val('');
		}
        initStartDate(options, value);
    };

    $('#endDate').daterangepicker(options)
			.on('apply.daterangepicker', callback);
}


initFilterDateRange();
initSingleDate();
initStartDateAndEndDate();
