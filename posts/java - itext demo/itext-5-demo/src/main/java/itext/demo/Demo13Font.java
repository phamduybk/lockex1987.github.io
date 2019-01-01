package itext.demo;

import java.io.FileOutputStream;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfWriter;

/**
 *
 */
public class Demo13Font {

	public static void main(String[] args) throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_13_font.pdf"));
		document.open();

		Font font1 = new Font(Font.FontFamily.HELVETICA, 25, Font.BOLD);
		Font font2 = new Font(Font.FontFamily.COURIER, 18, Font.ITALIC | Font.UNDERLINE);
		Font font3 = new Font(Font.FontFamily.TIMES_ROMAN, 27);

		document.add(new Chunk("This is sentence 1. ", font1));
		document.add(new Phrase("This is sentence 2. ", font2));
		document.add(new Paragraph("This is sentence 3. ", font3));

		document.close();
	}
}
