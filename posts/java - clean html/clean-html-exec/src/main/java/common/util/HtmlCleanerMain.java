package common.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class HtmlCleanerMain {

	public static void main(String[] args) throws Exception {
		HtmlCleanerMain obj = new HtmlCleanerMain();
		String filePath = args[0]; //"/home/lockex1987/new/story - tong hop bat hat ru/index.html";
		obj.process(filePath);
	}

	public void process(String filePath) throws Exception {
		File file = new File(filePath);
		Document doc = Jsoup.parse(file, "UTF-8");
		HtmlCleaner htmlCleaner = new HtmlCleaner();
		String bodyContent = (htmlCleaner.filterTextImageLink(doc.body()));
		String headContent = doc.head().outerHtml();
		String fullContent = "<!DOCTYPE html>\n"
				+ "<html lang=\"vi\">\n"
				+ headContent
				+ "\n"
				+ "<body>\n"
				+ bodyContent
				+ "</body>\n"
				+ "</html>";
		this.writeFile(filePath, fullContent);
	}

	private void writeFile(String filePath, String fullContent) throws IOException {
		PrintWriter pw = new PrintWriter(new FileWriter(filePath, false));
		pw.append(fullContent);
		pw.close();
	}
}
