package sandbox.events;

import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

class ParagraphBorder2 extends PdfPageEventHelper {

	private boolean active = false;
	private float offset = 5;
	private float startPosition;

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public void onStartPage(PdfWriter writer, Document document) {
		startPosition = document.top();
	}

	@Override
	public void onParagraph(PdfWriter writer, Document document, float paragraphPosition) {
		this.startPosition = paragraphPosition;
	}

	@Override
	public void onEndPage(PdfWriter writer, Document document) {
		if (active) {
			PdfContentByte cb = writer.getDirectContentUnder();
			cb.rectangle(document.left(),
					document.bottom() - offset,
					document.right() - document.left(),
					startPosition - document.bottom());
			cb.stroke();
		}
	}

	@Override
	public void onParagraphEnd(PdfWriter writer, Document document, float paragraphPosition) {
		if (active) {
			PdfContentByte cb = writer.getDirectContentUnder();
			cb.rectangle(document.left(),
					paragraphPosition - offset,
					document.right() - document.left(),
					startPosition - paragraphPosition);
			cb.stroke();
		}
	}
}

public class Event07BorderForParagraph2 {

	public static void main(String[] args) throws Exception {
		String output = "output/event_07_paragraph_with_border_2.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		
		ParagraphBorder2 border = new ParagraphBorder2();
		writer.setPageEvent(border);
		
		document.open();
		
		document.add(new Paragraph("Hello,"));
		document.add(new Paragraph("In this document, we'll add several paragraphs that will trigger page events. As long as the event isn't activated, nothing special happens, but let's make the event active and see what happens:"));
		border.setActive(true);
		document.add(new Paragraph("This paragraph now has a border. Isn't that fantastic? By changing the event, we can even provide a background color, change the line width of the border and many other things. Now let's deactivate the event."));
		border.setActive(false);
		document.add(new Paragraph("This paragraph no longer has a border."));
		document.add(new Paragraph("Let's repeat:"));
		for (int i = 0; i < 10; i++) {
			border.setActive(true);
			document.add(new Paragraph("This paragraph now has a border. Isn't that fantastic? By changing the event, we can even provide a background color, change the line width of the border and many other things. Now let's deactivate the event."));
			border.setActive(false);
			document.add(new Paragraph("This paragraph no longer has a border."));
		}
		document.close();
	}
}
