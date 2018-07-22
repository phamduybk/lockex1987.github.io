package xml.jaxb;

import java.io.File;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import xml.model.Customer;

public class JAXBExample {

	private static final String PATH = "jaxb.xml";

	public static void main(String[] args) {
		//objectToXml();
		xmlToObject();
	}

	private static void objectToXml() {
		// Tao doi tuong Java
		Customer customer = new Customer();
		customer.setId(100);
		customer.setName("mkyong");
		customer.setAge(29);
		
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance(Customer.class);
			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

			// Output pretty printed
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

			jaxbMarshaller.marshal(customer, new File(PATH));
			jaxbMarshaller.marshal(customer, System.out);
		} catch (JAXBException e) {
			e.printStackTrace();
		}
	}

	private static void xmlToObject() {
		try {
			File file = new File(PATH);
			JAXBContext jaxbContext = JAXBContext.newInstance(Customer.class);

			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			Customer customer = (Customer) jaxbUnmarshaller.unmarshal(file);
			System.out.println(customer);
		} catch (JAXBException e) {
			e.printStackTrace();
		}
	}
}
