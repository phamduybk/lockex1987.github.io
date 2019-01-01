package itext.demo;

import java.io.FileOutputStream;

import com.itextpdf.text.Anchor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * The com.itextpdf.text.Anchor class in IText represents an link, either to an
 * external website, or internally in the document. The anchor (link) can be
 * clicked just like a link in a web page.
 */
public class Demo06Anchor {

	public static void main(String[] args) throws Exception {
		test1();
		test2();
	}

	private static void test1() throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_06_anchor_external.pdf"));
		document.open();

		Paragraph paragraph = new Paragraph();
		paragraph.add(new Phrase("You can find the IText tutorial at "));
		Anchor anchor = new Anchor("http://tutorials.jenkov.com/java-itext/index.html");
		anchor.setReference("http://tutorials.jenkov.com/java-itext/index.html");
		paragraph.add(anchor);
		document.add(paragraph);

		document.close();
	}

	private static void test2() throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_06_anchor_internal.pdf"));
		document.open();

		Anchor anchor = new Anchor("Jump down to next paragraph");
		anchor.setReference("#linkTarget");
		Paragraph paragraph = new Paragraph();
		paragraph.add(anchor);
		document.add(paragraph);

		for (int i = 0; i < 100; i++) {
			document.add(new Paragraph(new Phrase("CTTD")));
		}

		Anchor anchorTarget = new Anchor("This is the target of the link above");
		anchor.setName("linkTarget");
		Paragraph targetParagraph = new Paragraph();
		targetParagraph.setSpacingBefore(50);
		targetParagraph.add(anchorTarget);
		document.add(targetParagraph);

		document.close();
	}
}
