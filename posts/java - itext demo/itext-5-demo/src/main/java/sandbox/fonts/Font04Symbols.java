package sandbox.fonts;

import java.io.FileOutputStream;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;

import common.util.CommonUtils;

public class Font04Symbols {

	public static void main(String[] args) throws Exception {
		String path1 = CommonUtils.getAbsolutePathByClassLoader("fonts/free-sans/FreeSans.ttf");
		BaseFont bf1 = BaseFont.createFont(path1, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
		Font f1 = new Font(bf1, 12);

		String path2 = CommonUtils.getAbsolutePathByClassLoader("fonts/cardo/Cardo-Regular.ttf");
		BaseFont bf2 = BaseFont.createFont(path2, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
		Font f2 = new Font(bf2, 12);
		
		Font zapfdingbats = new Font(Font.FontFamily.ZAPFDINGBATS, 14);

		String output = "output/font_04_symbols.pdf";
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		String s1 = "This string contains special characters like this  \u2208, \u2229, \u2211, \u222b, \u2206";
		Paragraph p1 = new Paragraph(s1, f1);
		document.add(p1);

		String s2 = "The Cardo family of fonts supports this character: \u2609";
		Paragraph p2 = new Paragraph(s2, f2);
		document.add(p2);
		
		Chunk chunk = new Chunk("o", zapfdingbats);
		Paragraph p3 = new Paragraph("This is a tick box character: ");
        p3.add(chunk);
        document.add(p3);

		document.close();
	}

}
