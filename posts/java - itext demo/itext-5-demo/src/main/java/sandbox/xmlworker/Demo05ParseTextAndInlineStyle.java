package sandbox.xmlworker;

import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.ElementList;
import com.itextpdf.tool.xml.XMLWorkerHelper;

public class Demo05ParseTextAndInlineStyle {

	public static void main(String[] args) throws Exception {
		String output = "output/html_05_text_and_inline_style.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		String html = "<b style=\"font-family: Arial, Verdana; font-size: 10pt; font-style: normal; font-variant: normal; font-weight: normal; line-height: normal; color: rgb(204, 255, 255); background-color: rgb(51, 102, 255);\">zzz&nbsp;</b>"
				+ "<div style=\"font-family: Arial, Verdana; font-size: 10pt; font-style: normal; font-variant: normal; font-weight: normal; line-height: normal;\">"
				+ "  <b style=\"color: rgb(204, 255, 255); background-color: rgb(51, 102, 255);\"><br /></b>"
				+ "</div>"
				+ "<div>"
				+ "  <b style=\"font-family: Arial, Verdana; font-size: 10pt; font-style: normal; font-variant: normal; font-weight: normal; line-height: normal; color: rgb(204, 255, 255); background-color: rgb(51, 102, 255);\">"
				+ "    Test &nbsp;"
				+ "  </b>"
				+ "  &nbsp; "
				+ "  <span style=\"color: rgb(255, 0, 0);\">&nbsp;<span style=\"font-weight: bold;\">Description</span> &nbsp;</span>"
				+ "  <span style=\"color: rgb(153, 51, 153); font-style: italic;\">Other Color</span>"
				+ "</div>";
		ElementList elements = XMLWorkerHelper.parseToElementList(html, null);
		for (Element e : elements) {
			document.add(e);
		}

		document.close();
	}
}
