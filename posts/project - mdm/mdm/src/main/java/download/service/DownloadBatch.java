package download.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import common.util.Constants;
import common.util.Downloader;

/**
 * Download from file, from an expression like Download Them All.
 *
 * @author lockex1987
 */
public class DownloadBatch {

	public List<String> getUrlsFromText(String text) {
		List<String> urls = new ArrayList<>();
		String[] a = text.split("\n");
		for (String s : a) {
			s = s.trim();
			if (!s.isEmpty()) {
				urls.add(s);
			}
		}
		return urls;
	}
	
	public List<String> getUrlsFromFile(String filePath) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader(filePath));
		List<String> urls = new ArrayList<>();
		String s;
		while ((s = br.readLine()) != null) {
			s = s.trim();
			if (!s.isEmpty()) {
				urls.add(s);
			}
		}
		br.close();
		return urls;
	}

	public void downloadFiles(List<String> urls) throws IOException {
		for (String url : urls) {
			String f = Downloader.extractFile(url);
			Downloader.downloadFile(url, Constants.OUTPUT_FOLDER + f);
		}
	}
}
