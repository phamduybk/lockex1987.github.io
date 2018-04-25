package cttd.https.util;

import java.util.ResourceBundle;

public class ConfigUtil {

	private static final String FILE_NAME = "application";

	private static ResourceBundle resourceBundle;

	public static String getConfig(String key) {
		if (resourceBundle == null) {
			try {
				resourceBundle = ResourceBundle.getBundle(FILE_NAME);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		return resourceBundle.getString(key);
	}
}
