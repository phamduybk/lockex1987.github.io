package cttd.regex;

import java.util.regex.Pattern;

import org.junit.Ignore;
import org.junit.Test;

public class RegexManipulatorTest {

	@Test
	@Ignore
	public void patternSplit() {
		String regex = "compromise|cooperate|concession|conciliation|(finding the middle ground)|(give and take)";
		Pattern p = Pattern.compile(regex);

		String input = "I will not compromise. I will not cooperate. "
				+ "There will be no concession, no conciliation, no finding the middle ground, and no give and take.";
		String[] a = p.split(input);

		for (String s : a) {
			System.out.println(s);
		}
	}

	@Test
	@Ignore
	public void patternSplit2() {
		String regex = "compromise|cooperate|concession|conciliation|(finding the middle group)|(give and take)";

		String input = "I will not compromise. I will not cooperate. "
				+ "There will be no concession, no conciliation, no finding the middle group, and no give and take.";
		String[] a = input.split(regex);

		for (String s : a) {
			System.out.println(s);
		}
	}

	@Test
	@Ignore
	public void splitWithRegex() {
		// Khoảng trắng xuất hiện 1 hoặc nhiều lần.
		// Các ký tự khoảng trắng: \t\n\x0b\r\f
		// Kết hợp quy tắc: \s và +
		String regex = "\\s+";

		String input = "This is my text";
		String[] a = input.split(regex);

		for (String s : a) {
			System.out.println(s);
		}
	}

	@Test
	public void replaceWithRegex() {
		// Thay thế tất cả các khoảng trắng với ký tự tab.
		String input = "This is my text";
		String newText = input.replaceAll("\\s+", "\t");

		System.out.println("Input:    " + input);
		System.out.println("New text: " + newText);
	}
}
