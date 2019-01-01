package sandbox.xmlworker;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;

public class Demo02ParseFile {

	public static void main(String[] args) throws Exception {
		parseFileSimple();
		parseFileWithExternalCss();
	}

	private static void parseFileSimple() throws Exception {
		String output = "output/html_02.pdf";
		OutputStream os = new FileOutputStream(output);

		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, os);
		document.open();

		String input = "input/html_02.html";
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input));

		document.close();
	}

	/**
	 * Không làm được kiểu link đến file CSS ngoài.
	 */
	private static void parseFileWithExternalCss() throws Exception {
		String output = "output/html_02_2.pdf";
		OutputStream os = new FileOutputStream(output);

		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, os);
		document.open();

		String input = "input/html_02_2.html";
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input));

		document.close();
	}
}
