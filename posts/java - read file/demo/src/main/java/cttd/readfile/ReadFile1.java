package cttd.readfile;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

/**
 * A classic BufferedReader to read content from a file.
 * There are many ways to read a file, but this BufferedReader is
 * the simplest and most common-used method.
 */
public class ReadFile1 {

	public static void main(String[] args) {
		String path = GetTestFilePath.getPath();
		BufferedReader br = null;
		try {
			String s;
			br = new BufferedReader(new FileReader(path));
			while ((s = br.readLine()) != null) {
				System.out.println(s);
			}
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			try {
				if (br != null) {
					br.close();
				}
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
	}
}
