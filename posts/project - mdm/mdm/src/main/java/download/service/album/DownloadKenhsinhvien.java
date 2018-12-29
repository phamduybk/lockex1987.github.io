package download.service.album;

import common.util.Downloader;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Download 'Detective Conan' from kenhsinhvien.
 */
public class DownloadKenhsinhvien extends BaseAlbumDownloader {

	public DownloadKenhsinhvien(String url, int chapter) throws Exception {
		this.url = url;
		this.chapter = chapter;
		this.chapterPrefix = true;
		super.process();
	}

	@Override
	protected void getImageList() throws Exception {
		Document doc = Downloader.jsoup(url);
		Elements a = doc.getElementsByClass("LbImage");
		for (Element e : a) {
			list.add(e.attr("src"));
		}
	}
}
