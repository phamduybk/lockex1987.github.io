// https://www.sitepoint.com/building-list-jquery-local-storage/

var task = task || {};

// Lấy dữ liệu cũ
var data = JSON.parse(localStorage.getItem("taskData"));

data = data || {};

	
// Các loại task
var codes = {
	"1" : "#pending",
	"2" : "#inProgress",
	"3" : "#completed"
};

// Khởi tạo
task.init = function() {
	// Hiển thị dữ liệu cũ
	$.each(data, function(index, params) {
		generateElement(params);
	});

	// Thêm sự kiện drop vào mỗi mục chứa (Pending, In Progress, Completed)
	$.each(codes, function(index, value) {
		$(value).droppable({
			drop: function(event, ui) {
				var element = ui.helper;
				var css_id = element.attr("id");
				var id = css_id.replace("task-", "");
				var object = data[id];
				
				// Removing old element
				removeElement(object);
				
				// Changing object code
				object.code = index;
				
				// Generating new element
				generateElement(object);
				
				// Updating Local Storage
				data[id] = object;
				localStorage.setItem("taskData", JSON.stringify(data));
				
				// Hiding Delete Area
				$("#" + "delete-div").hide();
			}
		});
	});
	
	// Adding drop function to delete div
	$("#" + "delete-div").droppable({
		drop: function(event, ui) {
			var element = ui.helper;
			var css_id = element.attr("id");
			var id = css_id.replace("task-", "");
			var object = data[id];
			
			// Removing old element
			removeElement(object);
			
			// Updating local storage
			delete data[id];
			localStorage.setItem("taskData", JSON.stringify(data));
			
			// Hiding Delete Area
			$("#" + "delete-div").hide();
		}
	})
};

// Thêm thẻ div tương ứng với task
var generateElement = function(params) {
	// Xác định vùng chứa (Pending, In Progress, Completed)
	var parent = $(codes[params.code]);

	if (!parent) {
		return;
	}

	// Tạo các thẻ div
	var wrapper = $("<div />", {
		"class": "task-wrapper",
		"id" : "task-" + params.id
	}).appendTo(parent);
	
	$("<div />", {
		"class" : "task-header",
		"text": params.title
	}).appendTo(wrapper);

	$("<div />", {
		"class" : "task-date",
		"text": params.date
	}).appendTo(wrapper);

	$("<div />", {
		"class" : "task-description",
		"text": params.description
	}).appendTo(wrapper);

	// Gắn sự kiện drag và drop của thẻ div
	wrapper.draggable({
		start: function() {
			$("#" + "delete-div").show();
		},
		stop: function() {
			$("#" + "delete-div").hide();
		},
		revert: "invalid",
		revertDuration: 200
	});
};

// Remove task div
var removeElement = function(params) {
	$("#" + "task-" + params.id).remove();
};

// Thêm task
task.add = function() {
	var inputs = $(".task-form :input");

	var title = inputs[0].value;
	var description = inputs[1].value;
	var date = inputs[2].value;

	if (!title) {
		alert("Title can not be empty");
		return;
	}

	// ID ngẫu nhiên là timestamp
	var id = new Date().getTime();
	var tempData = {
		id: id,
		code: "1", // trạng thái pending
		title: title,
		date: date,
		description: description
	};

	// Saving element in local storage
	data[id] = tempData;
	localStorage.setItem("taskData", JSON.stringify(data));
	
	// Generate Element
	generateElement(tempData);

	// Reset Form
	inputs[0].value = "";
	inputs[1].value = "";
	inputs[2].value = "";
};

$("#datepicker").datepicker({
	dateFormat: "dd/mm/yy"
});

$(".task-container").droppable();
$(".task-wrapper").draggable({ revert: "valid", revertDuration: 200 });

task.init();