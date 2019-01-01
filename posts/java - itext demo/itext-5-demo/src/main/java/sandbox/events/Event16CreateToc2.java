package sandbox.events;

import java.io.FileOutputStream;
import java.util.AbstractMap.SimpleEntry;
import java.util.ArrayList;
import java.util.List;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfAction;
import com.itextpdf.text.pdf.PdfDestination;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.DottedLineSeparator;

class TocEvent2 extends PdfPageEventHelper {

	private int counter = 0;
	private List<SimpleEntry<String, SimpleEntry<String, Integer>>> toc = new ArrayList<>();

	@Override
	public void onGenericTag(PdfWriter writer, Document document, Rectangle rect, String text) {
		String name = "dest" + (counter++);
		int page = writer.getPageNumber();
		toc.add(new SimpleEntry<String, SimpleEntry<String, Integer>>(text,
				new SimpleEntry<String, Integer>(name, page)));
		writer.addNamedDestination(name, page, new PdfDestination(PdfDestination.FITH, rect.getTop()));
	}

	public List<SimpleEntry<String, SimpleEntry<String, Integer>>> getTOC() {
		return toc;
	}
}

public class Event16CreateToc2 {

	public static void main(String[] args) throws Exception {
		Font titleFont = new Font(FontFamily.HELVETICA, 16);

		String output = "output/event_16_create_toc_2.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		
		TocEvent2 event = new TocEvent2();
		writer.setPageEvent(event);
		
		document.open();
		for (int i = 0; i < 10; i++) {
			String title = "This is title " + i;
			Chunk c = new Chunk(title, titleFont);
			c.setGenericTag(title);
			document.add(new Paragraph(c));
			for (int j = 0; j < 50; j++) {
				document.add(new Paragraph("Line " + j + " of title " + i));
			}
		}
		
		document.newPage();
		document.add(new Paragraph("Table of Contents", titleFont));
		Chunk dottedLine = new Chunk(new DottedLineSeparator());
		List<SimpleEntry<String, SimpleEntry<String, Integer>>> entries = event.getTOC();
		Paragraph p;
		for (SimpleEntry<String, SimpleEntry<String, Integer>> entry : entries) {
			Chunk chunk = new Chunk(entry.getKey());
			SimpleEntry<String, Integer> value = entry.getValue();
			chunk.setAction(PdfAction.gotoLocalPage(value.getKey(), false));
			p = new Paragraph(chunk);
			p.add(dottedLine);
			chunk = new Chunk(String.valueOf(value.getValue()));
			chunk.setAction(PdfAction.gotoLocalPage(value.getKey(), false));
			p.add(chunk);
			document.add(p);
		}
		document.close();
	}
}
