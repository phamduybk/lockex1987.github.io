package xml.sax;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.helpers.DefaultHandler;

import common.util.CommonUtils;

public class ReadXMLFile {

	public static void main(String argv[]) {
		try {
			SAXParserFactory factory = SAXParserFactory.newInstance();
			SAXParser parser = factory.newSAXParser();

			DefaultHandler handler = new StaffHandler();

			// String path = CommonUtils.getAbsolutePathByClassLoader("staff-utf8.xml");
			String path = CommonUtils.getAbsolutePathByClassLoader("staff.xml");
			parser.parse(path, handler);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
