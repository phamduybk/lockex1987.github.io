package cttd.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Ignore;
import org.junit.Test;

public class RegexExtractorTest {

	@Test
	@Ignore
	public void splitTwoPart() {
		Pattern p = Pattern.compile("(\\d+)-(\\d+)");

		String input = "123-456";
		Matcher m = p.matcher(input);

		if (m.matches()) {
			System.out.println("First part is " + m.group(1));
			System.out.println("Second part is " + m.group(2));
		} else {
			System.out.println(input + " does not match.");
		}
	}

	@Test
	@Ignore
	public void regexMatches() {
		String regex = "(.*)(\\d+)(.*)";
		Pattern p = Pattern.compile(regex);

		String input = "Vietjack xin chao cac ban. Day la vi du ve Regex! 1000  0USD";
		Matcher m = p.matcher(input);

		if (m.find()) {
			System.out.println("0: " + m.group(0));
			System.out.println("    (0 la xau dau vao)");
			System.out.println("1: " + m.group(1));
			System.out.println("2: " + m.group(2));
			System.out.println("3: " + m.group(3));
		} else {
			System.out.println("Does not match");
		}
	}

	@Test
	@Ignore
	public void matcherFind() {
		// Khoảng trắng xuất hiện 1 hoặc nhiều lần
		String regex = "\\s+";
		Pattern p = Pattern.compile(regex);

		String input = "This \t is a \t\t\t String";
		Matcher m = p.matcher(input);

		int i = 0;
		while (m.find()) {
			System.out.print("start" + i + " = " + m.start());
			System.out.print("\tend" + i + " = " + m.end());
			System.out.println("\tgroup" + i + " = " + m.group());
			i++;
		}
	}

	@Test
	@Ignore
	public void testFindWord() {
		String input = "this is a test, A TEST.";
		String regex = "\\b\\w+\\b";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(input);
		while (m.find()) {
			System.out.println(m.group());
		}
	}

	@Test
	@Ignore
	public void testSplit() {
		String regex = "(?<declare>\\s*[a-z]+\\s*)=(?<value>\\s*\\d+\\s*);";
		Pattern p = Pattern.compile(regex);

		String input = "abc = 123;";
		Matcher m = p.matcher(input);

		// Occur once
		if (m.matches()) {
			System.out.println("declare: " + m.group("declare").trim());
			System.out.println("value: " + m.group("value").trim());
		}
		System.out.println("---------------------------");

		// Occur several times
		input = "abc = 123; def= 456 ; ghi = 789;";
		m = p.matcher(input);
		while (m.find()) {
			System.out.println("group: <" + m.group() + ">");
			System.out.println("declare: " + m.group("declare").trim());
			System.out.println("value: " + m.group("value").trim());
			System.out.println();
		}
	}

	@Test
	@Ignore
	public void testSplit2() {
		// Java >= 7.
		// Định nghĩa một group có tên fileName
		// *? ==> Nó sẽ tìm một phù hợp nhỏ nhất.
		String regex = "/file/(?<fileName>.*?)'>";
		Pattern p = Pattern.compile(regex);

		String input = "<a href='http://HOST/file/FILE1'>File 1</a>"
				+ "<a href='http://HOST/file/FILE2'>File 2</a>";
		Matcher m = p.matcher(input);
		while (m.find()) {
			System.out.println("File name = " + m.group("fileName"));
		}
	}

	@Test
	public void startWithSc() {
		Pattern p = Pattern.compile("[Ss]c\\w*");

		String input = "Jerome Scott II is the best at computer science";
		Matcher m = p.matcher(input);

		while (m.find()) {
			System.out.println("Found: " + m.group() + " Index: " + m.start());
		}
	}
}
