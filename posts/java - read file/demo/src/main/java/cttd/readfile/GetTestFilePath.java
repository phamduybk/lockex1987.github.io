package cttd.readfile;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

public class GetTestFilePath {

	public static String getPath() {
		String path = "text.txt";
		URL url = ClassLoader.getSystemResource(path);

		URI uri;
		try {
			uri = url.toURI();
		} catch (URISyntaxException ex) {
			ex.printStackTrace();
			return null;
		}

		File file = new File(uri);
		return file.getAbsolutePath();
	}
}
