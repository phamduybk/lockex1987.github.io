package sandbox.xmlworker;

import java.io.FileOutputStream;
import java.io.IOException;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.ElementList;
import com.itextpdf.tool.xml.XMLWorkerHelper;

public class Demo04ParseTextAndCss {

	public static void main(String[] args) throws IOException, DocumentException {
		String output = "output/html_04_text_and_css.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		String html = "<div>"
				+ "  <span class='bluetextwhitebackground'>zzz</span>"
				+ "</div>"
				+ "<div>"
				+ "  <span class='bluetextwhitebackground'>Test</span> "
				+ "  <span class='redtext'>Description</span> "
				+ "  <span class='italicpurple'>Other Color</span>"
				+ "</div>";
		String css = ".bluetextwhitebackground { font-family: times; color: white; background: blue}"
				+ ".redtext { font-family: times; color: red; }"
				+ ".italicpurple { font-family: times; font-style: italic; color: purple }";		
		ElementList elements = XMLWorkerHelper.parseToElementList(html, css);
		for (Element e : elements) {
			document.add(e);
		}

		document.close();
	}
}
