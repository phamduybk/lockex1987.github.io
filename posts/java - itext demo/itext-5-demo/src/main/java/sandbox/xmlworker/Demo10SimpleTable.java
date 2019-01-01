package sandbox.xmlworker;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.charset.Charset;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;

public class Demo10SimpleTable {

	public static void main(String[] args) throws Exception {
		parse1();
		parse2();
		parse3();
		parse4();
	}

	private static void parse1() throws Exception {
		String output = "output/html_10_table_1.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		String input = "input/html_10_table_1.html";
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input));

		document.close();
	}

	private static void parse2() throws Exception {
		Rectangle pagesize = new Rectangle(PageSize.A4);
		pagesize.setBackgroundColor(new BaseColor(0xFF, 0xFF, 0xEE));

		String output = "output/html_10_table_2.pdf";
		Document document = new Document(pagesize);
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		String input = "input/html_10_table_2.html";
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input),
				Charset.forName("cp1252"),
				new XMLWorkerFontProvider("resources/fonts/"));

		document.close();
	}
	
	private static void parse3() throws Exception {
		String output = "output/html_10_table_3.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();
		
		String input = "input/html_10_table_3.html";
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input),
				Charset.forName("cp1252"),
				new XMLWorkerFontProvider("resources/fonts/"));

		document.close();
	}
	
	private static void parse4() throws Exception {
		String output = "output/html_10_table_4.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		String input = "input/html_10_table_4.html";
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input),
				Charset.forName("cp1252"),
				new XMLWorkerFontProvider("resources/fonts/"));

		document.close();
	}
}
