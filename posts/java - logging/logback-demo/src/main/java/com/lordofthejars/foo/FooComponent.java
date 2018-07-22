package com.lordofthejars.foo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FooComponent {

	private static final Logger LOGGER = LoggerFactory.getLogger(FooComponent.class);

	public void logging() {
		LOGGER.info("Info from Foo.");

		// Notice that debug lines in foo method are not shown. This is ok, because we have set to
		// be in this way.
		LOGGER.debug("Debug from Foo.");
	}
}
