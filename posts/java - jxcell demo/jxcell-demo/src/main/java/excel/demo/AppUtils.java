package excel.demo;

import java.io.File;
import java.io.InputStream;

public class AppUtils {

	// Package Excel files in the jar file (read file in jar file).
	public static InputStream readFile(String fileName) {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		return classLoader.getResourceAsStream(fileName);
	}
	
	public static String getPath(String fileName) {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		return classLoader.getResource(fileName).getPath();
	}
	
	public static File getFile(String fileName) {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		return new File(classLoader.getResource(fileName).getPath());
	}
}
