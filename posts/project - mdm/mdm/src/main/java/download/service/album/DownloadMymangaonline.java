/*
 * NVH
 */
package download.service.album;

import common.util.Downloader;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Download from mymangaonline.net.
 */
public class DownloadMymangaonline extends BaseAlbumDownloader {

	public DownloadMymangaonline(String url, int chapter) throws Exception {
		this.url = url;
		this.chapter = chapter;
		super.process();
	}

	@Override
	protected void getImageList() throws Exception {
		Document doc = Downloader.jsoup(url);
		Element div = doc.getElementById("divImage");
		Elements imgs = div.getElementsByTag("img");
		for (Element e : imgs) {
			list.add(e.attr("src"));
		}
	}
	
	private static void testDownloadMymangaonline() throws Exception {
		String[] a = new String[] {
				"http://ww3.readonepiece.com/chapter/one-piece-digital-colored-comics-chapter-442/"
		};
		for (int i = 0; i < a.length; i++) {
			new DownloadMymangaonline(a[i], i + 442);
			System.out.println("---------------------------------------------------- " + i);
		}
	}
}
