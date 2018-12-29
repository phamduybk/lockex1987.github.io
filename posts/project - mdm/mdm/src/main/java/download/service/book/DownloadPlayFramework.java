package download.service.book;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import common.util.CommonUtils;

/**
 * Download Play Framework tutorials.
 *
 * @author lockex1987
 */
public class DownloadPlayFramework extends BaseBookDownloader {

	public DownloadPlayFramework(String[] urls, String title) throws Exception {
		download("http://www.playframework.com/", urls, title);
	}

	@Override
	protected String filterContent(Document doc, String baseUrl, String url, int index) throws Exception {
		Element article = doc.getElementsByTag("article").first();
		CommonUtils.changeImages(article, "", url, baseUrl);
		String content = article.html(); // Remove last child?
		return content;
	}

	public static void main(String[] args) throws Exception {
		String[] urls = new String[] {
				"https://www.playframework.com/documentation/2.5.x/GzipEncoding",
				"https://www.playframework.com/documentation/2.5.x/SecurityHeaders",
				"https://www.playframework.com/documentation/2.5.x/CorsFilter",
				"https://www.playframework.com/documentation/2.5.x/AllowedHostsFilter",
				"https://www.playframework.com/documentation/2.5.x/Developing-with-the-H2-Database",
				"https://www.playframework.com/documentation/2.5.x/Evolutions",
				"https://www.playframework.com/documentation/2.5.x/Deploying",
				"https://www.playframework.com/documentation/2.5.x/ProductionConfiguration",
				"https://www.playframework.com/documentation/2.5.x/HTTPServer",
				"https://www.playframework.com/documentation/2.5.x/ConfiguringHttps",
				"https://www.playframework.com/documentation/2.5.x/DeployingCloud"
		};
		new DownloadPlayFramework(urls, "Play Framework tutorial");
	}
}
