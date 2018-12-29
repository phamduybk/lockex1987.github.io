package download.service.album;

import org.junit.Test;

public class DownloadReadcomiconlineTests {

	@Test
	public void downloadTest() throws Exception {
		int chapterStart = 1;
		String[] a = {
				"http://readcomiconline.to/Comic/Comics-Greatest-World-Vortex-Cinnabar-Flats/Issue-1?id=132975",
				"http://readcomiconline.to/Comic/Comics-Greatest-World-Vortex-Cinnabar-Flats/Issue-2?id=132976",
				"http://readcomiconline.to/Comic/Comics-Greatest-World-Vortex-Cinnabar-Flats/Issue-3?id=132977",
				"http://readcomiconline.to/Comic/Comics-Greatest-World-Vortex-Cinnabar-Flats/Issue-4?id=132978"
		};
		for (int i = 0; i < a.length; i++) {
			String url = a[i];
			int chapter = i + chapterStart;
			new DownloadReadcomiconline(url, chapter);
		}
	}
}
