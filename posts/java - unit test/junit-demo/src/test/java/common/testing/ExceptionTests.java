package common.testing;

import org.junit.Test;

public class ExceptionTests {

	@Test(expected = ArithmeticException.class)
	public void testDevideZero() {
		int n = 1 / 0;
	}
}
