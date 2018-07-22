package xml.sax;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class StaffHandler extends DefaultHandler {

	private boolean bfname = false;
	private boolean blname = false;
	private boolean bnname = false;
	private boolean bsalary = false;

	@Override
	public void startElement(String uri, String localName, String qName,
			Attributes attributes) throws SAXException {
		// System.out.println("Start Element :" + qName);
		if (qName.equalsIgnoreCase("FIRSTNAME")) {
			bfname = true;
		} else if (qName.equalsIgnoreCase("LASTNAME")) {
			blname = true;
		} else if (qName.equalsIgnoreCase("NICKNAME")) {
			bnname = true;
		} else if (qName.equalsIgnoreCase("SALARY")) {
			bsalary = true;
		}
	}

	@Override
	public void endElement(String uri, String localName, String qName)
			throws SAXException {
		// System.out.println("End Element :" + qName);
	}

	@Override
	public void characters(char ch[], int start, int length)
			throws SAXException {
		String value = new String(ch, start, length);
		if (bfname) {
			System.out.println("First name : " + value);
			bfname = false;
		} else if (blname) {
			System.out.println("Last name : " + value);
			blname = false;
		} else if (bnname) {
			System.out.println("Nick name : " + value);
			bnname = false;
		} else if (bsalary) {
			System.out.println("Salary : " + value);
			bsalary = false;
		}
	}
}
