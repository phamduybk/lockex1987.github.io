package common.testing;

import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import common.testing.MathUtil;

@RunWith(value = Parameterized.class)
public class ParameterizedConstructorTests {

	private int numberA;
	private int numberB;
	private int expected;

	// Parameters pass via this constructor
	// for {8, 2, 10}, numberA = 8, numberB = 2, expected = 10
	public ParameterizedConstructorTests(int numberA, int numberB, int expected) {
		this.numberA = numberA;
		this.numberB = numberB;
		this.expected = expected;
	}

	// Declares parameters here
	@Parameters(name = "{index}: add({0}+{1})={2}")
	public static List<Object[]> data() {
		return Arrays.asList(new Object[][] {
				{ 1, 1, 2 },
				{ 2, 2, 4 },
				{ 8, 2, 10 },
				{ 4, 5, 9 }
		});
	}

	@Test
	public void testAdd() {
		assertEquals(expected, MathUtil.add(numberA, numberB));
	}
}
