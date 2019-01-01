package itext.demo;

import java.io.FileOutputStream;

import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;

public class Demo23DecryptPdf {

	// Chay file EncryptPdfDocument truoc
	public static void main(String[] args) throws Exception {
		String original = "output/demo_22_password_protected.pdf";
		String destination = "output/demo_23_decrypted.pdf";

		String owner = "owner";
		PdfReader reader = new PdfReader(original, owner.getBytes());
		PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(destination));
		stamper.close();
	}
}
