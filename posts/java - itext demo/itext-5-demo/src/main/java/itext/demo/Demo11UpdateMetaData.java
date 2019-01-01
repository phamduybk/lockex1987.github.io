package itext.demo;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.util.HashMap;

import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.itextpdf.text.xml.xmp.XmpWriter;

public class Demo11UpdateMetaData {

	// Chay file AddMetaData truoc
	public static void main(String[] args) throws Exception {
		// Read existing pdf document
		PdfReader reader = new PdfReader("output/demo_10_add_meta_data.pdf");
		PdfStamper stamper = new PdfStamper(reader, new FileOutputStream("output/demo_11_updated_meta_data.pdf"));

		// Get and edit meta-data
		HashMap<String, String> info = reader.getInfo();
		info.put("Subject", "Hello World");
		info.put("Author", "your name");
		info.put("Keywords", "iText pdf");
		info.put("Title", "Hello World stamped");
		info.put("Creator", "your name");
		info.put("Producer", "sdfmlkqsdjflqsjf");

		// Add updated meta-data to pdf
		stamper.setMoreInfo(info);

		// Update xmp meta-data
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		XmpWriter xmp = new XmpWriter(baos, info);
		xmp.close();
		stamper.setXmpMetadata(baos.toByteArray());
		stamper.close();
	}
}
