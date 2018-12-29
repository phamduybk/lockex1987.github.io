/*
 * NVH
 */
package download.service.album;

/**
 * Download from truyenhay24h.com.
 *
 * @author huyennv1
 */
public class DownloadTruyenhay24h extends BaseAlbumDownloader {

	public DownloadTruyenhay24h(int pid, int chapter, String cc) throws Exception {
		this.url = "http://truyenhay24h.com/TH24Service.asmx/GetChapterImages?PID=" + pid + "&ChapNumber=" + chapter + "&cc=" + cc;
		this.chapter = chapter;
		super.process();
	}

	@Override
	protected String filterImage(String s) {
		if (s.startsWith("<string>")) {
			s = s.replace("<string>", "").replace("</string>", "");
			return s;
		} else {
			return null;
		}
	}
	
	private static void testDownloadTruyenhay24h() throws Exception {
		int start = 72;
		int end = 100;
		// http://truyenhay24h.com/333/y-thien-do-long-ky-chuong-100.html
		int pid = 333;
		String cc = "8cb59ecdd4655d1d1eb8309d24a21aa2";
		// http://truyenhay24h.com/phong-van.html
		// int pid = 189;
		// String cc = "9a4bea16eb042661bdc08ea2bd4c5767";
		// http://truyenhay24h.com/phong-van-%28fanmade%29.html
		// int pid = 2704;
		// String cc = "046a7c18d2df20e22424210a6d49aba2";
		for (int i = start; i <= end; i++) {
			System.out.println(i + ". ----------------------------------------");
			new DownloadTruyenhay24h(pid, i, cc);
		}
	}
}
