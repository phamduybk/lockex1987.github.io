package io.cttd;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class IndexFile {

	private String title = "";
	private String description = "";

	/**
	 * Lấy tiêu đề và mô tả về bài viết.
	 * 
	 * @param indexFilePath Đường dẫn đến file index.html
	 * @return Mảng [tiêu đề, mô tả]
	 */
	public IndexFile(String indexFilePath) {
		File htmlFile = new File(indexFilePath);

		// Nếu file không tồn tại
		if (!htmlFile.exists()) {
			System.out.println("File không tồn tại: " + indexFilePath);
			
			// Nếu không có file index.html thì tự thêm file index luôn, về sau chỉ việc sửa
			CreateDefaultIndexFile.createFile(htmlFile);
			return;
		}

		try {
			Document doc = Jsoup.parse(htmlFile, "UTF-8");
			this.title = doc.title();

			Elements elements = doc.select("meta[name=description]");
			this.description = (elements.size() > 0) ? elements.get(0).attr("content") : null;

			elements = doc.select("meta[name=keywords]");
			String keywords = (elements.size() > 0) ? elements.get(0).attr("content") : null;

			// System.out.println(description);
			// System.out.println(keywords);

			if (this.description == null) {
				this.description = keywords;
			} else {
				// Nếu mô tả giống tiêu đề
				if (this.description.equals(this.title)) {
					this.description = keywords;
				} else {
					if (keywords != null) {
						this.description += ". " + keywords;
					}
				}
			}

			if (this.description == null) {
				this.description = "";
			}
		} catch (IOException e) {
			e.printStackTrace();
			return;
		}
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}
}
