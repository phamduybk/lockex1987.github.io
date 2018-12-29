package download.service;

import java.io.InputStream;
import java.net.URL;
import java.util.zip.GZIPInputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.jsoup.nodes.Element;

import common.util.CommonUtils;
import common.util.Constants;
import common.util.Downloader;

/**
 * Download mp3 file and lrc file from mp3.zing.vn.
 *
 * @author huyennv1
 */
public class DownloadMp3ZingVn {

	private String source;
	private String lyric;
	private String name;

	public DownloadMp3ZingVn(String htmlUrl) throws Exception {
		String xmlUrl = getXmlUrl(htmlUrl);
		getInfo(xmlUrl);
		downloadFiles();
	}

	private String getXmlUrl(String htmlUrl) throws Exception {
		org.jsoup.nodes.Document htmlDoc = Downloader.jsoup(htmlUrl);
		Element div = htmlDoc.getElementById("html5player");
		return div.attr("data-xml");
	}

	private void getInfo(String xmlUrl) throws Exception {
		DocumentBuilder db = DocumentBuilderFactory.newInstance().newDocumentBuilder();
		InputStream is = new URL(xmlUrl).openStream();
		org.w3c.dom.Document xmlDoc = db.parse(new GZIPInputStream(is)); // XML is zipped

		String title = CommonUtils.getValue(xmlDoc, "title");
		String performer = CommonUtils.getValue(xmlDoc, "performer");
		source = CommonUtils.getValue(xmlDoc, "source");
		lyric = CommonUtils.getValue(xmlDoc, "lyric");
		name = CommonUtils.stripAccents(title + " - " + performer).toLowerCase();
	}

	private void downloadFiles() throws Exception {
		Downloader.downloadFile(source, Constants.OUTPUT_FOLDER + name + ".mp3");
		Downloader.downloadFile(lyric, Constants.OUTPUT_FOLDER + name + ".lrc");
	}
	
	private static void testDownloadMp3ZingVn() throws Exception {
		new DownloadMp3ZingVn("http://mp3.zing.vn/bai-hat/Happy-New-Year-ABBA/ZWZEC669.html");
	}
}
