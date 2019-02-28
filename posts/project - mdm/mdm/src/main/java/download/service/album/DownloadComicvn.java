package download.service.album;

import common.util.Downloader;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class DownloadComicvn extends BaseAlbumDownloader {

	public DownloadComicvn(String url, int chapter) throws Exception {
		this.url = url;
		this.chapter = chapter;
		this.chapterPrefix = false;
		super.process();
	}

	@Override
	protected void getImageList() throws Exception {
		Document doc = Downloader.jsoup(url);
		String[] rows = doc.select("#txtarea").first().val().replace("\"", "'").split("src='");
		for (int i = 1; i < rows.length; i++) {
			String v = rows[i].substring(0, rows[i].indexOf("'"));
			String d = v.replaceAll("\\s+", "");
			if (!isExtraImage(d)) {
				list.add(d);
			}
		}
	}
	
	private boolean isExtraImage(String imageUrl) {
		String[] blackList = {
				"quang%2Bcao.jpg",
				"App%2Bcomic.jpg",
				"thanks.jpg",
				"TAYDU%2Bbanner.png",
				"banner%2B%25C3%25A1o.jpg",
				"BANNER%2BTD.jpg",
				"Comicvn.jpg",
				"comicvn.jpg",
				"%25C3%25A1o.jpg",
				"Timnguoithanmatlienlac.jpg",
				"donate%2Bcomicvn.jpg",
				"tuy%25E1%25BB%2583n%2Bnh%25C3%25A2n%2Bs%25E1%25BB%25B1.jpg",
				"comicvnRule.jpg?imgmax=16383",
				"comicvnRule.jpg",
				"ComicvnRule.jpg",
				"credit.jpg",
				"28535323_1942896122692370_837761597_n.png",
				"26219355_321993561648014_2404558659855679663_n.jpg",
				"20733142_1487886567942543_1423699520_n.jpg",
				"dragon_and_wolf_by_kazu67-dbfa73j.jpg"
		};
		for (int i = 0; i < blackList.length; i++) {
			if (imageUrl.endsWith(blackList[i])) {
				return true;
			}
		}
		return false;
	}
}
