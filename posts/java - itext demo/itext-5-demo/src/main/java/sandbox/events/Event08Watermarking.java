package sandbox.events;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.StringTokenizer;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

class Watermark extends PdfPageEventHelper {

	private static final Phrase WATERMARK = new Phrase("WATERMARK", new Font(FontFamily.HELVETICA, 60, Font.NORMAL, BaseColor.LIGHT_GRAY));

	@Override
	public void onEndPage(PdfWriter writer, Document document) {
		PdfContentByte canvas = writer.getDirectContentUnder();
		ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, WATERMARK, 298, 421, 45);
	}
}

public class Event08Watermarking {

	public static void main(String[] args) throws Exception {
		String output = "output/event_08_watermark.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));
		
		writer.setPageEvent(new Watermark());
		document.open();
		
		PdfPTable table = new PdfPTable(3);
		table.setWidthPercentage(100);
		table.setWidths(new int[] { 4, 1, 3 });
		
		// Đọc file CSV
		String input = "input/event_08_watermark.csv";
		BufferedReader br = new BufferedReader(new FileReader(input));
		
		Font tableHeaderFont = new Font(FontFamily.HELVETICA, 12, Font.BOLD);
		Font tableContentFont = new Font();
		
		// Đọc dòng header
		String line = br.readLine();
		process(table, line, tableHeaderFont);
		table.setHeaderRows(1);
		
		// Đọc tiếp các dòng dữ liệu
		while ((line = br.readLine()) != null) {
			process(table, line, tableContentFont);
		}
		br.close();
		
		document.add(table);
		document.close();
	}

	public static void process(PdfPTable table, String line, Font font) {
		StringTokenizer tokenizer = new StringTokenizer(line, ";");
		int c = 0;
		while (tokenizer.hasMoreTokens() && c++ < 3) {
			table.addCell(new Phrase(tokenizer.nextToken(), font));
		}
	}
}
