package download.service.album;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

import common.util.Constants;
import common.util.Downloader;
import lombok.extern.slf4j.Slf4j;

/**
 * Skeleton download.
 */
@Slf4j
public class BaseAlbumDownloader {

	private int noOfThreads = 5;
	// private int noOfParts = 1;

	// Chapter URL
	protected String url;
	// Cookie
	protected String cookie;
	// Chapter number
	protected int chapter;
	// Image list
	protected List<String> list = new ArrayList<>();
	// Have chapter in head of the file name (chapter-order.extension)
	protected boolean chapterPrefix = true;
	// File extension
	protected String extension = null;

	/**
	 * Download from one chapter.
	 */
	protected void process() throws Exception {
		tryGetImages();
		downloadImages();
	}
	
	private void tryGetImages() {
		int noOfTry = 1;
		final int MAX_TRY = 1;
		Exception savedException; // java.net.SocketTimeoutException
		do {
			try {
				// Get image list from URL
				getImageList();
				savedException = null;
			} catch (Exception ex) {
				System.out.println("Tried " + noOfTry);
				try {
					Thread.sleep(2000);
				} catch (InterruptedException interruptedException) {
					// Do nothing
				}

				noOfTry++;
				savedException = ex;
			}
		} while (noOfTry <= MAX_TRY && savedException != null);

		// Nếu có exception thì hiẻn thị
		if (savedException != null) {
			log.error("Error when getting images", savedException);
		}
	}

	/**
	 * Get image list from URL
	 *
	 * @throws Exception
	 */
	protected void getImageListOld() throws Exception {
		BufferedReader br = Downloader.readUrl(url);
		String s;
		while ((s = br.readLine()) != null) {
			s = filterImage(s.trim());
			if (s != null) {
				list.add(s);
			}
		}
		br.close();
	}

	protected void getImageList() throws Exception {
		URLConnection con = new URL(url).openConnection();
		con.setRequestProperty("User-Agent",
				"Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:47.0) Gecko/20100101 Firefox/47.0");
		if (cookie != null) {
			con.setRequestProperty("Cookie", cookie);
		}
		BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String s;
		while ((s = br.readLine()) != null) {
			s = filterImage(s.trim());
			if (s != null) {
				list.add(s);
			}
		}
		br.close();
	}
	
	/**
	 * Filter image
	 *
	 * @param s
	 *            HTML code line
	 * @return Image link or NULL
	 */
	protected String filterImage(String s) {
		return null;
	}
	
	private void downloadImages() throws InterruptedException {
		if (!list.isEmpty()) {
			// Create output folder
			File folder = new File(Constants.OUTPUT_FOLDER + chapter);
			if (!folder.exists()) {
				folder.mkdir();
			}

			long startTime = System.currentTimeMillis();

			// downloadSerial();
			downloadParallel();

			long endTime = System.currentTimeMillis();
			double elapedTime = (endTime - startTime) / 1000d;
			// Speed?
			System.out.println("Finish after " + elapedTime + " seconds");
		}
	}

	/**
	 * Download each image
	 * 
	 * @throws IOException
	 */
	private void downloadSerial() throws IOException {
		for (int i = 0; i < list.size(); i++) {
			String iu = list.get(i);
			int idx = iu.lastIndexOf(".");
			String ext = iu.substring(idx + 1).toLowerCase();
			if (ext.length() > 5) {
				ext = "jpg";
			}

			String fn = (chapterPrefix ? chapter + "-" : "") + String.valueOf(1001 + i).substring(1) + "." + ext;
			String path = Constants.OUTPUT_FOLDER + chapter + "/" + fn;
			Downloader.downloadFile(iu, path);
		}
	}

	private void downloadParallel() throws InterruptedException {
		Thread[] threads = new Thread[noOfThreads];
		for (int i = 0; i < noOfThreads; i++) {
			Thread t = createDownloadThread(i);
			t.start();
			threads[i] = t;
		}
		for (Thread t : threads) {
			t.join();
		}
	}

	private Thread createDownloadThread(final int mod) {
		return new Thread(() -> {
			for (int i = 0; i < list.size(); i++) {
				if (i % noOfThreads == mod) {
					String iu = list.get(i);

					String ext;
					if (extension != null) {
						ext = extension;
					} else {
						int idx = iu.lastIndexOf(".");
						ext = iu.substring(idx + 1).substring(0, 3).toLowerCase();
					}

					String fn = (chapterPrefix ? chapter + "-" : "") + String.valueOf(1001 + i).substring(1) + "."
							+ ext;
					String path = Constants.OUTPUT_FOLDER + chapter + "/" + fn;
					try {
						// Downloader.download(iu, path, noOfParts);
						Downloader.downloadFile(iu, path);
					} catch (Exception ex) {
						ex.printStackTrace();
					}
				}
			}
		});
	}
}
