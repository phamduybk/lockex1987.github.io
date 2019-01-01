package sandbox.xmlworker;

import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.CssFile;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;

public class Demo16ParseHtmlText {

	public static void main(String[] args) throws Exception {
		String output = "output/html_16_html_text.pdf";
		OutputStream os = new FileOutputStream(output);

		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, os);
		document.open();

		// CSS
		CSSResolver cssResolver = new StyleAttrCSSResolver();
		String cssStyles = "tr { text-align: center; } th { background-color: lightgreen; padding: 3px; } td {background-color: lightblue;  padding: 3px; }";
		CssFile cssFile = XMLWorkerHelper.getCSS(new ByteArrayInputStream(cssStyles.getBytes()));
		cssResolver.addCss(cssFile);

		// HTML
		HtmlPipelineContext htmlContext = new HtmlPipelineContext(null);
		htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());

		// Pipelines
		PdfWriterPipeline pdf = new PdfWriterPipeline(document, writer);
		HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
		CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);
		XMLWorker worker = new XMLWorker(css, true);
		XMLParser parser = new XMLParser(worker);

		// Parse
		String htmlText = getHtml();
		parser.parse(new ByteArrayInputStream(htmlText.getBytes()));

		document.close();
	}

	private static String getHtml() {
		StringBuilder sb = new StringBuilder();
		sb.append("<table border=\"2\">");
		sb.append("<tr>");
		sb.append("<th>Sr. No.</th>");
		sb.append("<th>Text Data</th>");
		sb.append("<th>Number Data</th>");
		sb.append("</tr>");
		for (int i = 0; i < 10;) {
			i++;
			sb.append("<tr>");
			sb.append("<td>");
			sb.append(i);
			sb.append("</td>");
			sb.append("<td>This is text data ");
			sb.append(i);
			sb.append("</td>");
			sb.append("<td>");
			sb.append(i);
			sb.append("</td>");
			sb.append("</tr>");
		}
		sb.append("</table>");
		return sb.toString();
	}
}
