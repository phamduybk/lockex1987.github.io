package cttd.readfile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

/**
 * Java 8 Read File + Stream.
 */
public class ReadFile5 {

	public static void main(String args[]) {
		String path = GetTestFilePath.getPath();
		try (Stream<String> lines = Files.lines(Paths.get(path))) {
			lines.forEach(System.out::println);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
