package common.testing;

import static org.junit.Assert.*;

import org.junit.Ignore;
import org.junit.Test;

public class IgnoreTests {

	@Test
	public void testMath1() {
		assertEquals(2, 1 + 1);
	}

	@Ignore
	@Test
	public void testMath2() {
		assertEquals(5, 1 + 2);
	}

	@Ignore("Some one please create a test for Math3!")
	@Test
	public void testMath3() {
		// ...
	}
}
