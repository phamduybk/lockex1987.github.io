package itext.demo;

import java.io.FileOutputStream;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * The Phrase class knows how to add spacing between lines. Phrase objects knows
 * how to add line spacing if the added phrase exceeds the right edge of the
 * document. It does not, however, add extra space between paragraphs. For this,
 * you need to use a Paragraph object.
 */
public class Demo03Phrase {

	public static void main(String[] args) throws Exception {
		test1();
		test2();
	}

	private static void test1() throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_03_phrase_01.pdf"));
		document.open();

		document.add(new Phrase("This is sentence 1. "));
		document.add(new Phrase("This is sentence 2. "));
		document.add(new Phrase("This is sentence 3. "));
		document.add(new Phrase("This is sentence 4. "));
		document.add(new Phrase("This is sentence 5. "));
		document.add(new Phrase("This is sentence 6. "));

		document.close();
	}

	private static void test2() throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_03_phrase_02.pdf"));
		document.open();

		Chunk chunk = new Chunk("This is a sentence ");

		// You can change the line spacing by passing spacing as a parameter to the
		// Phrase constructor, like this
		Phrase phrase = new Phrase(50);

		phrase.add(chunk);
		phrase.add(chunk);
		phrase.add(chunk);
		phrase.add(chunk);
		phrase.add(chunk);
		phrase.add(chunk);
		document.add(phrase);

		document.close();
	}
}
