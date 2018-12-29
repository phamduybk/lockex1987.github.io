package download.service.album;

import common.util.Downloader;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * http://thuongmaitruongxua.vn/truyen-tranh/phong-than-32-tap/doc-truyen/tap-1.html
 */
public class DownloadThuongmaitruongxua extends BaseAlbumDownloader {

	public DownloadThuongmaitruongxua(String url, int chapter) throws Exception {
		this.url = url;
		this.chapter = chapter;
		this.chapterPrefix = false;
		super.process();
	}

	@Override
	protected void getImageList() throws Exception {
		Document doc = Downloader.jsoup(url);
		Elements a = doc.select(".bb-item img");
		for (Element e : a) {
			list.add("http://thuongmaitruongxua.vn" + e.attr("src"));
		}
	}
}
