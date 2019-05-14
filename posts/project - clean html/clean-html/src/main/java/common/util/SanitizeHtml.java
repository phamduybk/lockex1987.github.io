package common.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.safety.Whitelist;

public class SanitizeHtml {

	public static String sanitizeSource(String unsafeHtml) {
		Whitelist whitelist = getWhitelist();
		Document.OutputSettings outputSettings = getOutputSettings();
		String safeHtml = Jsoup.clean(unsafeHtml, "http://base.uri", whitelist, outputSettings);
		return safeHtml;
	}

	private static Whitelist getWhitelist() {
		// Chuẩn hóa tránh lỗi XSS
		// Whitelist whitelist = Whitelist.basic();
		Whitelist whitelist = Whitelist.relaxed();
		whitelist.preserveRelativeLinks(true);

		// Thẻ p cho thuộc tính style để có thể align, ví dụ <p style="text-align: right;">
		whitelist.addAttributes("p", "style");

		// Thẻ div có thuộc tính style để có thể align
		whitelist.addAttributes("div", "style");
		
		// Thẻ a thêm thuộc tính target (target="_blank" để mở ở tab khác)
		whitelist.addAttributes("a", "target");
		
		// Nhúng YouTube video
		whitelist.addTags("iframe");
		whitelist.addAttributes("iframe", "allowfullscreen", "frameborder", "src", "width", "height", "gesture", "allow");

		// Thêm thẻ audio, video
		whitelist.addTags("audio", "video");
		whitelist.addAttributes("audio", "controls", "controlslist", "src", "style");
		whitelist.addAttributes("video", "controls", "controlslist", "src", "style");
		return whitelist;
	}

	private static Document.OutputSettings getOutputSettings() {
		// Nếu chỉ lấy phần body thì XHTML luôn rồi
		// Nếu lấy cả thì thẻ meta chưa có thẻ đóng, chưa là XHTML, cần thêm đoạn sau
		Document.OutputSettings outputSettings = new Document.OutputSettings();
		// outputSettings.escapeMode(EscapeMode.xhtml); // không được
		outputSettings.syntax(Document.OutputSettings.Syntax.xml);
		return outputSettings;
	}
}
