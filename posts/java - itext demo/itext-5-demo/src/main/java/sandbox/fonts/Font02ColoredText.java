package sandbox.fonts;

import java.io.FileOutputStream;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfWriter;

public class Font02ColoredText {

	public static void main(String[] args) throws Exception {
		String output = "output/font_02_colored_text.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		Font red = new Font(FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.RED);
		Chunk redText = new Chunk("This text is red. ", red);
		Font blue = new Font(FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.BLUE);
		Chunk blueText = new Chunk("This text is blue and bold. ", blue);
		Font green = new Font(FontFamily.HELVETICA, 12, Font.ITALIC, BaseColor.GREEN);
		Chunk greenText = new Chunk("This text is green and italic. ", green);

		Paragraph p1 = new Paragraph(redText);
		document.add(p1);
		Paragraph p2 = new Paragraph();
		p2.add(blueText);
		p2.add(greenText);
		document.add(p2);

		ColumnText ct = new ColumnText(writer.getDirectContent());
		ct.setSimpleColumn(new Rectangle(36, 600, 144, 760));
		ct.addElement(p1);
		ct.addElement(p2);
		ct.go();

		document.close();
	}
}
