package download.service.album;

/**
 *
 * @author lockex1987
 */
public class DownloadThichtruyentranh extends BaseAlbumDownloader {


	public DownloadThichtruyentranh(String url, int chapter, int chapterId) throws Exception {
		this.url = url;
		this.chapter = chapter;
		this.chapterPrefix = false;
		super.process();
	}

	@Override
	protected String filterImage(String s) {
		if (s.startsWith("'<img src=\"")) {
			int i = s.indexOf("\"");
			s = s.substring(i + 1);
			i = s.indexOf("\"");
			s = s.substring(0, i);
//			System.out.println(s);
			
		}
		return null;
	}
	
	private static void testDownloadThichtruyentranh() throws Exception {
		String[] a = new String[] {
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-1-1/151797.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-1-2/151798.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-1-3/151799.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-1-4/151800.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-1-5/151801.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-1-6/151802.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-1-7/151803.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-2-1/151804.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-2-2/151805.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-2-3/151806.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-2-4/151807.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-3/151808.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-4/151809.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-5/151810.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-6/151811.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-7/151812.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-8/151813.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-9/151814.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-10/151815.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-11/151816.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-12/151817.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-13/151818.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-14/151819.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-15/151820.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-16/151821.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-17/151822.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-18/151823.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-19/151824.html",
				"http://thichtruyentranh.com/tieu-dau-bep-cung-dinh/tieu-dau-bep-cung-dinh-chap-20/151825.html"
		};
		int chapter = 1;
		int chapterId = 1;
		for (int i = 0; i < a.length; i++) {
			String url = a[i];
			new DownloadThichtruyentranh(url, chapter, chapterId);
			chapter++;
			chapterId++;
			System.out.println("-----------------------------------");
		}
	}
}
