$(function() {
	
	/**
	 * Thêm câu hỏi
	 */
	function insertQuestion() {
		$.post("insert-question",
				{
			        "question": $("#questionText").val()
			    },
			    function(data, status) {
			        alert("Data: " + data.responseCode);
			    });
	}

	// Gắn sự kiện thêm câu hỏi
	$("#questionText").keyup(function(evt) {
	    if (evt.keyCode == 13) {
	    	insertQuestion();
	    }
	});
	$("#questionButton").click(insertQuestion);
});
