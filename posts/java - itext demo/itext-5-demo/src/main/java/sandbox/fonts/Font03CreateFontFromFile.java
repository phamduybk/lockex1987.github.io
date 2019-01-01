package sandbox.fonts;

import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;

import common.util.CommonUtils;

public class Font03CreateFontFromFile {

	public static void main(String[] args) throws Exception {
		String filePath = CommonUtils.getAbsolutePathByClassLoader("fonts/free-sans/FreeSans.ttf");
		Font f1 = FontFactory.getFont(filePath, "Cp1250", true);
		Font f2 = FontFactory.getFont(filePath, BaseFont.IDENTITY_H, true);

		String output = "output/font_03_create_font_from_file.pdf";
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();
		Paragraph p1 = new Paragraph("Testing of letters \u010c,\u0106,\u0160,\u017d,\u0110", f1);
		document.add(p1);
		Paragraph p2 = new Paragraph("Testing of letters \u010c,\u0106,\u0160,\u017d,\u0110", f2);
		document.add(p2);
		Paragraph p3 = new Paragraph("Testing of letters \u010c,\u0106,\u0160,\u017d,\u0110");
		document.add(p3);
		document.close();
	}
}
