package logging.slf4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Simple Logging Facade For Java (slf4j) is a simple facade for various logging frameworks,
 * like JDK logging (java.util.logging), log4j, or logback.
 */
public class Main {

	private static final Logger LOGGER = LoggerFactory.getLogger(Main.class);

	public static void main(String[] args) {
		LOGGER.debug("Cao Thi Thuy Duong");
		String name = "CTTD";
		LOGGER.debug("In bar my name is {}.", name);
	}
}
