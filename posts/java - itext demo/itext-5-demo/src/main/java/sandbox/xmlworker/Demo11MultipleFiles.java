package sandbox.xmlworker;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Utilities;
import com.itextpdf.text.pdf.PdfCopy;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.ElementList;
import com.itextpdf.tool.xml.XMLWorkerHelper;

public class Demo11MultipleFiles {

	private static final String[] inputs = {
			"input/html_11_page1.html",
			"input/html_11_page2.html",
			"input/html_11_page3.html"
	};

	public static void main(String[] args) throws Exception {
		createPdf1();
		createPdf2();
	}

	private static void createPdf1() throws IOException, DocumentException {
		String output = "output/html_11_multiple_1.pdf";
		Document document = new Document();
		PdfCopy copy = new PdfCopy(document, new FileOutputStream(output));
		document.open();

		for (String html : inputs) {
			PdfReader reader = new PdfReader(parseHtml(html));
			copy.addDocument(reader);
			reader.close();
		}

		document.close();
	}

	private static void createPdf2() throws IOException, DocumentException {
		String output = "output/html_11_multiple_2.pdf";
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		String css = "";// readCSS();
		for (String htmlfile : inputs) {
			String html = Utilities.readFileToString(htmlfile);
			ElementList elements = XMLWorkerHelper.parseToElementList(html, css);
			for (Element e : elements) {
				document.add(e);
			}
			document.newPage();
		}

		document.close();
	}
	
	private static byte[] parseHtml(String html) throws DocumentException, IOException {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, baos);
		document.open();
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(html));
		document.close();
		return baos.toByteArray();
	}

	private static String readCSS() throws IOException {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		int length;
		InputStream is = XMLWorkerHelper.class.getResourceAsStream("/default.css");
		while ((length = is.read(buffer)) != -1) {
			baos.write(buffer, 0, length);
		}
		return new String(baos.toByteArray());
	}	
}
