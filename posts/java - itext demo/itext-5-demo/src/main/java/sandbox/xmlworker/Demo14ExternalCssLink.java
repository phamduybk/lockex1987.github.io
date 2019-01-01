package sandbox.xmlworker;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.net.FileRetrieve;
import com.itextpdf.tool.xml.net.FileRetrieveImpl;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;

public class Demo14ExternalCssLink {

    public static void main(String[] args) throws Exception {
    	String output = "output/html_14_external_css_link.pdf";
        OutputStream os = new FileOutputStream(output);
    
        Document document = new Document();
        PdfWriter writer = PdfWriter.getInstance(document, os);
        //writer.setInitialLeading(12.5f);
        document.open();
 
        // CSS
        CSSResolver cssResolver = XMLWorkerHelper.getInstance().getDefaultCssResolver(false);
        String cssDir = "input/";
        FileRetrieve retrieve = new FileRetrieveImpl(cssDir);
        cssResolver.setFileRetrieve(retrieve);
 
        // HTML
        HtmlPipelineContext htmlContext = new HtmlPipelineContext(null);
        htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());
        htmlContext.autoBookmark(false);
 
        // Pipelines
        PdfWriterPipeline pdf = new PdfWriterPipeline(document, writer);
        HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
        CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);
        XMLWorker worker = new XMLWorker(css, true);
        XMLParser parser = new XMLParser(worker);
        
        String input = "input/html_14_external_css_link.html";
        parser.parse(new FileInputStream(input));
 
        document.close();
    }
}
