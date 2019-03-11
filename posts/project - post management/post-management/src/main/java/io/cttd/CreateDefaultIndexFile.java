package io.cttd;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class CreateDefaultIndexFile {

	public static void createFile(File htmlFile) {
		File source = new File("template/index.html");
		try {
			Files.copy(source.toPath(), htmlFile.toPath());
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}
}
