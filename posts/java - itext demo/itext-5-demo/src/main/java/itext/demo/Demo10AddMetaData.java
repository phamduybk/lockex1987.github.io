package itext.demo;

import java.io.FileOutputStream;
import java.util.Locale;

import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * iText allows to add metadata to the PDF which can be viewed in your Adobe
 * Reader under File -> Properties.
 */
public class Demo10AddMetaData {

	public static void main(String[] args) throws Exception {
		String output = "output/demo_10_add_meta_data.pdf";
		Document document = new Document(PageSize.A4);
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));

		// Add meta-data to pdf
		document.addAuthor("Memorynotfound");
		document.addCreationDate();
		document.addCreator("Memorynotfound.com");
		document.addTitle("Add meta data to PDF");
		document.addSubject("how to add meta data to pdf using itext");
		document.addKeywords("java, itext, pdf, meta-data");
		document.addLanguage(Locale.ENGLISH.getLanguage());
		document.addHeader("type", "tutorial, example");

		// Add xmp meta data
		writer.createXmpMetadata();

		document.open();
		document.add(new Paragraph("Add meta-data to PDF using iText"));
		document.close();
	}
}
