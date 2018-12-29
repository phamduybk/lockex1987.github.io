package download.service.album;

import org.junit.Test;

public class DownloadTruyentranhphapbiTests {

	@Test
	public void downloadTest() throws Exception {
		new DownloadTruyentranhphapbi(
				"http://www.truyentranhphapbi.com/2013/05/johan-va-biet-luyt-lieu-thuoc-oc-hai.html", 13);
	}
}
