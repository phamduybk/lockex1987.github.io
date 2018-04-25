var playlist = [
	{ title: "Ngang qua cuộc đời", file: "ngang qua cuoc doi", author: "Chu Thị Minh Huệ", reader: "NS. Vân Anh", description: "Cuộc sống miền núi cao thời phong kiến với bao tập tục lạc hậu, bao gánh nặng hủ tục đè nặng lên thân phận chị Pháy." },
	{ title: "Văng vẳng nơi xa thẳm", file: "vang vang noi xa tham", author: "Nguyễn Đức Thiện", reader: "NS. Hải Yến", description: "Truyện cho thấy rõ hơn tình cảm giữa con người với con người trong hoàn cảnh đất nước có chiến tranh." },
	{ title: "Phòng chờ", file: "phong cho", author: "Ý Nhi", reader: "NS. Minh Nguyệt", description: "Sự đòi hỏi hòa hợp tuyệt đối trong đời sống vợ chồng là điều không thể khiến hai người sống chung một mái nhà mà đồng sàng dị mộng." },
	{ title: "Về sáng", file: "ve sang", author: "Đào Thị Thanh Tuyền", reader: "NSƯT Hoàng Yến", description: "Truyện là nỗi niềm của những người đang tiếc nuối một cách sâu sắc trước mỗi ngày đi qua." },
	{ title: "Rừng trong thành phố", file: "rung trong thanh pho", author: "Đặng Thị Thanh Hương", reader: "NSƯT Kim Cúc", description: "Người ta có thể oán trách người khác, có thể đổ cho số phận nhưng bản thân mỗi người họ đứng ở đâu trước những sai lầm và sa ngã của đời mình?" },
	{ title: "Bảy ngày trong đời", file: "bay ngay trong doi", author: "Nguyễn Thị Thu Huệ", reader: "NS. Minh Nguyệt", description: "Lụa đi tìm Sánh là sự khẳng định và tự tin vào tình yêu, hạnh phúc của người phụ nữ dám sống, dám trả giá vì tình yêu chung thủy." },
	{ title: "Chuyến xe điện ra mặt trận", file: "chuyen xe dien ra mat tran", author: "X.Jurakhovits (Bản dịch: Anh Ngọc)", reader: "NS. Minh Nguyệt", description: "Dimitro đã phạm phải một sai lầm nghiêm trọng trong tình yêu đó là sự ích kỷ và thiếu lòng tin đã không có cơ hội sửa chữa sai lầm vì chiến tranh ác liệt." },
	{ title: "Nụ cười bí ẩn", file: "nu cuoi bi an", author: "Trương Anh Quốc", reader: "NS Minh Nguyệt", description: "Ở thời hiện đại, niềm tin về lòng chung thủy trong tình yêu lại trở thành một phẩm chất có phần xa xỉ trong suy nghĩ của nhiều người." },
	{ title: "Vườn cây kể chuyện", file: "vuon cay ke chuyen", author: "Lê Minh Khuê", reader: "NS. Hải Yến", description: "Bà cụ Tuy – người phụ nữ đảm đang nhân hậu cả cuộc đời hy sinh cho chồng con, số phận của bà được lý giải và chiêm nghiệm bằng chữ Nhẫn của nhà Phật." },
	{ title: "Trong lúc ăn một bát phở gia truyền", file: "trong luc an mot bat pho gia truyen", author: "Nguyễn Thị Thu Huệ", reader: "NS Vân Anh", description: "Truyện chạm đến nét ẩm thực đô thị đang bị phôi pha thông qua suy nghĩ và cảm nhận của một tâm hồn phụ nữ tinh tế." },
	{ title: "Người đập áo sông Năng", file: "nguoi dap ao song nang", author: "Dương Bình Nguyên", reader: "NSƯT Hà Phương", description: "Mối tình tay ba phức tạp: Có con với Tần nhưng Toàn lại cũng yêu Phan, cô gái miền xuôi học cùng lớp và đưa về quê thăm bà." },
	{ title: "Cánh bướm bạc", file: "canh buom bac", author: "Hoàng Thu Thủy", reader: "NSƯT Hoàng Yến", description: "Bi kịch chồng chị, chồng em chỉ có thể giải quyết bằng sự cao thượng, lòng nhân ái bao dung và biết hi sinh vì người khác." },
	{ title: "Nghĩa địa của người sống", file: "nghia dia cua nguoi song", author: " Di Li", reader: "NS. Vân Anh", description: "Người đang sống đã lo xa cho mình những suất đất sau khi nhắm mắt xuôi tay, hay chỉ đơn thuần là thói hợm hĩnh của những kẻ vung tiền quá trán?" },
	{ title: "Ráng chiều đỏ rực", file: "rang chieu do ruc", author: "Nguyễn Thị Việt Hà", reader: "NS. Minh Nguyệt", description: "Phấn tự nhiên run bắn, lần đầu tiên có người đàn ông dòm ả âu yếm đến thế! Lâu nay người ta vẫn dòm ả theo cái kiểu của lòng thương hại hoặc kinh sợ mà thôi." },
	{ title: "Phía trước là dòng sông", file: "phia truoc la dong song", author: "Bích Ngân", reader: "NS. Minh Nguyệt", description: "Liệu đồng tính có phải là một thảm họa? Đồng tính chỉ là một hiện tượng trong đời sống con người không ai lựa chọn nó và cũng không ai chối bỏ được nó." },
	{ title: "Mặt trời chiếu thẳng đứng", file: "mat troi chieu thang dung", author: "Đặng Ngọc Việt Anh", reader: " NSƯT Kim Cúc", description: "Khoảng lặng luôn ám ảnh trong lòng những người phụ nữ vùng biển trước mỗi chuyến đi biển của chồng của con." },
	{ title: "Trái tim điên điển", file: "trai tim dien dien", author: "Nguyễn Thị Kim Tuyến", reader: "NSƯT Hà Phương", description: "Bi kịch của hai người đàn bà bất hạnh đã dồn xuống cuộc đời Năm Đợi với gánh nặng gia đình không dễ sẻ chia tâm sự." },
	{ title: "Người đàn bà đợi mưa", file: "nguoi dan ba doi mua", author: "Đỗ Tiến Thụy", reader: "NSƯT Hoàng Yến", description: "Chiến tranh tàn khốc hơn cả là khi nó khiến những con người chính vì yêu, vì thương nhau thật sự lại phải chọn cách rời xa nhau." },
	{ title: "Cây phong non âm thầm", file: "cay phong non am tham", author: "Thu Trân", reader: "NSƯT Hoàng Yến", description: "Truyện dường như đã trả lời được câu hỏi làm gì để vơi bớt nỗi đau thể xác và tinh thần cho những nạn nhân da cam nghèo khó nhất trong xã hội." },
	{ title: "Hòn đá chèn", file: "hon da chen", author: "Lý Nhuệ", reader: "NS. Đình Khánh", description: "Với đàn ông, ý muốn sở hữu độc quyền và xu hướng ham chinh phục là những bản năng vô cùng mạnh mẽ." },
	{ title: "Từ lâu không nói", file: "tu lau khong noi", author: "Du An", reader: "NSƯT Hà Phương", description: "Sự thiếu thốn, kham khổ khiến con người mòn mỏi trong nhan sắc, vụng về trong ứng xử và đôi khi tặc lưỡi chấp nhận hùa theo những cám dỗ tầm thường." },
	{ title: "Ánh mắt", file: "anh mat", author: "Trầm Nguyên Ý Anh", reader: "NS. Vân Anh", description: "Ở đời có không hiếm những người con như Lục Bình luôn cho mình là đúng, không những đã làm phật lòng mà còn làm tổn thương đến tình cảm của cha mẹ." },
	{ title: "Ấm áp", file: "am ap", author: "Trần Thùy Mai", reader: "Minh Nguyệt", description: "Một chuyện tình tay ba nhưng ấm áp, người đọc thấy thông cảm, thấu hiểu và sẻ chia được với những nhân vật trong truyện." },
	{ title: "Anh thanh niên cắt tóc", file: "anh thanh nien cat toc", author: "Trí Hiếu", reader: "NSƯT Kim Cúc", description: "" },
	{ title: "Chàng trai xứ Phù Tang", file: "chang trai xu phu tang", author: "Nguyễn Quốc Trung", reader: "Hải Yến", description: "" },
	{ title: "Con chồn lửa", file: "con chon lua", author: "Chu Cảnh Tiêu (Phạm Tú Châu dịch)", reader: "Vân Anh", description: "" },
	{ title: "Con trắm đen", file: "con tram den", author: "Trần Trung Chính", reader: "NSƯT Hoàng Yến", description: "Sự bù trừ của tạo hóa dành cho những người khiếm thị khi ba giác quan thính giác, xúc giác và khứu giác luôn được đẩy tới cực điểm." },
	{ title: "Dưới tầng sâu", file: "duoi tang sau", author: "Ma Văn Kháng", reader: "NSƯT Hoàng Yến", description: "Truyện viết về những người thợ địa chất quanh năm suốt tháng gắn bó với công trường, với những mũi khoan sâu trong lòng đất từ đó hiện rõ phẩm chất của người lao động." },
	{ title: "Kẻ thua cuộc", file: "ke thua cuoc", author: "Nguyễn Thị Hòa", reader: "Minh Nguyệt", description: "Chuyện về những người nông dân lên thành phố lập nghiệp, có niềm vui và cả những nỗi buồn chua chát về hành trình tìm kiếm một cuộc sống sung túc hơn." },
	{ title: "Lá chao đỏ", file: "la chao do", author: "Nguyễn Phú", reader: "NSƯT Kim Cúc", description: "Nỗi niềm của người sắp chết giãi bày cũng là lý giải nguyên nhân tan vỡ mối tình của đôi uyên ương năm xưa." },
	{ title: "Nghe lỏm chuyện ba nhà sư ngồi bên chùa Đồng", file: "nghe lom chuyen ba nha su ngoi ben chua dong", author: "Nguyễn Trọng Văn", reader: "NSƯT Kim Cúc", description: "" },
	{ title: "Người duy nhất", file: "nguoi duy nhat", author: "Dạ Ngân", reader: "Vân Anh", description: "" },
	{ title: "Phật ở Kyong-Ju", file: "phat o kyong-ju", author: "Trần Thuỷ Mai", reader: "NS Hải Yến", description: "" },
	{ title: "Sói biển", file: "soi bien", author: "Nguyễn Ngọc Phú", reader: "NS Hùng Sơn", description: "Số phận của người dân ven biển miền Trung làm nghề đi biển thật mong manh, những đứa trẻ lớn lên tự phát với cuộc sống đầy bản năng…" },
	{ title: "Tiếng mèo đêm giao thừa", file: "tieng meo dem giao thua", author: "Huỳnh Thạch Thảo", reader: "NS Vân Anh", description: "Cái lốp xe nổ là nguyên cớ để người kể truyện đưa về với nhân vật Hạnh- một sát thủ của loài mèo đã rửa tay gác kiếm sau những sự quả báo kinh hoàng…" },
	{ title: "Tình địch", file: "tinh dich", author: "Nguyễn Siêu Việt", reader: "NSƯT Hoàng Yến", description: "" },
	{ title: "Triết lý Barie", file: "triet ly barie", author: "Phạm Quang Đẩu", reader: "NS. Hùng Sơn", description: "Người đàn ông sau hôn nhân tìm kiến sự vui vẻ không ràng buộc, người đàn bà lại cần có người chia sẻ, nương tựa vững chắc tin cậy…" },
	{ title: "Bàn tay khỉ", file: "ban tay khi", author: "W.W. Jacobs", reader: "NA", description: "" },
	{ title: "Chiếc rương oan nghiệt", file: "chiec ruong oan nghiet", author: "Agatha Christie", reader: "NA", description: "" },
	{ title: "Cõi người dâu bể", file: "coi nguoi dau be", author: "Nguyễn Hương Duyên", reader: "NSƯT Kim Cúc", description: "Truyện là sự chứng nghiệm cho tình yêu thương giữa cha mẹ và con cái bao giờ cũng bắt nguồn từ những điều gần gũi thân thuộc nhất." },
	{ title: "Gió bấc qua đồng", file: "gio bac qua dong", author: "Hồ Kiên Giang", reader: "NS Hải Yến", description: "Truyện đan xen hiện tại và quá khứ với những tình tiết sâu lắng và cảm động của hai chị em mồ côi lớn lên vùng sông nước." },
	{ title: "Đêm không trăng", file: "dem khong trang", author: "Thu Loan", reader: "NSƯT Hoàng Yến", description: "Truyện khai thác đề tài Tây Nguyên với những lễ hội truyền thống dần bị thay đổi bởi lối sống hiện đại đang len dần vào từng bản làng." },
	{ title: "Người coi trạm", file: "nguoi coi tram", author: "A. Puskin", reader: "NA", description: "Nhân vật người coi trạm ở truyện ngắn này điển hình cho mô típ nhân vật 'con người bé nhỏ' của văn học Nga thế kỉ 19, mà A.Puskin là một trong những nhà văn thuộc giới quý tộc đi tiên phong khai phá mảnh đất hiện thực, lấy hiện thực làm chất liệu quý giá thay thế cho mảng màu phù phiếm sa-lon. Xam-xôn Vư-rin không chỉ mang nỗi bất hạnh của người ở dưới đáy xã hội. Ở bác còn là bi kịch người cha bị ruồng bỏ. Nỗi khổ tâm, niềm day dứt này theo nhân vật cả khi đã tan vào lòng đất." },
	{ title: "Cuối đông", file: "cuoi dong", author: "Huệ Minh", reader: "Vân Anh", description: "Hạnh phúc luôn là lỗi trăn trở và đau đáu của người phụ nữ trong cuộc sống này, nói như thế không có nghĩa đàn ông không khát khao hạnh phúc chỉ bởi lẽ nói như thế này liệu có võ đoán không trong khi đàn bà có thể sẵn lòng hy sinh tất cả để có được tình yêu có lẽ đàn ông không thế..." }
	/*{ title: "", file: "", author: "", reader: "", description: "" }*/
];

