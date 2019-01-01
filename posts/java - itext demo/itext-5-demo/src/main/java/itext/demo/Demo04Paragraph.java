package itext.demo;

import java.io.FileOutputStream;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * In a paragraph you can set the paragraph alignment, indentation and spacing
 * before and after the paragraph.
 */
public class Demo04Paragraph {

	public static void main(String[] args) throws Exception {
		test1();
		test2();
		test3();
	}

	private static void test1() throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_04_paragraph_01.pdf"));
		document.open();

		Paragraph paragraph = new Paragraph();
		for (int i = 0; i < 10; i++) {
			Chunk chunk = new Chunk("This is a sentence which is long " + i + ". ");
			paragraph.add(chunk);
		}
		document.add(paragraph);

		document.close();
	}

	private static void test2() throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_04_paragraph_02.pdf"));
		document.open();

		Paragraph paragraph1 = new Paragraph();

		Paragraph paragraph2 = new Paragraph();
		paragraph2.setSpacingAfter(25);
		paragraph2.setSpacingBefore(125);
		paragraph2.setAlignment(Element.ALIGN_CENTER);
		paragraph2.setIndentationLeft(50);
		paragraph2.setIndentationRight(50);

		for (int i = 0; i < 10; i++) {
			Chunk chunk = new Chunk("This is a sentence which is long " + i + ". ");
			paragraph1.add(chunk);
			paragraph2.add(chunk);
		}

		document.add(paragraph1);
		document.add(paragraph2);

		document.close();
	}

	private static void test3() throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_04_paragraph_03.pdf"));
		document.open();

		// Left
		Paragraph paragraph = new Paragraph("This is right aligned text");
		paragraph.setAlignment(Element.ALIGN_RIGHT);
		document.add(paragraph);

		// Centered
		paragraph = new Paragraph("This is centered text");
		paragraph.setAlignment(Element.ALIGN_CENTER);
		document.add(paragraph);

		// Left
		paragraph = new Paragraph("This is left aligned text");
		paragraph.setAlignment(Element.ALIGN_LEFT);
		document.add(paragraph);

		// Left with indentation
		paragraph = new Paragraph("This is left aligned text with indentation");
		paragraph.setAlignment(Element.ALIGN_LEFT);
		paragraph.setIndentationLeft(50);
		document.add(paragraph);

		document.close();
	}
}
