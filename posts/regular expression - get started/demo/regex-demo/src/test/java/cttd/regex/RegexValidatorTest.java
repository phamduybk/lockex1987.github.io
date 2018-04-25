package cttd.regex;

import static org.junit.Assert.assertEquals;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Ignore;
import org.junit.Test;

public class RegexValidatorTest {

	/**
	 * d nghia la ky so (digit)
	 * D nghia la khong phai ky so (non-digit)
	 */
	@Test
	@Ignore
	public void testMetaCharacter() {
		// false (non-digit)
		assertEquals(false, Pattern.matches("\\d", "abc"));
		// true (digit va xuat hien mot lan)
		assertEquals(true, Pattern.matches("\\d", "1"));
		// false (digit nhung xuat hien nhieu hon mot lan)
		assertEquals(false, Pattern.matches("\\d", "4443"));
		assertEquals(true, Pattern.matches("\\d+", "4443"));
		// false (digit va char)
		assertEquals(false, Pattern.matches("\\d", "323abc"));

		// false (non-digit nhung xuat hien nhieu hon mot lan)
		assertEquals(false, Pattern.matches("\\D", "abc"));
		// false (digit)
		assertEquals(false, Pattern.matches("\\D", "1"));
		// false (digit)
		assertEquals(false, Pattern.matches("\\D", "4443"));
		// false (digit va char)
		assertEquals(false, Pattern.matches("\\D", "323abc"));
		// true (non-digit va xuat hien mot lan)
		assertEquals(true, Pattern.matches("\\D", "m"));
		// true (non-digit va co the xuat hien 0 hoac nhieu lan)
		assertEquals(true, Pattern.matches("\\D*", "mak"));
	}

	@Test
	@Ignore
	public void testStringMatches() {
		assertEquals(true, "a".matches("."));
		assertEquals(false, "abc".matches("."));
		assertEquals(true, "abc".matches(".*"));
		assertEquals(true, "m".matches("^m"));
		assertEquals(false, "mnp".matches("^m"));
		assertEquals(true, "mnp".matches("^m.+"));
		assertEquals(true, "p".matches("p$"));
		assertEquals(false, "2nnp".matches("p$"));
		assertEquals(true, "2nnp".matches(".n{1,3}p$"));
		assertEquals(true, "2ybcd".matches("2[xyz].+"));
		assertEquals(true, "2bkbv".matches(".+[abc][zv].*"));
	}

	@Test
	public void testIsNumeric() {
		assertEquals(true, RegexValidator.isNumeric("123.456"));
		assertEquals(false, RegexValidator.isNumeric("123.456a"));
	}

	@Test
	public void testCheckUsername() {
		assertEquals(true, RegexValidator.checkUserName("quanpm123"));
		assertEquals(true, RegexValidator.checkUserName("quanpm_imic"));
		assertEquals(true, RegexValidator.checkUserName("quanpm-imic"));

		assertEquals(false, RegexValidator.checkUserName("ab"));
		assertEquals(false, RegexValidator.checkUserName("ab@abc"));
		assertEquals(true, RegexValidator.checkUserName("abc123_-"));
	}

	@Test
	@Ignore
	public void matcherLookingAt() {
		// Bắt đầu bởi I tiếp theo là ký tự bất kỳ.
		// Tiếp theo là ký tự a hoặc e.
		// lookingAt() tìm kiếm khớp phần đầu
		// Trong khi matches() phải khớp toàn bộ
		// Reset matcher với text mới, country2
		String regex = "^I.[ae]";
		Pattern p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);

		String country1 = "iran";
		Matcher m = p.matcher(country1);

		System.out.println("lookingAt = " + m.lookingAt());
		System.out.println("matches = " + m.matches());

		String country2 = "Iraq";
		m.reset(country2);

		System.out.println("lookingAt = " + m.lookingAt());
		System.out.println("matches = " + m.matches());
	}

	@Test
	public void testValidEmails() {
		String[] a = {
				"mkyong@yahoo.com",
				"mkyong-100@yahoo.com",
				"mkyong.100@yahoo.com",
				"mkyong111@mkyong.com",
				"mkyong-100@mkyong.net",
				"mkyong.100@mkyong.com.au",
				"mkyong@1.com",
				"mkyong@gmail.com.com",
				"mkyong+100@gmail.com",
				"mkyong-100@yahoo-test.com"
		};
		for (String s : a) {
			assertEquals(true, RegexValidator.validateEmail(s));
		}
	}

	@Test
	public void testInvalidEmails() {
		String[] a = {
				"mkyong",
				"mkyong@.com.my",
				"mkyong123@gmail.a",
				"mkyong123@.com",
				"mkyong123@.com.com",
				".mkyong@mkyong.com",
				"mkyong()*@gmail.com",
				"mkyong@%*.com",
				"mkyong..2002@gmail.com",
				"mkyong.@gmail.com",
				"mkyong@mkyong@gmail.com",
				"mkyong@gmail.com.1a"
		};
		for (String s : a) {
			assertEquals(false, RegexValidator.validateEmail(s));
		}
	}
}
