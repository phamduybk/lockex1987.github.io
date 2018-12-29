package download.service.album;

import org.junit.Test;

public class DownloadThuongmaitruongxuaTests {

	@Test
	public void downloadTest() throws Exception {
		for (int chapter = 1; chapter <= 2; chapter++) {
			//new DownloadThuongmaitruongxua("http://thuongmaitruongxua.vn/truyen-tranh/phong-than-32-tap/doc-truyen/tap-" + chapter + ".html", chapter);
			new DownloadThuongmaitruongxua("http://thuongmaitruongxua.vn/truyen-tranh/bac-ba-phi-2-tap-1998/doc-truyen/tap-" + chapter + ".html", chapter);
		}
	}
}
