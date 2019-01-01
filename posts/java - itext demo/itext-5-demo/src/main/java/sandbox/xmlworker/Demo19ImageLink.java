package sandbox.xmlworker;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.AbstractImageProvider;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;
import com.itextpdf.tool.xml.pipeline.html.LinkProvider;

public class Demo19ImageLink {

	public static void main(String[] args) throws Exception {
		thisWillNotWork();
		thisWillWork();
	}

	private static void thisWillNotWork() throws Exception {
		String output = "output/html_19_image_oops.pdf";
		OutputStream os = new FileOutputStream(output);

		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, os);
		document.open();

		String input = "input/html_19_image.html";
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(input),
				Charset.forName("UTF-8"));

		document.close();
	}

	private static void thisWillWork() throws Exception {
		String output = "output/html_19_image_worked.pdf";
		OutputStream os = new FileOutputStream(output);

		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, os);
		document.open();

		// CSS
		CSSResolver cssResolver = XMLWorkerHelper.getInstance().getDefaultCssResolver(true);

		// HTML
		HtmlPipelineContext htmlContext = new HtmlPipelineContext(null);
		htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());
		htmlContext.setImageProvider(new AbstractImageProvider() {

			@Override
			public String getImageRootPath() {
				// Chú ý: đường dẫn ảnh đã có images rồi nên không còn images ở đây nữa
				return "input/";
			}
		});
		htmlContext.setLinkProvider(new LinkProvider() {

			@Override
			public String getLinkRoot() {
				return "https://safenet.vn/";
			}
		});

		// Pipelines
		PdfWriterPipeline pdf = new PdfWriterPipeline(document, writer);
		HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
		CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);
		XMLWorker worker = new XMLWorker(css, true);
		XMLParser parser = new XMLParser(worker);

		// Parse
		String input = "input/html_19_image.html";
		parser.parse(new FileInputStream(input));

		document.close();
	}
}
