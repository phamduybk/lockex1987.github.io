package io.cttd;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class IndexFile {

	private String title = "";
	private String description = "";
	private boolean existsIndexFile = true;
	private String indexFilePath;
	private File indexFileObject;
	private Document doc;
	// Có cần ghi lại hay không
	// Thiếu thẻ meta viewport, thiếu favicon, thiếu thẻ article, thiếu style chung, thiếu script chung
	private boolean needRewrite = false;

	/**
	 * Lấy tiêu đề và mô tả về bài viết.
	 * 
	 * @param indexFilePath Đường dẫn đến file index.html
	 * @return Mảng [tiêu đề, mô tả]
	 */
	public IndexFile(String indexFilePath) {
		this.indexFilePath = indexFilePath;
		indexFileObject = new File(indexFilePath);

		// Nếu file không tồn tại
		if (!indexFileObject.exists()) {
			System.out.println("File không tồn tại: " + indexFilePath);

			this.existsIndexFile = false;
			this.createDefaultIndexFile();
			return;
		}

		try {
			this.doc = Jsoup.parse(indexFileObject, "UTF-8");
		} catch (IOException e) {
			e.printStackTrace();
			return;
		}

		this.title = doc.title();
		this.description = this.getDescriptionFromDoc();
		String keywords = this.getKeywordsFromDoc();
		this.normalizeDescription(keywords);

		this.checkDescription();
		this.checkMetaViewport();
		this.checkFavicon();
		/*
		this.checkCommonStyle();
		this.checkArticleTag();
		this.checkCommonScript();
		*/

		if (this.needRewrite) {
			this.rewrite();
		}
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	// Nếu không có file index.html thì tự thêm file index luôn, về sau chỉ việc sửa
	public void createDefaultIndexFile() {
		File source = new File("template/index.html");
		try {
			Files.copy(source.toPath(), indexFileObject.toPath());
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

	public boolean existsIndexFile() {
		return existsIndexFile;
	}

	private String getDescriptionFromDoc() {
		Elements elements = doc.select("meta[name=description]");
		String description = (elements.size() > 0) ? elements.get(0).attr("content") : null;
		return description;
	}

	private String getKeywordsFromDoc() {
		Elements elements = doc.select("meta[name=keywords]");
		String keywords = (elements.size() > 0) ? elements.get(0).attr("content") : null;
		return keywords;
	}

	private void normalizeDescription(String keywords) {
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
	}
	
	private void checkDescription() {
		Elements elements = doc.select("meta[name=description]");
		String description = (elements.size() > 0) ? elements.get(0).attr("content") : null;
		if (description == null) {
			System.out.println("Thiếu description " + indexFilePath);
			doc.head().append("<meta name=\"description\" content=\"" + this.title + "\">");
			this.needRewrite = true;
		}
	}

	public void checkMetaViewport() {
		Elements elements = doc.select("meta[name=viewport]");
		String viewport = (elements.size() > 0) ? elements.get(0).attr("content") : null;
		if (viewport == null) {
			System.out.println("Thiếu viewport " + indexFilePath);
			doc.head().append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
			this.needRewrite = true;
		} else {
			//System.out.println("viewport: " + viewport);
		}
	}

	public void checkFavicon() {
		Elements elements = doc.select("link[rel=icon]");
		String favicon = (elements.size() > 0) ? elements.get(0).attr("href") : null;
		if (favicon == null) {
			System.out.println("Thiếu favicon " + indexFilePath);
			doc.head().append("<link rel=\"icon\" href=\"../../images/favicon.png\">");
			this.needRewrite = true;
		} else {
			//System.out.println("favicon: " + favicon);
		}
	}

	public void checkCommonStyle() {
		Elements elements = doc.select("link[href=../../css/style.css]");
		String styleFile = (elements.size() > 0) ? elements.get(0).attr("href") : null;
		if (styleFile == null) {
			System.out.println("Thiếu file style chung " + indexFilePath);
			doc.head().append("<link rel=\"stylesheet\" href=\"../../css/style.css\">");
			this.needRewrite = true;
		} else {
			//System.out.println("File style chung: " + styleFile);
		}
	}

	public void checkArticleTag() {
		Elements elements = doc.select("article");
		if (elements.size() == 0) {
			System.out.println("Cần thêm thẻ article");
			Element body = doc.body();
			body.html("<article>" + body.html() + "</article>");
			this.needRewrite = true;
		}
	}

	public void checkCommonScript() {
		Elements elements = doc.select("script[src=../../js/docs.js]");
		String scriptFile = (elements.size() > 0) ? elements.get(0).attr("src") : null;
		if (scriptFile == null) {
			System.out.println("Thiếu file script chung " + indexFilePath);
			doc.body().append("<script src=\"../../js/docs.js\"></script>");
			this.needRewrite = true;
		} else {
			//System.out.println("File script chung: " + scriptFile);
		}
	}

	private void rewrite() {
		System.out.println("Ghi lại file");
		String htmlCode = doc.outerHtml();

		try {
			Files.write(Paths.get(this.indexFilePath), htmlCode.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
