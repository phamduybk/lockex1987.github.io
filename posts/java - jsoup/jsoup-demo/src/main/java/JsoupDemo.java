import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class JsoupDemo {

	public static void main1(String[] args) throws IOException {
		Document doc = Jsoup.connect("https://lockex1987.github.io/").get();
		String title = doc.title();
		System.out.println("Title: " + title);
	}

	// Có thể sử dụng jSoup để format HTML code
	public static void main(String[] args) throws IOException {
		String htmlFragment = "<h1>Hi you!</h1><p>What is this?</p>"
				+ "                 <p>Code dang linh tinh"
				+ "<p>Khong dung chuan XHTML</P>           ";
		Document doc = Jsoup.parseBodyFragment(htmlFragment);
		String fullHtml = doc.html();
		System.out.println(fullHtml);
	}
}
