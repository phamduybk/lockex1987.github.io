package download.service.book;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

public class DownloadTusachtruyen extends BaseBookDownloader {

	public DownloadTusachtruyen(String[] urls, String title) throws Exception {
		download("https://tusachtruyen.blogspot.com/", urls, title);
	}

	@Override
	protected String filterContent(Document doc, String baseUrl, String url, int index) throws Exception {
		Element content = doc.getElementsByClass("post-body").first();
		return content.html();
	}

	public static void main(String[] args) throws Exception {
		String[] urls = {
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-1-nguoi.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-2-gap-cha.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-3-nhung.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-4-lao.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-5-voi.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-6-giua.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-7-nguoi.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-8-chuyen.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-9-su.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-10-cuoc.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-11-san.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-12.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-13-giua.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-14-chung.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-15-cuoc.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-16-mat.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-17-nguoi.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-18-nhung.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-19-cuu.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-20-tren.html",
				"https://tusachtruyen.blogspot.com/2015/11/to-mech-o-xu-so-canguru-chuong-21-bi.html"
		};
		new DownloadTusachtruyen(urls, "Tô-mếch ở xứ sở Cănguru");
	}
}
