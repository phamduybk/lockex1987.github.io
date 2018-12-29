package download.service;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import common.util.Constants;
import common.util.Downloader;

public class DownloadComicvineCover {
	
	private static void testDownloadCoverComicvine() throws Exception {
		// http://comicvine.gamespot.com/weekly-shonen-jump/4050-67887/?page=3
		DownloadComicvineCover obj = new DownloadComicvineCover();
		String url = null; //prop.getProperty(KEY_URL);
		int fp = 1; //Integer.parseInt(prop.getProperty(KEY_FROM));
		int tp = 2; //Integer.parseInt(prop.getProperty(KEY_TO));
		for (int page = fp; page <= tp; page++) {
			System.out.println(page + ". -------------------------------------------");
			obj.downloadCoverComicvine(url, page);
		}
	}

	public void downloadCoverComicvine(String url, int page) throws Exception {
		Document doc = Downloader.jsoup(url + "?page=" + page);
		Element div = doc.getElementsByClass("issue-grid").first();

		// Get images
		Elements a = div.getElementsByTag("img");
		int size = a.size();
		String[] src = new String[size];
		int[] issue = new int[size];
		for (int i = 0; i < size; i++) {
			Element e = a.get(i);
			src[i] = e.attr("src").replace("scale_small", "scale_large");
		}

		// Get issue numbers
		a = div.getElementsByClass("issue-number");
		for (int i = 0; i < size; i++) {
			Element e = a.get(i);
			issue[i] = extractIssueNumber(e.text());
		}

		// Download
		for (int i = 0; i < size; i++) {
			Downloader.downloadFile(src[i], Constants.OUTPUT_FOLDER + issue[i] + ".jpg");
		}
	}
	
	private int extractIssueNumber(String text) {
		char[] a = text.toCharArray();
		int i = a.length - 1;
		while ('0' <= a[i] && a[i] <= '9' && 0 <= i) {
			i--;
		}
		if (i < 0) {
			return -1;
		} else {
			return Integer.parseInt(text.substring(i + 1));
		}
	}
}
