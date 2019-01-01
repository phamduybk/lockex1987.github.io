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
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.DottedLineSeparator;

class TocEvent extends PdfPageEventHelper {

	protected List<SimpleEntry<String, Integer>> toc = new ArrayList<>();

	public List<SimpleEntry<String, Integer>> getToc() {
		return toc;
	}

	@Override
	public void onGenericTag(PdfWriter writer, Document document, Rectangle rect, String text) {
		toc.add(new SimpleEntry(text, writer.getPageNumber()));
	}
}

public class Event15CreateToc {

	public static void main(String[] args) throws Exception {
		Font titleFont = new Font(FontFamily.HELVETICA, 16);

		String output = "output/event_15_create_toc.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));

		TocEvent event = new TocEvent();
		writer.setPageEvent(event);

		document.open();
		for (int i = 0; i < 10; i++) {
			String title = "This is title " + i;
			Chunk chunk = new Chunk(title, titleFont);
			chunk.setGenericTag(title);
			document.add(new Paragraph(chunk));

			for (int j = 0; j < 50; j++) {
				document.add(new Paragraph("Line " + j + " of title " + i));
			}
		}

		document.newPage();
		document.add(new Paragraph("Table of Contents", titleFont));
		Chunk dottedLine = new Chunk(new DottedLineSeparator());

		List<SimpleEntry<String, Integer>> entries = event.getToc();
		for (SimpleEntry<String, Integer> entry : entries) {
			Paragraph p = new Paragraph(entry.getKey());
			p.add(dottedLine);
			p.add(String.valueOf(entry.getValue()));
			document.add(p);
		}

		document.close();
	}
}
