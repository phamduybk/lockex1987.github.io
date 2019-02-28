package download.service.album;

import org.junit.Test;

public class DownloadComicvnTests {

	@Test
	public void downloadTest() throws Exception {
		setupProxy();

		for (int chapter = 1; chapter <= 1; chapter++) {
			new DownloadComicvn("https://comicvn.net/truyen-tranh-online/tay-du/chapter-1-rong-va-soi-237727", chapter);
		}
	}
	
	private void setupProxy() {
		String proxyHost = "10.240.152.56";
		String proxyPort = "3128";
		System.setProperty("http.proxyHost", proxyHost);
        System.setProperty("http.proxyPort", proxyPort);
        System.setProperty("https.proxyHost", proxyHost);
        System.setProperty("https.proxyPort", proxyPort);
	}
}
