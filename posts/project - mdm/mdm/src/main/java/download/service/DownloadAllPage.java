/*
 * NVH
 */
package download.service;

import common.util.Downloader;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Download completed page.
 *
 * @author huyennv1
 */
public class DownloadAllPage {

	public DownloadAllPage(String url) throws Exception {
		Document doc = Downloader.jsoup(url);

		// Download anh o img
		Elements imgTags = doc.getElementsByTag("img");
		int count = 1;
		System.out.println(imgTags.size());
//            for (Element img : imgTags) {
//                String oldSrc = img.attr("src");
//                String imageUrl;
//                if (oldSrc.contains("http")) {
//                    imageUrl = oldSrc;
//                } else {
//                    imageUrl = url + "/" + oldSrc;
//                }
//                int index = oldSrc.lastIndexOf("/");
//                String newSrc = "images/" + oldSrc.substring(index + 1);
//                index = newSrc.lastIndexOf("?");
//                if (index >= 0) {
//                    System.out.println("File IMG chua dau hoi: " + newSrc);
//                    newSrc = newSrc.substring(0, index);
//                }
//                CommonUtils.downloadFile(imageUrl, "output/" + newSrc);
//                //System.out.println(count + ". Image source: " + oldSrc);
//                count++;
//                img.attr("src", newSrc);
//            }

		// Download cac file JS
		Elements scriptTags = doc.getElementsByTag("script");
		count = 1;
		for (Element script : scriptTags) {
			String oldSrc = script.attr("src");
			if (oldSrc != null && !oldSrc.isEmpty()) {
				String jsFileUrl;
				if (oldSrc.contains("http")) {
					jsFileUrl = oldSrc;
				} else {
					jsFileUrl = url + "/" + oldSrc;
				}
				int index = oldSrc.lastIndexOf("?");
				if (index >= 0) {
					System.out.println("File JS chua dau hoi: " + oldSrc);
					oldSrc = oldSrc.substring(0, index);
				}
				index = oldSrc.lastIndexOf("/");
				String newSrc = "js/" + oldSrc.substring(index + 1);
				Downloader.downloadFile(jsFileUrl, "output/" + newSrc);
				//System.out.println(count + ". JS File: " + oldSrc);
				count++;
				script.attr("src", newSrc);
			}

		}

		// Download cac file CSS
		Elements linkTags = doc.getElementsByTag("link");
		count = 1;
		for (Element link : linkTags) {
			String oldHref = link.attr("href");
			if (oldHref != null && oldHref.endsWith(".css")) {
				String cssFileUrl;
				if (oldHref.contains("http")) {
					cssFileUrl = oldHref;
				} else {
					cssFileUrl = url + "/" + oldHref;
				}
				int index = cssFileUrl.lastIndexOf("/");
				String cssFolder = cssFileUrl.substring(0, index);
				String cssFileName = cssFileUrl.substring(index + 1);

				Downloader.downloadFile(cssFileUrl, "output/" + "cssTemp/" + cssFileName);
				//System.out.println(count + ". CSS File: " + cssFileUrl);
				count++;
				link.attr("href", "css/" + cssFileName);

				BufferedReader reader = new BufferedReader(new FileReader(new File("output/cssTemp/" + cssFileName)));
				PrintWriter pw = new PrintWriter(new FileWriter("output/css/" + cssFileName, false));

				String s;
				while ((s = reader.readLine()) != null) {
					index = s.indexOf("url");

					if (index >= 0) {
						String oldUrl = s.substring(index);
						index = oldUrl.indexOf("(");
						oldUrl = oldUrl.substring(index + 1);
						index = oldUrl.indexOf(")");
						if (index >= 0) {
							oldUrl = oldUrl.substring(0, index);
							oldUrl = oldUrl.replace("'", "").replace("\"", "");
							System.out.println(cssFolder + "/" + oldUrl);
						}

					}
					pw.println(s);
				}
				reader.close();
				pw.close();
			}

		}

		// Ghi ra file output
		PrintWriter pw = new PrintWriter(new FileWriter("output/output.htm", false));
		pw.append(doc.html());
		pw.close();
		//this.downloadFile(url, "output.htm");
	}
}
