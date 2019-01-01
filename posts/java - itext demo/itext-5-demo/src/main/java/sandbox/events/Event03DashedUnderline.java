package sandbox.events;

import java.io.FileOutputStream;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

class DashedLine extends PdfPageEventHelper {

	@Override
	public void onGenericTag(PdfWriter writer, Document document, Rectangle rect, String text) {
		PdfContentByte canvas = writer.getDirectContent();
		canvas.saveState();
		canvas.setLineDash(3, 3);
		canvas.moveTo(rect.getLeft(), rect.getBottom() - 3);
		canvas.lineTo(rect.getRight(), rect.getBottom() - 3);
		canvas.stroke();
		canvas.restoreState();
	}
}

public class Event03DashedUnderline {

	public static void main(String[] args) throws Exception {
		String output = "output/event_03_dashed_underline.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));

		writer.setPageEvent(new DashedLine());
		document.open();

		document.add(new Paragraph("This text is not underlined"));
		Chunk chunk1 = new Chunk("This text is underlined with a solid line");
		chunk1.setUnderline(1, -3);
		document.add(new Paragraph(chunk1));
		Chunk chunk2 = new Chunk("This text is underlined with a dashed line");
		chunk2.setGenericTag("");
		document.add(new Paragraph(chunk2));

		document.close();
	}
}
