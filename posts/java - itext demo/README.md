Giới thiệu iText:
	First release: 2000
	iText 1: 2003
	iText 2: 2007
	iText 5: 2009, upgrade to Java 5
	iText 7: 2016, upgrade to Java 7 (pdfHTML phải có license)

Khởi tạo:
	Sử dụng iText 5, iText7 pdfHTML là add-on cần có license.
	
	
	iText cơ bản cần dependency sau:
		<!-- https://mvnrepository.com/artifact/com.itextpdf/itextpdf -->
		<dependency>
			<groupId>com.itextpdf</groupId>
			<artifactId>itextpdf</artifactId>
			<version>5.5.12</version>
		</dependency>

	Để sử dụng tính năng HTML sang PDF thì thêm dependency sau:
		<!-- https://mvnrepository.com/artifact/com.itextpdf.tool/xmlworker -->
		<dependency>
			<groupId>com.itextpdf.tool</groupId>
			<artifactId>xmlworker</artifactId>
			<version>5.5.12</version>
		</dependency>
		
Template:
	// Khởi tạo đối tượng OutputStream, có thể là file hoặc resp.getOutputStream()
	String output = "...";
	OutputStream os = new FileOutputStream(output);
	
	Document document = new Document();
	PdfWriter writer = PdfWriter.getInstance(document, os);
	document.open();
	
	// Thêm nội dung vào file
	...
	
	document.close();

HTML -> PDF
	// Parses an HTML string and a string containing CSS into a list of Element objects
	ElementList list = XMLWorkerHelper.parseToElementList(html, null);
	for (Element e : list) {
		document.add(e);
	}

	// Parses XHTML file
	XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input));

	Chú ý: file nguồn phải là XHTML, nghĩa là cấu trúc phải chặt chẽ (có đóng tag,...)

Lỗi tiếng Việt:
	Phải thêm font
	
	
Insert header and footer
	xxx

Tham khảo
	http://tutorials.jenkov.com/java-itext/anchor.html
	https://developers.itextpdf.com/examples-itext7
	https://developers.itextpdf.com/examples-itext5
	https://developers.itextpdf.com/content/itext-5-examples/itext-action-second-edition
	(pdfHTML, converting HTML to PDF with iText 7)[https://www.youtube.com/watch?v=eh20RB825zE]
