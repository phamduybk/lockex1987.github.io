package sandbox.fonts;

import java.io.FileOutputStream;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.Type3Font;

public class Font05Logo {

	public static void main(String[] args) throws Exception {
		String output = "output/font_05_logo.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();
		
		float linewidth = 125;
		Type3Font t3 = new Type3Font(writer, true);
		PdfContentByte i = t3.defineGlyph('I', 700, 0, 0, 1200, 600);
		i.setColorStroke(new BaseColor(0xf9, 0x9d, 0x25));
		i.setLineWidth(linewidth);
		i.setLineCap(PdfContentByte.LINE_CAP_ROUND);
		i.moveTo(600, 36);
		i.lineTo(600, 564);
		i.stroke();
		PdfContentByte t = t3.defineGlyph('T', 1170, 0, 0, 1200, 600);
		t.setColorStroke(new BaseColor(0x08, 0x49, 0x75));
		t.setLineWidth(linewidth);
		t.setLineCap(PdfContentByte.LINE_CAP_ROUND);
		t.moveTo(144, 564);
		t.lineTo(1056, 564);
		t.moveTo(600, 36);
		t.lineTo(600, 564);
		t.stroke();
		PdfContentByte e = t3.defineGlyph('E', 1150, 0, 0, 1200, 600);
		e.setColorStroke(new BaseColor(0xf8, 0x9b, 0x22));
		e.setLineWidth(linewidth);
		e.setLineCap(PdfContentByte.LINE_CAP_ROUND);
		e.moveTo(144, 36);
		e.lineTo(1056, 36);
		e.moveTo(144, 300);
		e.lineTo(1056, 300);
		e.moveTo(144, 564);
		e.lineTo(1056, 564);
		e.stroke();
		PdfContentByte x = t3.defineGlyph('X', 1160, 0, 0, 1200, 600);
		x.setColorStroke(new BaseColor(0x10, 0x46, 0x75));
		x.setLineWidth(linewidth);
		x.setLineCap(PdfContentByte.LINE_CAP_ROUND);
		x.moveTo(144, 36);
		x.lineTo(1056, 564);
		x.moveTo(144, 564);
		x.lineTo(1056, 36);
		x.stroke();

		Font font = new Font(t3, 20);
		Paragraph p = new Paragraph("ITEXT", font);
		document.add(p);
		p = new Paragraph(20, "I\nT\nE\nX\nT", font);
		document.add(p);

		document.close();
	}
}
