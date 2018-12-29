package download.service.album;

/**
 * Download from URL list of images
 */
public class DownloadImageList extends BaseAlbumDownloader {

	private String input;

	public DownloadImageList(String input) throws Exception {
		this.input = input;
		this.chapter = 8080;
		this.chapterPrefix = false;
		super.process();
	}

	@Override
	protected void getImageList() throws Exception {
		String[] a = input.split("\n");
		for (String s : a) {
			s = s.trim();
			if (!s.isEmpty()) {
				list.add(s);
			}
		}
	}
}
