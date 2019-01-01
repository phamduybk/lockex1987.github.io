package itext.demo;

import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.ElementList;
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

public class Demo18Unicode {

	public static void main(String[] args) throws Exception {
		String output = "output/unicode.pdf";
		OutputStream os = new FileOutputStream(output);

		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, os);
		document.open();

		addNormalContent(document);
		String htmlText = "<h1>Cậu b&eacute; mang h&agrave;nh đến trường để cầu may</h1>"
				+ "<h2>Cậu b&eacute; mẫu gi&aacute;o ở Trung Quốc đ&atilde; trở n&ecirc;n nổi tiếng v&igrave; mang một chiếc ba l&ocirc; đặc biệt tới trường, trong đ&oacute; c&oacute; h&agrave;nh, mỳ t&ocirc;m, t&aacute;o...</h2>";
		parseHtmlThatDoesNotWork(document, htmlText);
		parseHtmlThatWork(document, writer, htmlText, false);
		parseHtmlThatWork(document, writer, htmlText, true);

		document.close();
	}

	private static void addNormalContent(Document document) throws Exception {
		// String fontPath =
		// CommonUtils.getAbsolutePathByClassLoader("fonts/times/times.ttf");
		String fontPath = CommonUtils.getAbsolutePathByClassLoader("fonts/free-sans/FreeSans.ttf");
		BaseFont bf = BaseFont.createFont(fontPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
		Font font = new Font(bf);

		// Thêm nội dung vào file
		// Phải chỉ định font, nếu không sẽ hiển thị không được
		String text = "Tiếng Việt, Cao Thị Thùy Dương, Nguyễn Văn Huyên";
		document.add(new Paragraph(text));
		document.add(new Paragraph(text, font));
	}

	private static void parseHtmlThatDoesNotWork(Document document, String htmlText) throws Exception {
		String cssStyles = "h1, h2 { font-family: 'Times New Roman', Georgia, Serif; }";
		ElementList list = XMLWorkerHelper.parseToElementList(htmlText, cssStyles);
		for (Element e : list) {
			document.add(e);
		}
	}

	/**
	 * Phải thêm 3 chỗ: font provider, CSS font-family, Stream encoding
	 */
	private static void parseHtmlThatWork(Document document, PdfWriter writer, String htmlText, boolean useEncoding) throws Exception {
		// CSS
		CSSResolver cssResolver = new StyleAttrCSSResolver();
		String cssStyles = "p, h1, h2, body { font-family: 'Times New Roman', Georgia, Serif; }"
				+ "h1 { font-size: 30px; }";
		CssFile cssFile = XMLWorkerHelper.getCSS(new ByteArrayInputStream(cssStyles.getBytes()));
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
		
		if (useEncoding) {
			Charset cs = StandardCharsets.UTF_8;
			parser.parse(new ByteArrayInputStream(htmlText.getBytes(cs)), cs);
		} else {
			parser.parse(new ByteArrayInputStream(htmlText.getBytes()));
		}
	}
}
