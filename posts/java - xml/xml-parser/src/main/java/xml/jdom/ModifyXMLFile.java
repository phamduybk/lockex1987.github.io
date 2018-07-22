package xml.jdom;

import java.io.File;
import java.io.FileWriter;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

import common.util.CommonUtils;

public class ModifyXMLFile {

	public static void main(String[] args) {
		String path = CommonUtils.getAbsolutePathByClassLoader("file.xml");
		File file = new File(path);
		try {
			SAXBuilder builder = new SAXBuilder();

			Document doc = (Document) builder.build(file);
			Element root = doc.getRootElement();

			// Update staff id attribute
			Element staff = root.getChild("staff");
			staff.getAttribute("id").setValue("2");

			// Add new age element
			Element age = new Element("age").setText("28");
			staff.addContent(age);

			// Update salary value
			staff.getChild("salary").setText("7000");

			// Remove first name element
			staff.removeChild("firstname");

			XMLOutputter xmlOutput = new XMLOutputter();

			// Display nice nice
			String output = "file-output.xml";
			xmlOutput.setFormat(Format.getPrettyFormat());
			xmlOutput.output(doc, new FileWriter(output));

			// xmlOutput.output(doc, System.out);

			System.out.println("File updated!");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
