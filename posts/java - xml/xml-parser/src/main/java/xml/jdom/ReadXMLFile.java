package xml.jdom;

import java.io.File;
import java.util.List;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;

import common.util.CommonUtils;

public class ReadXMLFile {

	public static void main(String[] args) {
		String path = CommonUtils.getAbsolutePathByClassLoader("staff.xml");
		File file = new File(path);

		try {
			SAXBuilder builder = new SAXBuilder();
			Document doc = (Document) builder.build(file);
			Element root = doc.getRootElement();
			List<Element> nodeList = root.getChildren("staff");

			for (Element node : nodeList) {
				System.out.println("ID: " + node.getAttributeValue("id"));
				System.out.println("First name: " + node.getChildText("firstname"));
				System.out.println("Last name: " + node.getChildText("lastname"));
				System.out.println("Nick name: " + node.getChildText("nickname"));
				System.out.println("Salary: " + node.getChildText("salary"));
				System.out.println();
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
