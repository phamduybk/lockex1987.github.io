package itext.demo;

import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.GrayColor;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfGState;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.itextpdf.text.pdf.PdfWriter;

class WatermarkPageEvent extends PdfPageEventHelper {

	private static final Font FONT = new Font(Font.FontFamily.HELVETICA, 52, Font.BOLD, new GrayColor(0.85f));

	@Override
	public void onEndPage(PdfWriter writer, Document document) {
		ColumnText.showTextAligned(writer.getDirectContentUnder(),
				Element.ALIGN_CENTER,
				new Phrase("Memorynotfound.com", FONT),
				297.5f,
				421,
				writer.getPageNumber() % 2 == 1 ? 45 : -45);
	}
}

/**
 * Thêm WaterMark vào một trang mới.
 */
public class Demo21Watermark {

	public static void main(String[] args) throws Exception {
		addWatermarkToNewFile();
		addWatermarkToExistingFile();
	}

	/**
	 * Thêm watermark khi tạo file mới.
	 */
	private static void addWatermarkToNewFile() throws Exception {
		Document document = new Document(PageSize.A4, 36, 36, 90, 36);
		PdfWriter writer = PdfWriter.getInstance(document,
				new FileOutputStream("output/demo_21_watermark_new_file.pdf"));

		// Add watermark
		writer.setPageEvent(new WatermarkPageEvent());

		// Write to document
		document.open();

		document.add(new Paragraph("Testing."));
		document.newPage();
		document.add(new Paragraph("Testing."));
		document.newPage();

		document.close();
	}

	/**
	 * Thêm watermark dạng ảnh hoặc text vào file có sẵn.
	 */
	private static void addWatermarkToExistingFile() throws Exception {
		// Read existing pdf
		PdfReader reader = new PdfReader("input/demo_21_original.pdf");
		PdfStamper stamper = new PdfStamper(reader, new FileOutputStream("output/demo_21_watermark_update_file.pdf"));

		// Text watermark
		Font font = new Font(Font.FontFamily.HELVETICA, 34, Font.BOLD, new GrayColor(0.5f));
		Phrase phrase = new Phrase("Memorynotfound (watermark)", font);

		// Image watermark
		Image img = Image.getInstance("input/demo_21_logo.jpg");
		img.scalePercent(10f);
		float w = img.getScaledWidth();
		float h = img.getScaledHeight();

		// Loop over every page
		int n = reader.getNumberOfPages();
		for (int i = 1; i <= n; i++) {

			// Get page size and position
			Rectangle pagesize = reader.getPageSizeWithRotation(i);
			float x = (pagesize.getLeft() + pagesize.getRight()) / 2;
			float y = (pagesize.getTop() + pagesize.getBottom()) / 2;
			PdfContentByte over = stamper.getOverContent(i);
			over.saveState();

			// Set transparency
			PdfGState state = new PdfGState();
			state.setFillOpacity(0.2f);
			over.setGState(state);

			// Add watermark text and image
			if (i % 2 == 1) {
				ColumnText.showTextAligned(over, Element.ALIGN_CENTER, phrase, x, y, 0);
			} else {
				over.addImage(img, w, 0, 0, h, x - (w / 2), y - (h / 2));
			}

			over.restoreState();
		}

		stamper.close();
		reader.close();
	}
}
