package itext.demo;

import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.GreekList;
import com.itextpdf.text.List;
import com.itextpdf.text.ListItem;
import com.itextpdf.text.RomanList;
import com.itextpdf.text.ZapfDingbatsList;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * IText has a special list implementation that uses the ZapfDingbats font. It's
 * constructor takes two parameters: The number of the symbol to use as item
 * bullet, and the indentation of the text after the bullet (space between
 * bullet and text).
 */
public class Demo07List {

	public static void main(String[] args) throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_07_list.pdf"));
		document.open();

		List orderedList = new List(List.ORDERED);
		orderedList.add(new ListItem("Item 1"));
		orderedList.add(new ListItem("Item 2"));
		orderedList.add(new ListItem("Item 3"));
		document.add(orderedList);

		List unorderedList = new List(List.UNORDERED);
		unorderedList.add(new ListItem("Item 1"));
		unorderedList.add(new ListItem("Item 2"));
		unorderedList.add(new ListItem("Item 3"));

		RomanList romanList = new RomanList();
		romanList.add(new ListItem("Item 1"));
		romanList.add(new ListItem("Item 2"));
		romanList.add(new ListItem("Item 3"));
		document.add(romanList);

		GreekList greekList = new GreekList();
		greekList.add(new ListItem("Item 1"));
		greekList.add(new ListItem("Item 2"));
		greekList.add(new ListItem("Item 3"));
		document.add(greekList);

		ZapfDingbatsList zapfDingbatsList1 = new ZapfDingbatsList(40, 15);
		zapfDingbatsList1.add(new ListItem("Item 1"));
		zapfDingbatsList1.add(new ListItem("Item 2"));
		zapfDingbatsList1.add(new ListItem("Item 3"));
		document.add(zapfDingbatsList1);

		ZapfDingbatsList zapfDingbatsList2 = new ZapfDingbatsList(43, 30);
		zapfDingbatsList2.add(new ListItem("Item 1"));
		zapfDingbatsList2.add(new ListItem("Item 2"));
		zapfDingbatsList2.add(new ListItem("Item 3"));
		document.add(zapfDingbatsList2);

		ZapfDingbatsList zapfDingbatsList3 = new ZapfDingbatsList(47, 45);
		zapfDingbatsList3.add(new ListItem("Item 1"));
		zapfDingbatsList3.add(new ListItem("Item 2"));
		zapfDingbatsList3.add(new ListItem("Item 3"));
		document.add(zapfDingbatsList3);

		document.add(unorderedList);
		document.close();
	}
}
