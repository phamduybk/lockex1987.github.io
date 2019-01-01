package sandbox.xmlworker;

import java.io.FileOutputStream;
import java.io.StringReader;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.ElementList;
import com.itextpdf.tool.xml.XMLWorkerHelper;

public class Demo01ParseText {

	public static void main(String[] args) throws Exception {
		test1();
		test2();
	}

	private static void test1() throws Exception {
		String output = "output/html_01_parse_text_01.pdf";
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		String htmlText = "<div>"
				+ "  <p align='center'>"
				+ "    <font size='5'>"
				+ "      <b>&nbsp;<font color='#32cd32'>My centered Paragraph</font></b>"
				+ "    </font>"
				+ "    <font color='#32cd32'>&nbsp;</font>"
				+ "  </p>"
				+ "</div>";
		ElementList list = XMLWorkerHelper.parseToElementList(htmlText, null);
		for (Element e : list) {
			document.add(e);
		}

		document.close();
	}

	private static void test2() throws Exception {
		String output = "output/html_01_parse_text_02.pdf";
		Document document = new Document(PageSize.LETTER);
		PdfWriter pdfWriter = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		String htmlText = "<html><head></head><body>"
				+ "<a href='http://www.rgagnon.com/howto.html'><b>Real's HowTo</b></a>"
				+ "<h1>Show your support</h1>"
				+ "<p>It DOES cost a lot to produce this site - in ISP storage and transfer fees, "
				+ "in personal hardware and software costs to set up test environments, and above all,"
				+ "the huge amounts of time it takes for one person to design and write the actual content.</p>"
				+ "<p>If you feel that effort has been useful to you, perhaps you will consider giving something back?</p>"
				+ "<p>Donate using PayPal� to real@rgagnon.com.</p>"
				+ "<p>Contributions via PayPal are accepted in any amount</p>"
				+ "<P><br/><table border='1'><tr><td>Java HowTo</td></tr><tr>"
				+ "<td style='background-color:red;'>Javascript HowTo</td></tr>"
				+ "<tr><td>Powerbuilder HowTo</td></tr></table></p>"
				+ "</body></html>";
		XMLWorkerHelper worker = XMLWorkerHelper.getInstance();
		worker.parseXHtml(pdfWriter, document, new StringReader(htmlText));

		document.close();
	}
}
