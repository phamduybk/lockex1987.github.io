package common.testing;

import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameter;
import org.junit.runners.Parameterized.Parameters;

import common.testing.MathUtil;

@RunWith(value = Parameterized.class)
public class ParameterizedFieldTests {

	// Default value = 0
	@Parameter(value = 0)
	public int numberA;

	@Parameter(value = 1)
	public int numberB;

	@Parameter(value = 2)
	public int expected;

	@Parameters(name = "{index}: testAdd({0}+{1}) = {2}")
	public static List<Object[]> data() {
		return Arrays.asList(new Object[][] {
				{ 1, 1, 2 },
				{ 2, 2, 4 },
				{ 8, 2, 10 },
				{ 4, 5, 9 },
				{ 5, 5, 10 }
		});
	}

	@Test
	public void testAdd() {
		assertEquals(expected, MathUtil.add(numberA, numberB));
	}
}
