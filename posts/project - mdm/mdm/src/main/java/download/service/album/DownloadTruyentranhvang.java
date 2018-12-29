package download.service.album;

import common.util.Downloader;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 *
 * @author lockex1987
 */
public class DownloadTruyentranhvang extends BaseAlbumDownloader {

	private static final String BASE = "http://truyentranhvang.net/";

	public DownloadTruyentranhvang(String url, int chapter) throws Exception {
		this.url = BASE + url;
		this.chapter = chapter;
		this.chapterPrefix = false;
		super.process();
	}

	@Override
	protected void getImageList() throws Exception {
		Document doc = Downloader.jsoup(url);
		Element div = doc.getElementById("slides");
		Elements a = div.getElementsByTag("img");
		for (Element e : a) {
			list.add(BASE + e.attr("src"));
		}
	}
}
