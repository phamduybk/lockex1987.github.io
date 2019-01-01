package sandbox.events;

import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

class MyFooter extends PdfPageEventHelper {

	private static final Font FOOTER_FONT = new Font(Font.FontFamily.UNDEFINED, 5, Font.ITALIC);
	private static final Phrase HEADER = new Phrase("this is a header", FOOTER_FONT);
	private static final Phrase FOOTER = new Phrase("this is a footer", FOOTER_FONT);

	public void onEndPage(PdfWriter writer, Document document) {
		PdfContentByte cb = writer.getDirectContent();
		ColumnText.showTextAligned(cb,
				Element.ALIGN_CENTER,
				HEADER,
				(document.right() - document.left()) / 2 + document.leftMargin(),
				document.top() + 10,
				0);
		ColumnText.showTextAligned(cb,
				Element.ALIGN_CENTER,
				FOOTER,
				(document.right() - document.left()) / 2 + document.leftMargin(),
				document.bottom() - 10,
				0);
	}

	public void onStartPageNew(PdfWriter writer, Document document) {
		ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_CENTER, new Phrase("Top Left"), 30, 800, 0);
		ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_CENTER, new Phrase("Top Right"), 550, 800,
				0);
	}

	public void onEndPageNew(PdfWriter writer, Document document) {
		ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_CENTER,
				new Phrase("http://www.xxxx-your_example.com/"), 110, 30, 0);
		ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_CENTER,
				new Phrase("page " + document.getPageNumber()), 550, 30, 0);
	}
}

public class Event09TextFooter {

	public static void main(String[] args) throws Exception {
		String DEST = "output/event_09_page_footer.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(DEST));

		MyFooter event = new MyFooter();
		writer.setPageEvent(event);

		document.open();

		for (int i = 0; i < 3;) {
			i++;
			document.add(new Paragraph("Test " + i));
			document.newPage();
		}

		document.close();
	}
}
