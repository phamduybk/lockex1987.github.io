package download.service.article;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import common.util.CommonUtils;
import common.util.HtmlCleaner;

public class DownloadVnexpressArticle extends BaseArticleDownloader {

	public DownloadVnexpressArticle(String url) throws Exception {
		download(url);
	}

	@Override
	protected String filterContent(Document doc, String url) throws Exception {
		StringBuilder content = new StringBuilder();

		String title = doc.select(".title_news").first().text();
		String shortIntro = doc.select(".short_intro").first().text();

		content.append("<h3>" + title + "</h3>");
		content.append("<p class='shortIntro'>" + shortIntro + "</p>");
		
		Element article = doc.select("#article_content").first();
		
		CommonUtils.changeImages(article, "", url, "http://vnexpress.net/", "");
		
		HtmlCleaner htmlCleaner = new HtmlCleaner();
		content.append(htmlCleaner.filterTextImageLink(article));

		return content.toString();
	}

	public static void main(String[] args) throws Exception {
		new DownloadVnexpressArticle(
				"http://giadinh.vnexpress.net/photo/khong-gian-song/khong-gian-bat-ngo-ben-trong-tup-leu-kieu-nhat-3436983.html");
	}
}
