package download.service.album;

import common.util.Downloader;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class DownloadTruyentranhphapbi extends BaseAlbumDownloader {

	public DownloadTruyentranhphapbi(String url, int chapter) throws Exception {
		this.url = url;
		this.chapter = chapter;
		this.chapterPrefix = false;
		super.process();
	}

	@Override
	protected void getImageList() throws Exception {
		Document doc = Downloader.jsoup(url);
		Elements links = doc.select(".separator a");
		for (Element a : links) {
			list.add(a.attr("href"));
		}
	}
}
