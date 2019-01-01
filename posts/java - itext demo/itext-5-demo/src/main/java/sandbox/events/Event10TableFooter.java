package sandbox.events;

import java.io.FileOutputStream;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

class FooterTable extends PdfPageEventHelper {

	private PdfPTable footer;

	public FooterTable() {
		footer = new PdfPTable(1);
		footer.setTotalWidth(523);
		PdfPCell cell = new PdfPCell(new Phrase("This is a test document"));
		cell.setBackgroundColor(BaseColor.ORANGE);
		footer.addCell(cell);
		cell = new PdfPCell(new Phrase("This is a copyright notice"));
		cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
		footer.addCell(cell);
	}

	public void onEndPage(PdfWriter writer, Document document) {
		footer.writeSelectedRows(0, -1, 36, 64, writer.getDirectContent());
	}
}

public class Event10TableFooter {

	public static void main(String[] args) throws Exception {
		String output = "output/event_10_table_footer.pdf";
		Document document = new Document(PageSize.A4, 36, 36, 36, 72);
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));

		FooterTable event = new FooterTable();
		writer.setPageEvent(event);

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
