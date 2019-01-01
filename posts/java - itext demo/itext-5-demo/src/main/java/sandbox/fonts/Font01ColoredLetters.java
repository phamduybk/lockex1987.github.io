package sandbox.fonts;

import java.io.FileOutputStream;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

public class Font01ColoredLetters {

	private static final Font RED_NORMAL = new Font(FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.RED);
	private static final Font BLUE_BOLD = new Font(FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.BLUE);
	private static final Font GREEN_ITALIC = new Font(FontFamily.HELVETICA, 12, Font.ITALIC, BaseColor.GREEN);

	private static final Chunk B = new Chunk("b", BLUE_BOLD);
	private static final Chunk G = new Chunk("g", GREEN_ITALIC);

	public static void main(String[] args) throws Exception {
		String output = "output/font_01_colored_letters.pdf";
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();
		Paragraph p = new Paragraph();
		String s = "all text is written in red, except the letters b and g; they are written in blue and green.";
		for (int i = 0; i < s.length(); i++) {
			p.add(returnCorrectColor(s.charAt(i)));
		}
		document.add(p);
		document.close();
	}

	private static Chunk returnCorrectColor(char letter) {
		if (letter == 'b') {
			return B;
		} else if (letter == 'g') {
			return G;
		}
		return new Chunk(String.valueOf(letter), RED_NORMAL);
	}
}
