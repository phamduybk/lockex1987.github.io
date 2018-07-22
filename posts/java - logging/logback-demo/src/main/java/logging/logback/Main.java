package logging.logback;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lordofthejars.foo.FooComponent;

public class Main {

	private static final Logger LOGGER = LoggerFactory.getLogger(Main.class);

	public static void main(String[] args) {
		// Default: Time [Thread] Level Logger - Message
		// Khong can file cau hinh cung chay duoc default
		LOGGER.debug("Cao Thi Thuy Duong");
		
		FooComponent fooComponent = new FooComponent();
		fooComponent.logging();
	}
}
