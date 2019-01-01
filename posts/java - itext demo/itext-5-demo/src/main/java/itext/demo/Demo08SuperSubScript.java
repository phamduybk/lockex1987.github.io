package itext.demo;

import java.io.FileOutputStream;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * Sử dụng hàm setTextRise. You can write text as superscript or subscript using
 * the Chunk class, and it's setTextRise() method. You use a positive text rise
 * value for superscript, and a negative text rise value for subscript.
 */
public class Demo08SuperSubScript {

	public static void main(String[] args) throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_08_super_and_sub_script.pdf"));
		document.open();

		Chunk normalText = new Chunk("Normal text at normal y-location. ");
		document.add(normalText);

		Chunk superScript = new Chunk("Superscript");
		superScript.setTextRise(5f);
		document.add(superScript);

		Chunk moreNormalText = new Chunk(". More normal y-location text. ");
		document.add(moreNormalText);

		Chunk subScript = new Chunk("Subscript");
		subScript.setTextRise(-5f);
		document.add(subScript);

		document.close();
	}
}
