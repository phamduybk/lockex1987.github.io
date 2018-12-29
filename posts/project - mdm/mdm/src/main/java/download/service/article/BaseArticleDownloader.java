package download.service.article;

import java.io.File;

import org.jsoup.nodes.Document;

import common.util.CommonUtils;
import common.util.Constants;
import common.util.Downloader;

/**
 * 
 * @author locke
 */
public abstract class BaseArticleDownloader {

	private String downloadFolder;

	public void download(String url) throws Exception {
		// Download and get title
		Document doc = Downloader.jsoup(url);
		String title = doc.title();

		// Create local folder
		downloadFolder = CommonUtils.stripAccents(title).toLowerCase();
		File file = new File(Constants.OUTPUT_FOLDER + downloadFolder);
		if (!file.exists()) {
			file.mkdir();
		}

		// Filter content
		String content = filterContent(doc, url);

		// Write file
		CommonUtils.writeFile(downloadFolder + "/index", title, content);
		System.out.println("Finish download: " + url);
	}

	protected String getDownloadFolder() {
		return downloadFolder;
	}

	protected abstract String filterContent(Document doc, String url) throws Exception;
}
