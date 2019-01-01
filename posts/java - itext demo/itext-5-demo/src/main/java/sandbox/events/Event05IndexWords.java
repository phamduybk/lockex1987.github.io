package sandbox.events;

import java.io.FileOutputStream;
import java.util.List;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.events.IndexEvents;
import com.itextpdf.text.pdf.events.IndexEvents.Entry;

/**
 * Tạo trang index (các sách nước ngoài mới hay có).
 */
public class Event05IndexWords {

	public static void main(String[] args) throws Exception {
		String output = "output/event_05_index_words.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		
		IndexEvents index = new IndexEvents();
		writer.setPageEvent(index);
		
		document.open();
		
		Paragraph p = new Paragraph("Quick brown fox ");
		p.add(index.create("jumps", "Jump"));
		p.add(" over the lazy dog.");
		document.add(p);
		document.newPage();

		p = new Paragraph();
		p.add(index.create("Quick brown fox", "Fox", "quick, brown"));
		p.add(new Chunk(" jumps over "));
		p.add(index.create("the lazy dog.", "Dog", "lazy"));
		p.add(index.create(" ", "Jumping"));
		document.add(p);
		document.newPage();

		p = new Paragraph();
		p.add(new Chunk("The fox is "));
		p.add(index.create("brown", "Color", "brown"));
		p.add(index.create(" ", "Brown", "color", "see Color; brown"));
		p.add(Chunk.NEWLINE);
		document.add(p);
		document.newPage();

		p = new Paragraph();
		p.add(new Chunk("The dog is "));
		p.add(index.create("yellow", "Color", "yellow"));
		p.add(index.create(" ", "Yellow", "color", "see Color; yellow"));
		p.add(Chunk.NEWLINE);
		document.add(p);
		document.newPage();

		// We add the index
		document.add(new Paragraph("Index:"));
		List<Entry> list = index.getSortedEntries();
		for (Entry entry : list) {
			Paragraph in = new Paragraph();
			in.add(new Chunk(entry.getIn1()));
			if (entry.getIn2().length() > 0) {
				in.add(new Chunk("; " + entry.getIn2()));
			}
			if (entry.getIn3().length() > 0) {
				in.add(new Chunk(" (" + entry.getIn3() + ")"));
			}
			List<Integer> pages = entry.getPagenumbers();
			List<String> tags = entry.getTags();
			in.add(": ");
			for (int i = 0, x = pages.size(); i < x; i++) {
				Chunk pagenr = new Chunk(" p" + pages.get(i));
				pagenr.setLocalGoto((String) tags.get(i));
				in.add(pagenr);
			}
			document.add(in);
		}

		document.close();
	}
}
