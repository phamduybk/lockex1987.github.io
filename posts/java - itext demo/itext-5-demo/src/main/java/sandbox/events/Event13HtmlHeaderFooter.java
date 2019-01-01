package sandbox.events;

import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.ExceptionConverter;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.ElementList;
import com.itextpdf.tool.xml.XMLWorkerHelper;

class HtmlHeaderFooter extends PdfPageEventHelper {

	private static final String HEADER = "<table width=\"100%\" border=\"0\"><tr><td>Header</td><td align=\"right\">Some title</td></tr></table>";
	private static final String FOOTER = "<table width=\"100%\" border=\"0\"><tr><td>Footer</td><td align=\"right\">Some title</td></tr></table>";

	private ElementList header;
	private ElementList footer;

	public HtmlHeaderFooter() throws Exception {
		header = XMLWorkerHelper.parseToElementList(HEADER, null);
		footer = XMLWorkerHelper.parseToElementList(FOOTER, null);
	}

	@Override
	public void onEndPage(PdfWriter writer, Document document) {
		try {
			ColumnText ct = new ColumnText(writer.getDirectContent());
			ct.setSimpleColumn(new Rectangle(36, 832, 559, 810));
			for (Element e : header) {
				ct.addElement(e);
			}
			ct.go();
			ct.setSimpleColumn(new Rectangle(36, 10, 559, 32));
			for (Element e : footer) {
				ct.addElement(e);
			}
			ct.go();
		} catch (DocumentException de) {
			throw new ExceptionConverter(de);
		}
	}
}

public class Event13HtmlHeaderFooter {

	public static void main(String[] args) throws Exception {
		String output = "output/event_13_html_header_footer.pdf";
		Document document = new Document(PageSize.A4, 36, 36, 36, 72);
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));

		writer.setPageEvent(new HtmlHeaderFooter());

		document.open();

		for (int i = 0; i < 50; i++) {
			document.add(new Paragraph("Hello World!"));
		}
		document.newPage();
		document.add(new Paragraph("Hello World!"));
		document.newPage();
		document.add(new Paragraph("Hello World!"));

		document.close();
	}
}
