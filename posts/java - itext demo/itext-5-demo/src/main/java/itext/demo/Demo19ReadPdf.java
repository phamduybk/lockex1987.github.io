package itext.demo;

import java.io.FileOutputStream;
import java.io.IOException;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfImportedPage;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * IText can modify existing PDF files in many different ways. Here I'll just
 * cover one of the most used modifications - stamping an existing PDF with text
 * or images. Get the book "IText in Action" to get the full story on
 * manipulating existing PDF documents.
 * 
 * If you already have a finished PDF, and just want to add a header, footer or
 * watermark to it, IText provides the com.itextpdf.pdf.PdfStamper class.
 * 
 * First you read the existing document using a PdfReader, then modify it using
 * the PdfStamper.
 */
public class Demo19ReadPdf {

	public static void main(String[] args) throws Exception {
		addWatermarkToExisting();
		extractEvenPages();
	}

	private static void addWatermarkToExisting() {
		try {
			PdfReader reader = new PdfReader("input/demo_19_sample.pdf");
			PdfStamper stamper = new PdfStamper(reader, new FileOutputStream("output/demo_19_stamped.pdf"));
			Image image = Image.getInstance("input/demo_19_watermark.jpg");
			for (int i = 1; i <= reader.getNumberOfPages(); i++) {
				// System.out.println(i);
				PdfContentByte content = stamper.getUnderContent(i);
				image.setAbsolutePosition(100f, 700f);
				content.addImage(image);
			}
			stamper.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}

	private static void extractEvenPages() throws Exception {
		String output = "output/demo_19_only_even_pages.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		String input = "input/demo_19_sample.pdf";
		PdfReader reader = new PdfReader(input);
		int n = reader.getNumberOfPages();

		// Go through all pages
		for (int i = 1; i <= n; i++) {
			// Only page number 2 will be included
			if (i == 2) {
				PdfImportedPage page = writer.getImportedPage(reader, i);
				Image instance = Image.getInstance(page);
				document.add(instance);
			}
		}

		document.close();
	}
}
