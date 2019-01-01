package sandbox.xmlworker;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.CssFile;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.html.CssAppliers;
import com.itextpdf.tool.xml.html.CssAppliersImpl;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;

import common.util.CommonUtils;

public class Demo15HtmlFont {

	public static void main(String[] args) throws Exception {
		String output = "output/html_15_font.pdf";
		OutputStream os = new FileOutputStream(output);
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, os);
		document.open();

		// CSS
		CSSResolver cssResolver = new StyleAttrCSSResolver();
		CssFile cssFile = XMLWorkerHelper.getCSS(new FileInputStream("input/html_15_font.css"));
		//CssFile cssFile = XMLWorkerHelper.getCSS(new ByteArrayInputStream("body {font-family:tsc fming s tt}".getBytes()));
		cssResolver.addCss(cssFile);

		// HTML
		XMLWorkerFontProvider fontProvider = new XMLWorkerFontProvider(XMLWorkerFontProvider.DONTLOOKFORFONTS);
		fontProvider.register(CommonUtils.getAbsolutePathByClassLoader("fonts/times/times.ttf"));
		fontProvider.register(CommonUtils.getAbsolutePathByClassLoader("fonts/times/timesbd.ttf"));
		fontProvider.register(CommonUtils.getAbsolutePathByClassLoader("fonts/times/timesbi.ttf"));
		fontProvider.register(CommonUtils.getAbsolutePathByClassLoader("fonts/times/timesi.ttf"));
		CssAppliers cssAppliers = new CssAppliersImpl(fontProvider);
		HtmlPipelineContext htmlContext = new HtmlPipelineContext(cssAppliers);
		htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());

		// Pipelines
		PdfWriterPipeline pdf = new PdfWriterPipeline(document, writer);
		HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
		CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);
		XMLWorker worker = new XMLWorker(css, true);
		XMLParser parser = new XMLParser(worker);

		// Parse
		String HTML = "input/html_15_font.html";
		parser.parse(new FileInputStream(HTML));

		document.close();
	}
}
