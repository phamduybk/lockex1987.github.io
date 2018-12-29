package download.service;

import common.util.Downloader;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

/**
 *
 * @author lockex1987
 */
public class DownloadVnexpressQuiz {

	public DownloadVnexpressQuiz(String url, int id) throws Exception {
		Document doc = Downloader.jsoup(url);
		Element div = doc.getElementsByClass("fck_detail").first();
		String img = div.getElementsByTag("img").first().attr("src");
		String q = div.getElementsByClass("Normal").get(0).text().trim();
		String a = div.getElementsByTag("em").first().text().trim();

		//System.out.println(img);
		System.out.println("{ id: " + id + ", q: '" + q + "', a: '" + a + "' },");
		Downloader.downloadFile(img, id + ".jpg");
	}
	
	private static void testDownloadVnexpressQuiz() throws Exception {
		String s = "http://vnexpress.net/tin-tuc/cuoi/thu-gi-cua-ban-ma-chi-co-nguoi-khac-dung-3347554-p";
		int id = 26;
		for (int i = 2; i <= 6; i++) {
			new DownloadVnexpressQuiz(s + i + ".html", id);
			id++;
		}
	}
}
