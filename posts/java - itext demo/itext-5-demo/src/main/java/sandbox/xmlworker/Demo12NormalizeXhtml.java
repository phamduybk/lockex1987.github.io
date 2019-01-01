package sandbox.xmlworker;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document.OutputSettings;
import org.jsoup.safety.Whitelist;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;

/**
 * Converts an HTML file into an XTHML file.
 */
public class Demo12NormalizeXhtml {

	public static void main(String[] args) throws Exception {
		String name = "html_12_dirty_html";

		String inputFile = "input/" + name + ".html";
		String normalizedFile = "output/" + name + "_normalized.html";
		String pdfFailedFile = "output/" + name + "_failed.pdf";
		String pdfSuccessFile = "output/" + name + "_success.pdf";

		SanitizeHtml sanitizeHtml = new SanitizeHtml();
		sanitizeHtml.sanitizeFile(inputFile, normalizedFile);

		try {
			exportPdf(inputFile, pdfFailedFile);
		} catch (Exception ex) {
			System.out.println("Có lỗi xảy ra: " + ex.getMessage());
		}

		exportPdf(normalizedFile, pdfSuccessFile);

		System.out.println("Finish");
	}

	private static void exportPdf(String input, String output) throws Exception {
		OutputStream os = new FileOutputStream(output);

		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, os);
		document.open();

		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input));

		document.close();
	}
}

class SanitizeHtml {

	/**
	 * Chuẩn hóa từ 1 file, ghi ra một file khác.
	 * 
	 * @param inputFile
	 * @param normalizedFile
	 * @throws Exception
	 */
	public void sanitizeFile(String inputFile, String normalizedFile) throws Exception {
		org.jsoup.nodes.Document document = Jsoup.parse(new File(inputFile), "UTF-8");
		String safeHtml = sanitize(document);
		writeFile(safeHtml, normalizedFile);
	}

	public String sanitize(org.jsoup.nodes.Document document) {
		// Nếu chỉ lấy phần body thì XHTML luôn rồi
		// Nếu lấy cả thì thẻ meta chưa có thẻ đóng, chưa là XHTML, cần thêm đoạn sau
		// document.outputSettings().syntax(OutputSettings.Syntax.xml);

		// Chuẩn hóa tránh lỗi XSS
		// Whitelist whitelist = Whitelist.basic();
		Whitelist whitelist = Whitelist.relaxed();

		// Chỉ lấy phần body
		String unsafeHtml = document.body().html();
		String safeHtml = Jsoup.clean(unsafeHtml, whitelist);

		return safeHtml;
	}

	/**
	 * Ghi text ra file.
	 * 
	 * @param safeHtml
	 * @param normalizedFile
	 * @throws Exception
	 */
	private void writeFile(String safeHtml, String normalizedFile) throws Exception {
		byte[] xhtml = safeHtml.getBytes();

		// Ghi ra file
		FileOutputStream fos = new FileOutputStream(normalizedFile);
		fos.write(xhtml);
		fos.close();
	}
}