package cttd.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexValidator {

	/**
	 * Number: A numeric value will have following format:
	 * ^[-+]?: Starts with an optional "+" or "-" sign.
	 * [0-9]*: May have one or more digits.
	 * \\.? : May contain an optional "." (decimal point) character.
	 * [0-9]+$ : ends with numeric digit.
	 */
	public static boolean isNumeric(String input) {
		String regex = "^[-+]?[0-9]*\\.?[0-9]+$";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(input);
		return m.matches();
	}

	/**
	 * UserName the matcher demo (min: 3 và max:15 character):
	 */
	public static boolean checkUserName(String input) {
		String regex = "^[a-z0-9_-]{3,15}$";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(input);
		return m.matches();
	}

	/**
	 * 
	 * @param emailAddress
	 * @return
	 */
	public static boolean validateEmail(String emailAddress) {
		// https://www.mkyong.com/regular-expressions/how-to-validate-email-address-with-regular-expression/
		// ^: start of the line
		// [_A-Za-z0-9-\\+]+ must start with string in the bracket [ ], must contains one or more (+)
		// \\.[_A-Za-z0-9-]+ follow by a dot "." and string in the bracket [ ], must contains one or
		// more
		// @ must contains a "@" symbol
		// [A-Za-z0-9-]+ follow by string in the bracket [ ], must contains one or more (+)
		// \\.[A-Za-z0-9]+ follow by a dot "." and string in the bracket [ ], must contains one or more
		// \\.[A-Za-z]{2,} follow by a dot "." and string in the bracket [ ], with minimum length of 2
		// $ end of the line
		String regex = "^"
				+ "[_A-Za-z0-9-\\+]+"
				+ "(\\.[_A-Za-z0-9-]+)*"
				+ "@"
				+ "[A-Za-z0-9-]+"
				+ "(\\.[A-Za-z0-9]+)*"
				+ "(\\.[A-Za-z]{2,})"
				+ "$";
		return emailAddress.matches(regex);
	}
}
