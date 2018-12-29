package common.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.junit.Assert;
import org.junit.Test;

public class CommonUtilsTests {

	@Test
	public void filterTextImageLinkTest() {
		String input = "<html>"
				+ "<head>"
				+ "<title>Simple Page</title>"
				+ "</head>"
				+ "<body>"
				+ "<div id='abc'>"
				+ "<h1 class='foo'>H1</h1>"
				+ "<h6 class='foo'>H6</h6>"
				+ "1 Hello"
				+ "<div>"
				+ "2 ABC"
				+ "<div>3 Inner div</div>"
				+ "4 DEF"
				+ "<img src='cttd.jpg' class='foo'/>"
				+ "</div>"
				+ "<p>5 P2<br /> new line</p>"
				+ "<a href='xyz' class='foo'>XYZ</a>"
				+ "<p class='foo'>Only paragraph</p>"
				+ "<div>Only div</div>"
				+ "</div>"
				+ "</body>"
				+ "</html>";
		String expected = "<h1>H1</h1>\n"
				+ "<h6>H6</h6>\n"
				+ "1 Hello\n"
				+ "2 ABC\n"
				+ "3 Inner div\n"
				+ "4 DEF\n"
				+ "<img src='cttd.jpg'/>\n"
				+ "<p>5 P2 new line</p>\n"
				+ "<a href='xyz'>XYZ</a>\n"
				+ "<p>Only paragraph</p>\n"
				+ "Only div\n";
		Document doc = Jsoup.parse(input);
		Element article = doc.select("#abc").first();
		String actual = CommonUtils.filterTextImageLink(article);
		Assert.assertEquals(expected, actual);
	}
}
