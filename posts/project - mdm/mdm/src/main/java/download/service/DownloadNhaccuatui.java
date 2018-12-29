package download.service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.net.URL;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import common.util.CommonUtils;
import common.util.Constants;
import common.util.Downloader;

/**
 * Download mp3 file and lrc file from nhaccuatui.
 *
 * @author huyennv1
 */
public class DownloadNhaccuatui {

	private String source;
	private String lyric;
	private String name;

	public DownloadNhaccuatui(String htmlUrl) throws Exception {
		String xmlUrl = getXmlUrl(htmlUrl);
		getInfo(xmlUrl);
		downloadFiles();
		decryptLyric();
	}

	private String getXmlUrl(String url) throws Exception {
		String r = "";
		BufferedReader br = Downloader.readUrl(url);
		String s;
		while ((s = br.readLine()) != null) {
			s = s.trim();
			if (s.startsWith("player.peConfig.xmlURL = ")) {
				int idx = s.indexOf("\"");
				r = s.substring(idx + 1, s.length() - 2);
				break;
			}
		}
		br.close();
		return r;
	}

	private void getInfo(String xmlUrl) throws Exception {
		DocumentBuilder db = DocumentBuilderFactory.newInstance().newDocumentBuilder();
		InputStream is = new URL(xmlUrl).openStream();
		org.w3c.dom.Document xmlDoc = db.parse(is);

		String title = CommonUtils.getValue(xmlDoc, "title");
		String performer = CommonUtils.getValue(xmlDoc, "creator");
		source = CommonUtils.getValue(xmlDoc, "location");
		lyric = CommonUtils.getValue(xmlDoc, "lyric");
		name = CommonUtils.stripAccents(title + " - " + performer).toLowerCase();
	}

	private void downloadFiles() throws Exception {
		Downloader.downloadFile(source, Constants.OUTPUT_FOLDER + name + ".mp3");
		Downloader.downloadFile(lyric, Constants.OUTPUT_FOLDER + name + ".lrc");
	}

	private void decryptLyric() throws Exception {
		final String PYTHON_SCRIPT = "/data/workspace/z/lyric/lyric karaoke/new_nctlyricdecryptor.py";
		Process process = Runtime.getRuntime().exec(new String[] {
				"python",
				PYTHON_SCRIPT,
				Constants.OUTPUT_FOLDER + name + ".lrc"
		});
		process.waitFor();
	}
	
	private static void testDownloadNhaccuatui() throws Exception {
		//new DownloadNhaccuatui(prop.getProperty(KEY_URL));
	}
}
