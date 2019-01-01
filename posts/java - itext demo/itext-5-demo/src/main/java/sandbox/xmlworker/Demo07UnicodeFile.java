package sandbox.xmlworker;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.Charset;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;

public class Demo07UnicodeFile {

	public static void main(String[] args) throws IOException, DocumentException {
		String output = "output/html_07_unicode.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		String input = "input/html_07_unicode.html";
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input),
				Charset.forName("UTF-8"));

		document.close();
	}
}
