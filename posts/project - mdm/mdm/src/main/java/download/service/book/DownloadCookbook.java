/*
 * NVH
 */
package download.service.book;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

/**
 * Download JSoup cookbook. Read content tag.
 */
public class DownloadCookbook extends BaseBookDownloader {

	public DownloadCookbook(String[] urls, String title) throws Exception {
		download("http://jsoup.org/", urls, title);
	}

	@Override
	protected String filterContent(Document doc, String baseUrl, String url, int index) throws Exception {
		Element content = doc.getElementsByClass("col1").first();
		return content.html();
	}

	public static void main(String[] args) throws Exception {
		String[] urls = {
				"http://jsoup.org/cookbook/introduction/parsing-a-document",
				"http://jsoup.org/cookbook/input/parse-document-from-string",
				"http://jsoup.org/cookbook/input/parse-body-fragment",
				"http://jsoup.org/cookbook/input/load-document-from-url",
				"http://jsoup.org/cookbook/input/load-document-from-file",
				"http://jsoup.org/cookbook/extracting-data/dom-navigation",
				"http://jsoup.org/cookbook/extracting-data/selector-syntax",
				"http://jsoup.org/cookbook/extracting-data/attributes-text-html",
				"http://jsoup.org/cookbook/extracting-data/working-with-urls",
				"http://jsoup.org/cookbook/extracting-data/example-list-links",
				"http://jsoup.org/cookbook/modifying-data/set-attributes",
				"http://jsoup.org/cookbook/modifying-data/set-html",
				"http://jsoup.org/cookbook/modifying-data/set-text",
				"http://jsoup.org/cookbook/cleaning-html/whitelist-sanitizer"
		};
		new DownloadCookbook(urls, "Jsoup Cookbook");
	}
}
