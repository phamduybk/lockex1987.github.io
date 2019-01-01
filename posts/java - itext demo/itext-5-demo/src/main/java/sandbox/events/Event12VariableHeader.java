package sandbox.events;

import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

class Header extends PdfPageEventHelper {

	private Phrase header;

	public void setHeader(Phrase header) {
		this.header = header;
	}

	@Override
	public void onEndPage(PdfWriter writer, Document document) {
		PdfContentByte canvas = writer.getDirectContentUnder();
		ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, header, 559, 806, 0);
	}
}

public class Event12VariableHeader {

	public static void main(String[] args) throws Exception {
		String output = "output/event_12_variable_header.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));

		Header event = new Header();
		writer.setPageEvent(event);

		document.open();

		for (int i = 2; i < 301; i++) {
			document.add(new Paragraph("This is page " + i));
			event.setHeader(new Phrase(String.format("THE FACTORS OF %s", i)));
			document.newPage();
		}

		document.close();
	}
}
