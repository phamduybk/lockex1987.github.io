/*
 * NVH
 */
package download.service.book;

import common.util.Constants;
import common.util.Downloader;
import java.util.ArrayList;
import java.util.List;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Get short fun stories from website vnexpress.net. http://vnexpress.net/tin-tuc/cuoi/tieu-pham
 *
 * @author huyennv1
 */
public class DownloadShortFunStoryVnexpress extends BaseBookDownloader {

	public DownloadShortFunStoryVnexpress(String[] urls, int offset) throws Exception {
		download("http://vnexpress.net/", urls, "Tiểu phẩm", offset);
	}

	@Override
	protected String filterContent(Document doc, String baseUrl, String url, int index) throws Exception {
		// Get data
		Element div = doc.getElementsByClass("block_col_480").get(0);
		String title = div.getElementsByClass("title_news").get(0).text();
		String intro = div.getElementsByClass("short_intro").get(0).text();
		String author = div.getElementsByClass("author").get(0).text();
		String image = div.getElementsByClass("tplCaption").get(0).getElementsByTag("img").attr("src");
		Element fck = div.getElementsByClass("fck_detail").get(0);
		// Elements contents = div.getElementsByClass("Normal");
		Elements contents = fck.children();
		List<String> list = new ArrayList<>(contents.size());
		for (Element e : contents) {
			if (e.classNames().contains("Normal")) {
				list.add(e.text());
			}
		}

		String file = "images/" + index + "." + getExtension(image);
		// Download image
		Downloader.downloadFile(image, Constants.OUTPUT_FOLDER + file);

		StringBuilder content = new StringBuilder();
		content.append("<h3>" + title + "</h3>");
		content.append("<img src='" + file + "'/>");
		content.append("<p>" + intro + "</p>");
		for (String s : list) {
			content.append("<p>" + s + "</p>");
		}
		return content.toString();
	}

	public static String getExtension(String url) {
		String file = Downloader.extractFile(url);
		int idx = file.lastIndexOf(".");
		String ext = file.substring(idx + 1);
		return ext;
	}

	public static void main(String[] args) throws Exception {
		String[] urls = {
				"http://vnexpress.net/tin-tuc/cuoi/tieu-pham/buon-vi-hoan-thanh-mot-nua-uoc-mo-3366713.html"
		};
		int offset = 6;
		new DownloadShortFunStoryVnexpress(urls, offset);
	}
}
