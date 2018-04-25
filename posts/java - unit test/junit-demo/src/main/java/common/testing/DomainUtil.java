package common.testing;

import java.util.regex.Pattern;

public class DomainUtil {

	private static final String DOMAIN_NAME_PATTERN = "^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$";

	private static Pattern domainNamePattern = Pattern.compile(DOMAIN_NAME_PATTERN);

	// Is this a valid domain name?
	public static boolean isValidDomainName(String domainName) {
		return domainNamePattern.matcher(domainName).find();
	}
}