var player = document.getElementById("html5Player");
var avatar = document.getElementById("avatar");
var titleDiv = document.getElementById("titleDiv");
var authorSpan = document.getElementById("authorSpan");
var readerSpan = document.getElementById("readerSpan");
var descriptionDiv = document.getElementById("descriptionDiv");

function tctSupportLocalStorage() {
	return (typeof(Storage) !== "undefined");
}

function checkImage(src) {
	var img = new Image();
	img.onload = function() {
		avatar.src = src;
	};
	img.onerror = function() {
		avatar.src = "cttd.jpg";
	};
	img.src = src; // fires off loading of image
}

function playFile(file) {
	player.src = file;
	player.play();
}

function readStory(index) {
	if (tctSupportLocalStorage()) {
		localStorage.index = index;
	}
	var e = playlist[index];
	titleDiv.innerHTML = e.title;
	authorSpan.innerHTML = e.author;
	readerSpan.innerHTML = e.reader;
	descriptionDiv.innerHTML = e.description;
	checkImage("data/" + e.file + ".jpg");
	playFile('data/' + e.file + '.mp3');
}

function init() {
	var listHtmlCode = "";
	for (var i = 0; i < playlist.length; i++) {
		listHtmlCode += "<p><a href='' onclick='readStory(" + i + "); return false;'>+ " + playlist[i].title + "</a></p>";
	}
	document.getElementById("listDiv").innerHTML = listHtmlCode;

	if (tctSupportLocalStorage() && localStorage.index != undefined && localStorage.index < playlist.length) {
		readStory(localStorage.index);
	} else {
		readStory(0);
	}
}

init();
