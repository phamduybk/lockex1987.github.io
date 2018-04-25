package cttd.readfile;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Here’s the example to demonstrate how to read “UTF-8” encoded data from a
 * file in Java.
 */
public class ReadFile3 {

	public static void main(String[] args) {
		String path = GetTestFilePath.getPath();
		File file = new File(path);
		try (InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "UTF8");
				BufferedReader br = new BufferedReader(isr)) {
			String s;
			while ((s = br.readLine()) != null) {
				System.out.println(s);
			}
			br.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}
}
