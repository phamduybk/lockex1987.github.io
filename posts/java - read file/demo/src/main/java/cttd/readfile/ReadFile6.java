package cttd.readfile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

/**
 * Use class java.nio.file.Files.
 */
public class ReadFile6 {

	public static void main(String args[]) {
		String path = GetTestFilePath.getPath();
		try {
			List<String> lines = Files.readAllLines(Paths.get(path));
			lines.forEach(System.out::println);
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}
}
