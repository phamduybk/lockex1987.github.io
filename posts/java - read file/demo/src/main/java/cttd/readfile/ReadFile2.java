package cttd.readfile;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

/**
 * try-with-resources example to auto close the file reader (since JDK7).
 */
public class ReadFile2 {

	public static void main(String[] args) {
		String path = GetTestFilePath.getPath();
		try (BufferedReader br = new BufferedReader(new FileReader(path))) {
			String s;
			while ((s = br.readLine()) != null) {
				System.out.println(s);
			}
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}
}