package cttd.download.controller;

import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFileLocation;

import java.awt.Desktop;
import java.net.URI;
import java.util.List;

import download.getlink.GetTruyentranhvang;
import download.getlink.GetYoutubeLink;
import download.service.album.DownloadImageList;
import download.service.album.DownloadKenhsinhvien;
import download.service.album.DownloadReadcomiconline;
import download.service.album.DownloadTruyentranhvang;
import download.service.album.DownloadUptruyen;
import lombok.extern.slf4j.Slf4j;

/**
 * Calculate download speed
 * http://9xbuddy.com
 */
@Slf4j
public class MdmController {

	public static void main(String[] args) {
		MdmController obj = new MdmController();

		int port = 8080;

		port(port);
		staticFileLocation("/public");
		
		post("/getlink", (request, response) -> {
			String type = request.queryParams("type");
			String input = request.queryParams("input");
			long startTime = System.currentTimeMillis();
			String output;
			if ("youtube".equals(type)) {
				output = obj.testGetYoutubeLink(input);
			} else if ("get-truyen-tranh-vang".equals(type)) {
				output = obj.testGetTruyentranhvang(input);
			} else {
				output = "Command not recognized";
			}

			long endTime = System.currentTimeMillis();
			double elapedTime = (endTime - startTime) / 1000d;
			System.out.println("Finish after " + elapedTime + " seconds");
			return output;
		});
		
		post("/download", (request, response) -> {
			String type = request.queryParams("type");
			String input = request.queryParams("input");
			log.info(type + ": " + input);
			
			if ("detective-conan".equals(type)) {
				obj.testDownloadKenhsinhvien(input);
			} else if ("download-truyen-tranh-vang".equals(type)) {
				obj.testDownloadTruyentranhvang(input);
			} else if ("read-comic-online".equals(type)) {
				obj.testDownloadReadcomiconline(input);
			} else if ("download-batch-images".equals(type)) {
				obj.testDownloadBatchImages(input);
			} else if ("download-up-truyen".equals(type)) {
				obj.testDownloadUptruyen(input);
			}

			return "Download completed";
		});

		obj.browseUrl("http://localhost:" + port);
		System.out.println("Main is running");
	}

	/**
	 * Open a URL on the default browser. Need test on Linux Mint. Use Spark and
	 * this function to open the local web.
	 * 
	 * @param url
	 *            The URL
	 */
	public void browseUrl(String url) {
		try {
			if (Desktop.isDesktopSupported()) {
				Desktop desktop = Desktop.getDesktop();
				URI uri = new URI(url);
				desktop.browse(uri);
				// desktop.open(uri);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private String testGetYoutubeLink(String input) throws Exception {
		StringBuilder result = new StringBuilder();
		String[] videos = input.split("\n");
		for (String watchUrl : videos) {
			watchUrl = watchUrl.trim();
			System.out.println(watchUrl);
			if (!watchUrl.isEmpty()) {

				List<String[]> a = GetYoutubeLink.getVideoUrl(watchUrl);
				if (a != null && !a.isEmpty()) {
					result.append("<div class='title'>").append(a.get(0)[2]).append("</div>");
					result.append("<div class='links'>");
					for (String[] entry : a) {
						String quality = entry[0];
						String url = entry[1];
						result.append("<a href='").append(url).append("'>").append(quality).append("</a> ");
					}
					result.append("</div>");
				}
			}
		}
		return result.toString();
	}

	private String testGetTruyentranhvang(String input) throws Exception {
		String[] a = input.split("\n");
		String url = a[0].trim();
		int noOfPages = Integer.parseInt(a[1].trim());
		return new GetTruyentranhvang().getLink(url, noOfPages);
	}

	private void testDownloadTruyentranhvang(String input) throws Exception {
		String[] a = input.split("\n");
		for (String s : a) {
			s = s.trim();
			if (!s.isEmpty()) {
				String[] tmp = s.split(",");
				int chapter = Integer.parseInt(tmp[0].trim());
				String url = tmp[1].trim();
				new DownloadTruyentranhvang(url, chapter);
				System.out.println("-----------------------------------");
			}
		}
	}

	private void testDownloadUptruyen(String input) throws Exception {
		String[] a = input.split("\n");
		for (String s : a) {
			s = s.trim();
			if (!s.isEmpty()) {
				String[] tmp = s.split(",");
				int chapter = Integer.parseInt(tmp[0].trim());
				String url = tmp[1].trim();
				new DownloadUptruyen(chapter, url);
				System.out.println("-----------------------------------");
			}
		}
	}

	private void testDownloadKenhsinhvien(String input) throws Exception {
		String[] a = input.split("\n");
		for (String s : a) {
			s = s.trim();
			if (!s.isEmpty()) {
				String[] tmp = s.split(",");
				int chapter = Integer.parseInt(tmp[0].trim());
				String url = tmp[1].trim();
				new DownloadKenhsinhvien(url, chapter);
			}
		}
	}

	// Go to Web Console and type:
	// for (var i = 0; i < lstImages.length; i++) { console.info(lstImages[i]); }
	// Go to Browser Console to get the result.
	// And then use download-batch-images
	private void testDownloadReadcomiconline(String input) throws Exception {
		String[] a = input.split("\n");
		for (String s : a) {
			s = s.trim();
			if (!s.isEmpty()) {
				String[] tmp = s.split(",");
				int chapter = Integer.parseInt(tmp[0].trim());
				String url = tmp[1].trim();
				new DownloadReadcomiconline(url, chapter);
			}
		}
	}

	private void testDownloadBatchImages(String input) throws Exception {
		DownloadImageList obj = new DownloadImageList(input);
	}
}
