package sandbox.xmlworker;

import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.nio.charset.Charset;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;

public class Demo06HtmlEntities {

	public static void main(String[] args) throws Exception {
		String output = "output/html_06_html_entities.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		String html = "<html>"
				+ "  <head></head>"
				+ "  <body style=\"font-size:12.0pt; font-family:Arial\">"
				+ "    <p>Special symbols: &larr;  &darr; &harr; &uarr; &rarr; &euro; &copy;</p>"
				+ "  </body>"
				+ "</html>";
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new ByteArrayInputStream(html.getBytes()),
				Charset.forName("cp1252"),
				new XMLWorkerFontProvider("resources/fonts/"));

		document.close();
	}
}
