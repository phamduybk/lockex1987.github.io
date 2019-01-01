package itext.demo;

import java.io.FileOutputStream;
import java.io.OutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

public class Demo01HelloWorld {

	public static void main(String[] args) throws Exception {
		String output = "output/demo_01_hello_world.pdf";
		OutputStream os = new FileOutputStream(output);

		Document document = new Document();
		//Document document = new Document(PageSize.A4, 50, 50, 50, 50);
		PdfWriter.getInstance(document, os);
		document.open();

		document.add(new Paragraph("A Hello World PDF document."));

		document.close();
	}
}
