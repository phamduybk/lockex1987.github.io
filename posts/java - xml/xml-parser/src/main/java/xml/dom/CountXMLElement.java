package xml.dom;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import common.util.CommonUtils;

public class CountXMLElement {

	public static void main(String[] args) {
		try {
			String path = CommonUtils.getAbsolutePathByClassLoader("staff.xml");
			
			DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(path);

			NodeList nodeList = doc.getElementsByTagName("staff");
			System.out.println("Total of elements: " + nodeList.getLength());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
