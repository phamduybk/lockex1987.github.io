package itext.demo;

import java.io.FileOutputStream;
import java.io.OutputStream;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * Notice how sentence 1 and sentence 6 are printed ontop of each other. The
 * IText Chunk object does not add line breaks, paragraph spacing or any other
 * kind of spacing. It just adds the raw text at the next available location,
 * left to right. When it reaches the right edge of the document, it restarts
 * from the left edge, at the same Y location (same height).
 */
public class Demo02Chunk {

	public static void main(String[] args) throws Exception {
		String output = "output/demo_02_chunk.pdf";
		OutputStream os = new FileOutputStream(output);
		Document document = new Document();
		PdfWriter.getInstance(document, os);
		document.open();

		document.add(new Chunk("This is sentence 1. "));
		document.add(new Chunk("This is sentence 2. "));
		document.add(new Chunk("This is sentence 3. "));
		document.add(new Chunk("This is sentence 4. "));
		document.add(new Chunk("This is sentence 5. "));
		document.add(new Chunk("This is sentence 6. "));

		document.close();
	}
}
