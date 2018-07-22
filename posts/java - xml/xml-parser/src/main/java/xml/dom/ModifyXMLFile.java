package xml.dom;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import common.util.CommonUtils;

public class ModifyXMLFile {

	public static void main(String argv[]) {
		try {
			String path = CommonUtils.getAbsolutePathByClassLoader("file.xml");
			
			DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(path);

			Node staff = doc.getElementsByTagName("staff").item(0);

			// Update staff attribute
			NamedNodeMap attr = staff.getAttributes();
			Node nodeAttr = attr.getNamedItem("id");
			nodeAttr.setTextContent("2");

			// Append a new node to staff
			Element age = doc.createElement("age");
			age.appendChild(doc.createTextNode("28"));
			staff.appendChild(age);

			// Loop the staff child node
			NodeList list = staff.getChildNodes();
			for (int i = 0; i < list.getLength(); i++) {
				Node node = list.item(i);

				// Get the salary element, and update the value
				if ("salary".equals(node.getNodeName())) {
					node.setTextContent("2000000");
				}

				// Remove first name
				if ("firstname".equals(node.getNodeName())) {
					staff.removeChild(node);
				}
			}

			// Write the content into XML file
			String output = "file-output.xml";
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource source = new DOMSource(doc);
			StreamResult result = new StreamResult(new File(output));
			transformer.transform(source, result);

			System.out.println("Done");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
