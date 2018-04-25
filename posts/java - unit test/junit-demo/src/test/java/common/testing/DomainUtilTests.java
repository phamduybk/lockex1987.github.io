package common.testing;

import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import common.testing.DomainUtil;

@RunWith(value = Parameterized.class)
public class DomainUtilTests {

	private String domain;
	private boolean expected;

	public DomainUtilTests(String domain, boolean expected) {
		this.domain = domain;
		this.expected = expected;
	}

	@Parameters(name = "{index}: isValid({0})={1}")
	public static List<Object[]> data() {
		return Arrays.asList(new Object[][] {
				{ "google.com", true },
				{ "laptrinh.vn", true },
				{ "-laptrinh.vn", false },
				{ "laptrinh-.vn", false },
				{ "3423kjk", false },
				{ "mk#$kdo.com", false }
		});
	}

	@Test
	public void testIsValidDomainName() {
		assertEquals(expected, DomainUtil.isValidDomainName(domain));
	}
}
