/*
 * NVH
 */
package download.service.album;

import common.util.Downloader;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Download from http://uptruyen.com/.
 */
public class DownloadUptruyen extends BaseAlbumDownloader {

	public DownloadUptruyen(int chapter, String url) throws Exception {
		this.url = url;
		this.chapter = chapter;
		this.chapterPrefix = false;
		super.process();
	}

	@Override
	protected void getImageList() throws Exception {
		int noOfTry = 1;
		final int MAX_TRY = 3;
		Exception savedException;
		do {
			try {
				getImageListByJsoup();
				savedException = null;
			} catch (Exception ex) {
				System.out.println("Tried " + noOfTry);
				try {
					Thread.sleep(200);
				} catch (InterruptedException interruptedException) {
					// Do nothing
				}
				
				noOfTry++;
				savedException = ex;
			}
		} while (noOfTry <= MAX_TRY && savedException != null);

		// Nếu có exception thì hiẻn thị
		if (savedException != null) {
			//System.out.println(savedException.getMessage());
			savedException.printStackTrace();
		}
	}

	private void getImageListByJsoup() throws Exception {
		//throw new Exception("Huyen tests");
		
		Document doc = Downloader.jsoup(url);
		Elements imgs = doc.select("#reader-box img");
		for (Element e : imgs) {
			String src = e.attr("src");
			if (src.startsWith("http")) {
				list.add(src);
			}
		}
	}
}
