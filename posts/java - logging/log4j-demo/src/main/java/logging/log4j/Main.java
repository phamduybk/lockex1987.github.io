package logging.log4j;

import org.apache.log4j.Logger;

public class Main {

	private static final Logger LOGGER = Logger.getLogger(Main.class);

	public static void main(String[] args) {
		LOGGER.debug("This is debug");
		LOGGER.info("This is info");
		LOGGER.warn("This is warn");
		try {
			double n = 1 / 0;
		} catch (Exception ex) {
			LOGGER.error("This is error", ex);
		}
		LOGGER.fatal("This is fatal");
	}
}
