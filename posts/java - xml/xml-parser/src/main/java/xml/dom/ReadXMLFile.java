package xml.dom;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import common.util.CommonUtils;

import org.w3c.dom.Node;
import org.w3c.dom.Element;
import java.io.File;

public class ReadXMLFile {

	public static void main(String[] args) {
		try {
			String path = CommonUtils.getAbsolutePathByClassLoader("staff.xml");
			File file = new File(path);

			DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(file);

			// Optional, but recommended
			// Read this:
			// http://stackoverflow.com/questions/13786607/normalization-in-dom-parsing-with-java-how-does-it-work
			doc.getDocumentElement().normalize();

			System.out.println("Root element: " + doc.getDocumentElement().getNodeName());

			NodeList nodeList = doc.getElementsByTagName("staff");
			System.out.println("----------------------------");
			for (int i = 0; i < nodeList.getLength(); i++) {
				Node node = nodeList.item(i);
				System.out.println("\nCurrent Element :" + node.getNodeName());
				if (node.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element) node;
					System.out.println("Staff ID: " + eElement.getAttribute("id"));
					System.out.println("First name: " + eElement.getElementsByTagName("firstname").item(0).getTextContent());
					System.out.println("Last name: " + eElement.getElementsByTagName("lastname").item(0).getTextContent());
					System.out.println("Nick name: " + eElement.getElementsByTagName("nickname").item(0).getTextContent());
					System.out.println("Salary: " + eElement.getElementsByTagName("salary").item(0).getTextContent());
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
