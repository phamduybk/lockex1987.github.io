package sandbox.xmlworker;

import java.io.FileInputStream;
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

public class Demo13ParseHtmlPipelines {

	public static void main(String[] args) throws Exception {
		String output = "output/html_13_pipelines.pdf";
		OutputStream os = new FileOutputStream(output);

		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, os);
		//writer.setInitialLeading(12.5f);
		document.open();
		
		//processPipeline(document, writer);
		processPipelineWithCssFile(document, writer);

		document.close();
	}

	private static void processPipeline(Document document, PdfWriter writer) throws Exception {
		// CSS
		CSSResolver cssResolver = XMLWorkerHelper.getInstance().getDefaultCssResolver(false);

		// HTML
		HtmlPipelineContext htmlContext = new HtmlPipelineContext(null);
		htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());
		htmlContext.autoBookmark(false);

		// Pipelines (PDF -> HTML -> CSS -> Worker -> Parser)
		// PDF = document + writer
		// HTML = PDF + htmlContext
		// CSS = HTML + cssResolver
		// Worker = CSS
		// Parser = Worker
		PdfWriterPipeline pdf = new PdfWriterPipeline(document, writer);
		HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
		CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);
		XMLWorker worker = new XMLWorker(css, true);
		XMLParser parser = new XMLParser(worker);
		
		// Parse
		String input = "input/html_13_pipelines.html";
		parser.parse(new FileInputStream(input));
	}
	
	private static void processPipelineWithCssFile(Document document, PdfWriter writer) throws Exception {
        // CSS
        CSSResolver cssResolver = new StyleAttrCSSResolver();
        CssFile cssFile = XMLWorkerHelper.getCSS(new FileInputStream("input/html_13_pipelines.css"));
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

        String input = "input/html_13_pipelines.html";
        parser.parse(new FileInputStream(input));		
	}
}
