package common.util;

import java.util.List;

import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;

/**
 * Lọc thẻ HTML.
 * Thay thế cho Python clean_html.py hiện tại.
 */
public class HtmlCleaner {

	/**
	 * Lọc các thẻ HTML, chỉ giữ lại:
	 * - text thuần
	 * - thẻ p, h1 -> h6
	 * - thẻ a
	 * - thẻ img
	 * 
	 * @param node Node cần lọc (đối tượng của jsoup)
	 * @return Xâu HTML sau khi đã được lọc
	 */
	public String filterTextImageLink(Node node) {
		StringBuilder result = new StringBuilder();
		filterTextImageLink(node, result);
		return result.toString();
	}

	/**
	 * Lọc các thẻ HTML.
	 * Hàm phụ trợ cho hàm filterTextImageLink(Node node).
	 * 
	 * @param node   Node cần lọc
	 * @param result Kết quả nội dung được lọc (kết quả hiện tại, được cập nhật sau
	 *               mỗi lần gọi hàm)
	 */
	private void filterTextImageLink(Node node, StringBuilder result) {
		String nodeName = node.nodeName();

		if (nodeName.equals("#text")) {
			String content = node.toString().trim();
			if (!content.isEmpty() && !isNonBreakingSpace(content)) {
				result.append(String.format("<p>%s</p>\n", content));
			}
		} else if (nodeName.equals("p")
				|| nodeName.equals("table")
				|| nodeName.equals("h1")
				|| nodeName.equals("h2")
				|| nodeName.equals("h3")
				|| nodeName.equals("h4")
				|| nodeName.equals("h5")
				|| nodeName.equals("h6")) {
			Element ele = (Element) node;
			String content = ele.text().trim();
			if (!content.isEmpty() && !isNonBreakingSpace(content)) {
				content = ele.html().trim();
				
				String[] attributes = {
					"style",
					"class",
					"id",
					"name",
					"ng-if",
					"ng-click",
					"ng-non-bindable",
					"spellcheck",
					"border",
					"cellpadding",
					"cellspacing",
					"data-lazy-type",
					"data-lazy-src",
					"data-lazy-srcset",
					"data-lazy-sizes",
					"data-file-",
					"rel",
					"height",
					"width",
					"alt",
					"scope",
					"srcset"
				};
				
				for (String s : attributes) {
					content = content.replaceAll(s + "=\\\"[^\\\"]*\\\"", "");
				}
				
				content = content.replace("&nbsp;", " ");
			    
			    
				result.append(String.format("<%s>%s</%s>\n", nodeName, content, nodeName));
			}
		} else if (nodeName.equals("a")) {
			Element ele = (Element) node;
			String content = ele.text().trim();
			if (!content.isEmpty() && !isNonBreakingSpace(content)) {
				result.append(String.format("<a href='%s'>%s</a>\n", node.attr("href"), content));
			}
		} else if (nodeName.equals("img")) {
			result.append(String.format("<img src='%s'/>\n", node.attr("src")));
		} else if (nodeName.equals("style") || nodeName.equals("script")) {
			result.append(node.outerHtml()).append("\n");
		} else {
			List<Node> children = node.childNodes();
			for (Node e : children) {
				filterTextImageLink(e, result);
			}
		}
	}

	/**
	 * Kiểm tra xem có phải là ký tự khoảng trắng hay không.
	 * 
	 * @param text Xâu cần kiểm tra
	 * @return true nếu là ký tự khoảng trắng, ngược lại là false
	 */
	public boolean isNonBreakingSpace(String text) {
		return text.equals(Character.toString((char) 160))
				|| text.equals("&nbsp;");
	}
}
