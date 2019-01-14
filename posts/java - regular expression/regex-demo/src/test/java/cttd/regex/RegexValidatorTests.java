package cttd.regex;

import static org.junit.Assert.assertEquals;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Ignore;
import org.junit.Test;

public class RegexValidatorTests {
	
	@Test
	@Ignore
	public void stringMatches() {
	    // Kiểm tra toàn bộ s1
	    // Khớp với bất kỳ ký tự nào
	    // Quy tắc: .
	    // ==> true
		String s1 = "a";
	    System.out.println("s1=" + s1);
	    boolean match = s1.matches(".");
	    System.out.println("-Match . " + match);
	 
	    // Kiểm tra toàn bộ s1
	    // Khớp với bất kỳ ký tự nào.
	    // ==> false  (Rõ ràng, chuỗi 3 ký tự sao khớp với 1 ký tự bất kỳ?)
	    s1 = "abc";
	    System.out.println("s1=" + s1);
	    match = s1.matches(".");
	    System.out.println("-Match . " + match);
	 
	    // Kiểm tra toàn bộ s1
	    // Khớp với bất kỳ ký tự nào 0 hoặc nhiều lần
	    // Kết hợp các quy tắc: . và *
	    // ==> true
	    match = s1.matches(".*");
	    System.out.println("-Match .* " + match);
	 
	    // Kiểm tra toàn bộ s2
	    // Bắt đầu bởi m
	    // Quy tắc ^
	    // true
	    String s2 = "m";
	    System.out.println("s2=" + s2);
	    match = s2.matches("^m");
	    System.out.println("-Match ^m " + match);

	    // Kiểm tra toàn bộ s2
	    // Bắt đầu bởi m
	    // Quy tắc ^
	    // ==> false  (Rõ ràng, chuỗi 3 ký tự sao khớp với 1 ký tự bất kỳ bắt đầu bởi m)
	    s2 = "mnp";
	    System.out.println("s2=" + s2);
	    match = s2.matches("^m");
	    System.out.println("-Match ^m " + match);
	 
	    // Bắt đầu bởi m
	    // Sau đó là ký tự bất kỳ, xuất hiện 1 hoặc nhiều lần.
	    // Quy tắc ^ và . và +
	    // true
	    match = s2.matches("^m.+");
	    System.out.println("-Match ^m.+ " + match);
	 
	    // Kiểm tra s3 kết thúc bằng p
	    // Quy tắc $
	    // true
	    String s3 = "p";
	    System.out.println("s3=" + s3);
	    match = s3.matches("p$");
	    System.out.println("-Match p$ " + match);
	 
	    // Kiểm tra toàn bộ s3
	    // Kết thúc bằng p
	    // ==> false  (Rõ ràng, chuỗi 4 ký tự sao khớp với 1 ký tự p cuối cùng)
	    s3 = "2nnp";
	    System.out.println("s3=" + s3);
	    match = s3.matches("p$");
	    System.out.println("-Match p$ " + match);
	 
	    // Kiểm tra toàn bộ s3
	    // Ký tự bất kỳ xuất hiện 1 lần: .
	    // tiếp theo là n, xuất hiện 1 hoặc tối đa 3 lần.
	    // Kết thúc bởi p: p$
	    // Kết hợp các quy tắc: . , {X,Y}, $
	    // true
	    match = s3.matches(".n{1,3}p$");
	    System.out.println("-Match .n{1,3}p$ " + match);
	 
	    // Bắt đầu là 2
	    // Tiếp theo x hoặc y hoặc z
	    // Tiếp theo bất kỳ 1 hoặc nhiểu lần.
	    // Kết hợp các quy tắc: [abc] , . , +
	    // true
	    String s4 = "2ybcd";
	    System.out.println("s4=" + s4);
	    match = s4.matches("2[xyz].+");
	    System.out.println("-Match 2[xyz].+ " + match);

	    // Bắt đầu là bất kỳ, 1 hoặc nhiểu lần
	    // Tiếp theo a hoặc b, hoặc c: [abc]
	    // Tiếp theo z hoặc v: [zv]
	    // Tiếp theo bất kỳ
	    // true
	    String s5 = "2bkbv";
	    match = s5.matches(".+[abc][zv].*");	 
	    System.out.println("-Match .+[abc][zv].* " + match);
	}

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
	
	
	
	public void matchesWhole() {
		String s = "The film Tom and Jerry!";
	      // Kiểm tra toàn bộ s
	      // Bắt đầu bởi ký tự bất kỳ xuất hiện 0 hoặc nhiều lần
	      // Tiếp theo là từ Tom hoặc Jerry
	      // Kết thúc bởi ký tự bất kỳ xuất hiện 0 hoặc nhiều lần
	      // Kết hợp các quy tắc: ., *, X|Z
	      // true
	      boolean match = s.matches(".*(Tom|Jerry).*");
	      System.out.println("s=" + s);
	      System.out.println("-Match .*(Tom|Jerry).* " + match);
	 
	      s = "The cat";
	      // false
	      match = s.matches(".*(Tom|Jerry).*");
	      System.out.println("s=" + s);
	      System.out.println("-Match .*(Tom|Jerry).* " + match);
	 
	      s = "The Tom cat";
	      // true
	      match = s.matches(".*(Tom|Jerry).*");
	      System.out.println("s=" + s);
	      System.out.println("-Match .*(Tom|Jerry).* " + match);
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
