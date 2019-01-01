package sandbox.xmlworker;

import java.io.FileInputStream;
import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Utilities;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.ElementList;
import com.itextpdf.tool.xml.XMLWorkerHelper;

public class Demo09ListClean {

	public static void main(String[] args) throws Exception {
		String DEST = "output/html_09_list_clean.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(DEST));
		writer.setInitialLeading(12);
		document.open();

		String input = "input/html_09_list_clean.html";
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input));

		String html = Utilities.readFileToString(input);
		String css = "ul { list-style: disc }"
				+ "li { padding: 10px }";
		ElementList elements = XMLWorkerHelper.parseToElementList(html, css);
		for (Element e : elements) {
			document.add(e);
		}

		document.close();
	}
}
