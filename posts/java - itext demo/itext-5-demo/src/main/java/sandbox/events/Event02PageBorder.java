package sandbox.events;

import java.io.FileOutputStream;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

class RedBorder extends PdfPageEventHelper {

	@Override
	public void onEndPage(PdfWriter writer, Document document) {
		PdfContentByte canvas = writer.getDirectContent();
		Rectangle rect = document.getPageSize();
		rect.setBorder(Rectangle.BOX); // left, right, top, bottom border
		rect.setBorderWidth(5); // a width of 5 user units
		rect.setBorderColor(BaseColor.RED); // a red border
		rect.setUseVariableBorders(true); // the full width will be visible
		canvas.rectangle(rect);
	}
}

public class Event02PageBorder {

	public static void main(String[] args) throws Exception {
		String output = "output/event_02_page_border.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));

		// Thêm sự kiện cho writer
		RedBorder event = new RedBorder();
		writer.setPageEvent(event);

		document.open();

		for (int i = 2; i < 301; i++) {
			document.add(new Paragraph("This is a page " + i));
			document.newPage();
		}

		document.close();
	}
}
