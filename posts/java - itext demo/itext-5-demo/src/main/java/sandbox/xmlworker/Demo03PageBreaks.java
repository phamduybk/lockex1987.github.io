package sandbox.xmlworker;

import java.io.FileInputStream;
import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;

public class Demo03PageBreaks {

    public static void main(String[] args) throws Exception {
		String output = "output/html_03_page_breaks.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();
		
	    String input = "input/html_03_page_breaks.html";
        XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input));

        document.close();
    }
}
