package sandbox.events;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

class Background extends PdfPageEventHelper {

	@Override
	public void onEndPage(PdfWriter writer, Document document) {
		int pagenumber = writer.getPageNumber();
		if (pagenumber % 2 == 1 && pagenumber != 1) {
			return;
		}

		PdfContentByte canvas = writer.getDirectContentUnder();
		Rectangle rect = document.getPageSize();
		canvas.setColorFill(pagenumber < 3 ? BaseColor.BLUE : BaseColor.LIGHT_GRAY);
		canvas.rectangle(rect.getLeft(), rect.getBottom(), rect.getWidth(), rect.getHeight());
		canvas.fill();
	}
}

/**
 * Tô màu background các trang: 2 trang đầu màu xanh dương,
 * trang chẵn thì màu xám, trang lẻ thì mặc định (màu trắng).
 */
public class Event01PageBackgrounds {

	public static void main(String[] args) throws Exception {
		String output = "output/event_01_page_backgrounds.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));

		// Add sự kiện cho đối tượng writer
		Background event = new Background();
		writer.setPageEvent(event);

		document.open();
		document.add(new Paragraph("Prime Numbers"));
		document.newPage();
		document.add(new Paragraph("An overview"));
		document.newPage();

		for (int i = 2; i < 301; i++) {
			// Lấy ra danh sách ước số
			List<Integer> factors = getFactors(i);

			if (factors.size() == 1) {
				document.add(new Paragraph("This is a prime number!"));
			}
			for (int factor : factors) {
				document.add(new Paragraph("Factor: " + factor));
			}
			document.newPage();
		}

		document.close();
	}

	/**
	 * Lấy ra danh sách các ước số của số cho trước.
	 * 
	 * @param n
	 *            Số cho trước
	 * @return Danh sách ước số
	 */
	private static List<Integer> getFactors(int n) {
		List<Integer> factors = new ArrayList<>();
		for (int i = 2; i <= n; i++) {
			while (n % i == 0) {
				factors.add(i);
				n /= i;
			}
		}
		return factors;
	}
}
