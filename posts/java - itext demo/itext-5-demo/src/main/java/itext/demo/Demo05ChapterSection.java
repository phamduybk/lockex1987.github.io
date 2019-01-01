package itext.demo;

import java.io.FileOutputStream;

import com.itextpdf.text.Chapter;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Section;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * Chapter chứa Section.
 */
public class Demo05ChapterSection {

	public static void main(String[] args) throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_05_chapter_section.pdf"));
		document.open();

		Paragraph paragraph = new Paragraph();
		paragraph.add(new Phrase("This is a chapter."));

		Chapter chapter = new Chapter(paragraph, 1);
		Section section1 = chapter.addSection("This is section 1", 2);
		Section section2 = chapter.addSection("This is section 2", 2);
		document.add(chapter);

		document.close();
	}
}
