package sandbox.xmlworker;

import java.io.FileInputStream;
import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;

public class Demo08ListDirty {

	public static void main(String[] args) throws Exception {
		String output = "output/html_08_list_dirty.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		writer.setInitialLeading(12);
		document.open();

		String input = "input/html_08_list_dirty.html";
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input));

		document.close();
	}
}
