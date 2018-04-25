package cttd.readfile;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.stream.Stream;

/**
 * A new method lines() has been added since 1.8, it lets BufferedReader returns
 * content as Stream.
 */
public class ReadFile4 {

	public static void main(String args[]) {
		String path = GetTestFilePath.getPath();
		try (BufferedReader br = new BufferedReader(new FileReader(path));
				Stream<String> lines = br.lines()) {
			lines.forEach(System.out::println);
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}
}
