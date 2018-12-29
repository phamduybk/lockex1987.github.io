package download.service.book;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import common.util.CommonUtils;
import common.util.Downloader;

/**
 * Download funny Git tutorial.
 */
public class DownloadSaruGitTutorial extends BaseBookDownloader {

	public DownloadSaruGitTutorial() throws Exception {
		String[] urls = getUrls("http://backlogtool.com/git-guide/en/intro/intro1_1.html");
		download("http://backlogtool.com/", urls, "Git Beginner's Guide for dummies");
	}

	private String[] getUrls(String entryUrl) throws Exception {
		int idx = entryUrl.lastIndexOf("/");
		String relativeUrl = entryUrl.substring(0, idx);

		List<String> urlList = new ArrayList<>();
		Document doc = Downloader.jsoup(entryUrl);
		Elements a = doc.select("#introSideMenu a");
		for (Element e : a) {
			urlList.add(relativeUrl + e.attr("href").substring(1));
		}
		return urlList.toArray(new String[urlList.size()]);
	}

	@Override
	protected String filterContent(Document doc, String baseUrl, String url, int index) throws Exception {
		Elements a = doc.select("article.Post .Entry-content");
		Element div = null;
		if (a.size() == 1) {
			div = a.first();
		} else {
			for (Element e : a) {
				if (e.id().equals("console")) {
					div = e;
					break;
				}
			}
		}
		CommonUtils.changeImages(div, index + "-", url, baseUrl);
		return div.outerHtml();
	}

	public static void main(String[] args) throws Exception {
		new DownloadSaruGitTutorial();
	}
}
