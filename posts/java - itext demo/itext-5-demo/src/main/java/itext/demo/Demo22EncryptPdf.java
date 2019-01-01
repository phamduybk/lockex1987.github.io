package itext.demo;

import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

public class Demo22EncryptPdf {

	public static void main(String[] args) throws Exception {
		String output = "output/demo_22_password_protected.pdf";
		Document document = new Document(PageSize.A4);
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));

		// Secure pdf with password protection
		String user = "user";
		String owner = "owner";
		writer.setEncryption(
				user.getBytes(),
				owner.getBytes(),
				PdfWriter.ALLOW_COPY | PdfWriter.ALLOW_PRINTING,
				PdfWriter.ENCRYPTION_AES_256 | PdfWriter.DO_NOT_ENCRYPT_METADATA);

		document.open();
		document.add(new Paragraph("Secure Pdf with Password using iText"));
		document.close();
	}
}
