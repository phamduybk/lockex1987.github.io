package download.service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import common.util.HtmlCleaner;

public class CleanTamquocdiennghia {

	// Đường dẫn thư mục chứa các file
	private static final String ROOT_PATH = "/media/locke/data/literature/la quan trung - tam quoc dien nghia/part 1/";

	/**
	 * Clean nội dung file
	 * @param filePath Đường dẫn file
	 * @return Xâu nội dung đã được clean
	 */
	private String clean(String filePath) throws Exception {
		File file = new File(filePath);
		Document doc = Jsoup.parse(file, "UTF-8");
		HtmlCleaner htmlCleaner = new HtmlCleaner();
		String content = (htmlCleaner.filterTextImageLink(doc.body()));
		content = content.replace("<p>Tam Quốc Diễn Nghĩa</p>", "");
		content = content.replace("<p>Nguyên tác : La Quán Trung</p>", "");
		content = content.replace("<p>Dịch giả : Phan Kế Bính</p>", "");
		content = content.replace("<br><br></p>", "");
		content = content.replace("<br></p>", "");
		content = content.replace("<p><br><br>", "");
		content = content.replace("<p><br>", "");
		return content;
	}

	/**
	 * Xử lý một chương.
	 * @param number Chỉ số chương
	 */
	public void process(int number) throws Exception {
		// Thêm các chữ số 0 ở đầu
		String fileName = String.valueOf(number + 1000).substring(1);
		
		// Tên file đầu vào
		String filePath = ROOT_PATH + fileName + ".html";
		
		// Clean nội dung file đầu vào
		String content = clean(filePath);
		
		// Ghi ra file mới
		writeFile("new-" + fileName, "Hồi " + number, content);
	}

	/**
	 * Ghi file mới.
	 * @param file Tên file
	 * @param title Tiêu đề
	 * @param content Nội dung
	 */
	private void writeFile(String file, String title, String content) throws IOException {
		PrintWriter pw = new PrintWriter(new FileWriter(ROOT_PATH + file + ".html", false));
		pw.append("<!DOCTYPE html>\n"
				+ "<html>\n"
				+ "<head>\n"
				+ "  <title>" + title + "</title>\n"
				+ "  <meta charset='UTF-8'/>\n"
				+ "  <link href='css/style.css' rel='stylesheet'/>\n" + "</head>\n"
				+ "<body>\n"
				+ "  <article>\n"
				+ content
				+ "  </article>\n"
				+ "</body>\n"
				+ "</html>\n");
		pw.close();
	}
}
