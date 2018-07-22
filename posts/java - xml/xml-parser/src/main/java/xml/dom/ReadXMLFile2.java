package xml.dom;

import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import common.util.CommonUtils;

public class ReadXMLFile2 {

	public static void main(String[] args) {
		try {
			String path = CommonUtils.getAbsolutePathByClassLoader("staff.xml");
			File file = new File(path);

			DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(file);

			System.out.println("Root element: " + doc.getDocumentElement().getNodeName());
			if (doc.hasChildNodes()) {
				printNote(doc.getChildNodes());
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void printNote(NodeList nodeList) {
		for (int i = 0; i < nodeList.getLength(); i++) {
			Node node = nodeList.item(i);
			if (node.getNodeType() == Node.ELEMENT_NODE) {
				System.out.println("\nNode Name = " + node.getNodeName() + " [OPEN]");
				System.out.println("Node Value = " + node.getTextContent());
				
				// Get attributes
				if (node.hasAttributes()) {
					NamedNodeMap nodeMap = node.getAttributes();
					for (int j = 0; j < nodeMap.getLength(); j++) {
						Node attr = nodeMap.item(j);
						System.out.println("attr name: " + attr.getNodeName());
						System.out.println("attr value: " + attr.getNodeValue());
					}
				}
				if (node.hasChildNodes()) {
					printNote(node.getChildNodes());
				}
				System.out.println("Node Name = " + node.getNodeName() + " [CLOSE]");
			}
		}
	}
}
