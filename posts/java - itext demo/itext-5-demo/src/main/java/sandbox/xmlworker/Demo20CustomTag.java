package sandbox.xmlworker;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.ExceptionConverter;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.BarcodeEAN;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.NoCustomContextException;
import com.itextpdf.tool.xml.Tag;
import com.itextpdf.tool.xml.WorkerContext;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.html.Span;
import com.itextpdf.tool.xml.html.TagProcessorFactory;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.ctx.MapContext;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;

public class Demo20CustomTag {

	public static void main(String[] args) throws Exception {
		String output = "output/html_20_custom_tag.pdf";
		OutputStream os = new FileOutputStream(output);

		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, os);
		document.open();

		// CSS
		CSSResolver cssResolver = XMLWorkerHelper.getInstance().getDefaultCssResolver(false);

		// HTML
		HtmlPipelineContext htmlContext = new HtmlPipelineContext(null);
		TagProcessorFactory factory = Tags.getHtmlTagProcessorFactory();
		factory.addProcessor(
				new Span() {
					@Override
					public List<Element> end(WorkerContext ctx, Tag tag, List<Element> l) {
						List<Element> list = new ArrayList<Element>(1);
						list.add(getEanBarcodeChunk(ctx, tag.getAttributes()));
						return list;
					}
				},
				"ean");
		htmlContext.setTagFactory(factory);
		htmlContext.autoBookmark(false);

		// Pipelines
		PdfWriterPipeline pdf = new PdfWriterPipeline(document, writer);
		HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
		CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);
		XMLWorker worker = new XMLWorker(css, true);
		XMLParser parser = new XMLParser(worker);

		// Parse
		String input = "input/html_20_custom_tag.html";
		parser.parse(new FileInputStream(input));

		document.close();
	}

	private static Chunk getEanBarcodeChunk(WorkerContext ctx, Map<String, String> attributes) {
		MapContext mc;
		try {
			mc = (MapContext) ctx.get("com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline");
		} catch (NoCustomContextException ex) {
			throw new ExceptionConverter(ex);
		}
		PdfWriter writer = (PdfWriter) mc.get("WRITER");
		BarcodeEAN barcode = new BarcodeEAN();
		String type = attributes.get("type");
		if ("EAN8".equals(type))
			barcode.setCodeType(BarcodeEAN.EAN8);
		else
			barcode.setCodeType(BarcodeEAN.EAN13);
		barcode.setCode(attributes.get("value"));
		Image img = barcode.createImageWithBarcode(writer.getDirectContent(), null, null);
		return new Chunk(img, 0, 0, true);
	}
}
