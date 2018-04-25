package common.testing;

import org.junit.Test;

public class TimeoutTests {

	@Test(timeout = 1000)
	public void testInfinity() {
		while (true)
			;
	}
}
