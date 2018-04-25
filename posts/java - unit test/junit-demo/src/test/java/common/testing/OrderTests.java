package common.testing;

import static org.junit.Assert.*;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

// Sorts by method name
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class OrderTests {

	@Test
	public void testB() {
		assertEquals(2, 1 + 1);
	}

	@Test
	public void test1() {
		assertEquals(2, 1 + 1);
	}

	@Test
	public void testA() {
		assertEquals(2, 1 + 1);
	}

	@Test
	public void test2() {
		assertEquals(2, 1 + 1);
	}

	@Test
	public void testC() {
		assertEquals(2, 1 + 1);
	}
}
