package download.service.book;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import common.util.CommonUtils;
import common.util.Downloader;

/**
 * Download WordPress tutorial.
 *
 * @author lockex1987
 */
public class DownloadThachpham extends BaseBookDownloader {

	public DownloadThachpham(int pageNum, String url, String serieTitle) throws Exception {
		String[] urls = getUrls(pageNum, url);
		for (String s : urls) {
			System.out.println(s);
		}
		download("http://thachpham.com/", urls, serieTitle);
	}

	private String[] getUrls(int pageNum, String url) throws Exception {
		List<String> urlList = new ArrayList<>();
		for (int page = 1; page <= pageNum; page++) {
			System.out.println(url + page);
			Document doc = Downloader.jsoup(url + page);
			Elements a = doc.select(".item-content h2 a");
			for (Element aTag : a) {
				urlList.add(aTag.attr("href"));
			}
		}
		return urlList.toArray(new String[urlList.size()]);
	}

	@Override
	protected String filterContent(Document doc, String baseUrl, String url, int index) throws Exception {
		Element div = doc.getElementsByClass("post").first();
		CommonUtils.changeImages(div, index + "-", url, baseUrl);

		// Get content
		StringBuilder content = new StringBuilder();
		Elements children = div.children();
		for (Element e : children) {
			String cl = e.className();
			if (cl.equals("serie-list")) {
				break;
			} else if (!cl.equals("seriesmeta") && !cl.contains("arve-wrapper")) {
				String text = e.text().trim();
				boolean empty = text.isEmpty() && e.getElementsByTag("img").isEmpty();
				if (!empty) {
					boolean nbsp = text.length() == 1 && ((int) text.charAt(0)) == 160;
					if (!nbsp) {
						content.append(e.outerHtml());
					}
				}
			}
		}
		return content.toString();
	}

	public static void main(String[] args) throws Exception {
		new DownloadThachpham(2, "http://thachpham.com/series/git-co-ban/page/", "Học Git cơ bản");
	}
}
