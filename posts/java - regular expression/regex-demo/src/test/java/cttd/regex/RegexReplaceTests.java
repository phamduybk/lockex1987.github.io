package cttd.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Ignore;
import org.junit.Test;

public class RegexReplaceTests {

	

	@Test
	@Ignore
	public void replaceWithRegex() {
		// Thay thế tất cả các khoảng trắng với ký tự tab.
		String input = "This is my text";
		String newText = input.replaceAll("\\s+", "\t");

		System.out.println("Input:    " + input);
		System.out.println("New text: " + newText);
	}

	@Test
	public void replaceVsReplaceAll() {
		String REGEX = "dog";
		String INPUT = "The dog says meow. " + "All dogs say meow.";
		String REPLACE = "cat";

		Pattern p = Pattern.compile(REGEX);

		// get a matcher object
		Matcher m = p.matcher(INPUT);
		INPUT = m.replaceAll(REPLACE);
		System.out.println(INPUT);
	}
}
