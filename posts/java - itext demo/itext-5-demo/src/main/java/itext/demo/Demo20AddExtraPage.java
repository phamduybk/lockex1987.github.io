package itext.demo;

import java.io.FileOutputStream;

import com.itextpdf.text.Element;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;

/**
 * Thêm trang vào file PDF có sẵn.
 */
public class Demo20AddExtraPage {

	public static void main(String[] args) throws Exception {
		PdfReader reader = new PdfReader("input/demo_20_original.pdf");
		PdfStamper stamper = new PdfStamper(reader, new FileOutputStream("output/demo_20_added.pdf"));

		BaseFont bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.WINANSI, BaseFont.EMBEDDED);
		
		stamper.insertPage(1, PageSize.A4);
		PdfContentByte over = stamper.getOverContent(1);
		over.beginText();
		over.setFontAndSize(bf, 18);
		over.showTextAligned(Element.ALIGN_LEFT, "DUPLICATE OF AN EXISTING PDF DOCUMENT", 30, 600, 0);
		over.endText();
		stamper.close();
	}
}
