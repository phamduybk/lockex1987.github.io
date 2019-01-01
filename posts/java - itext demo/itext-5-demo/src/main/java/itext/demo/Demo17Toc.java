package itext.demo;

import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

import com.itextpdf.text.Chapter;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfTemplate;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.VerticalPositionMark;

/**
 * Class này không được sử dụng.
 */
class TocEvent extends PdfPageEventHelper {

	// Store the chapters and sections with their title here.
	//private Map<String, Integer> pageByTitle = new HashMap<>();

	@Override
	public void onChapter(PdfWriter writer, Document document, float paragraphPosition, Paragraph title) {
		//this.pageByTitle.put(title.getContent(), writer.getPageNumber());
	}

	@Override
	public void onSection(PdfWriter writer, Document document, float paragraphPosition, int depth, Paragraph title) {
		//this.pageByTitle.put(title.getContent(), writer.getPageNumber());
	}
}

public class Demo17Toc {

	// Table to store placeholder for all chapters and sections
	private static final Map<String, PdfTemplate> tocPlaceholder = new HashMap<>();

	public static void main(String[] args) throws Exception {
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("output/demo_17_toc.pdf"));

		//TocEvent event = new TocEvent();
		//writer.setPageEvent(event);

		document.open();

		// Title page (cover page)
		document.add(new Paragraph("This is an example to generate a TOC."));
		
		// Trang mục lục
		createToc(10, document);
		
		// Nội dung
		createChapters(10, document, writer);

		document.close();
	}

	private static void createToc(int count, Document document) throws DocumentException {
		Font chapterFont = FontFactory.getFont(FontFactory.HELVETICA, 24, Font.NORMAL);

		// Add a small introduction chapter the shouldn't be counted.
		Chapter intro = new Chapter(new Paragraph("This is TOC ", chapterFont), 0);
		intro.setNumberDepth(0);
		document.add(intro);

		for (int i = 1; i < count + 1; i++) {
			// Write "Chapter i"
			String title = "Chapter " + i;
			Chunk chunk = new Chunk(title).setLocalGoto(title); // tạo link ở đây
			document.add(new Paragraph(chunk));

			// Add a placeholder for the page reference
			VerticalPositionMark mark = new VerticalPositionMark() {

				@Override
				public void draw(PdfContentByte canvas, float llx, float lly, float urx, float ury, float y) {
					PdfTemplate createTemplate = canvas.createTemplate(50, 50);
					canvas.addTemplate(createTemplate, urx - 50, y);
					tocPlaceholder.put(title, createTemplate);
				}
			};
			document.add(mark);
		}
	}

	private static void createChapters(int count, Document document, PdfWriter writer) throws Exception {
		BaseFont baseFont = BaseFont.createFont();
		Font chapterFont = FontFactory.getFont(FontFactory.HELVETICA, 24, Font.NORMAL);

		for (int i = 1; i < count + 1; i++) {
			// Append the chapter
			String title = "Chapter " + i;
			Chunk chunk = new Chunk(title, chapterFont).setLocalDestination(title); // thiết lập đích của link ở đây
			Chapter chapter = new Chapter(new Paragraph(chunk), i);
			chapter.setNumberDepth(0);

			chapter.addSection("Foobar1");
			chapter.addSection("Foobar2");
			document.add(chapter);

			// When we wrote the chapter, we now the page number
			PdfTemplate template = tocPlaceholder.get(title);
			template.beginText();
			template.setFontAndSize(baseFont, 12);
			template.setTextMatrix(50 - baseFont.getWidthPoint(String.valueOf(writer.getPageNumber()), 12), 0);
			template.showText(String.valueOf(writer.getPageNumber()));
			template.endText();
		}
	}
}