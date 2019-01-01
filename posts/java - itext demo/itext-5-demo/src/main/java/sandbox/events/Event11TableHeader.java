package sandbox.events;

import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

class HeaderTable extends PdfPageEventHelper {

	private PdfPTable table;
	private float tableHeight;

	public HeaderTable() {
		table = new PdfPTable(1);
		table.setTotalWidth(523);
		table.setLockedWidth(true);
		table.addCell("Header row 1");
		table.addCell("Header row 2");
		table.addCell("Header row 3");
		tableHeight = table.getTotalHeight();
	}

	public float getTableHeight() {
		return tableHeight;
	}

	public void onEndPage(PdfWriter writer, Document document) {
		table.writeSelectedRows(0, -1,
				document.left(),
				document.top() + ((document.topMargin() + tableHeight) / 2),
				writer.getDirectContent());
	}
}

public class Event11TableHeader {

	public static void main(String[] args) throws Exception {
		HeaderTable event = new HeaderTable();

		String output = "output/event_11_table_header.pdf";
		Document document = new Document(PageSize.A4, 36, 36, 20 + event.getTableHeight(), 36);
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));

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
