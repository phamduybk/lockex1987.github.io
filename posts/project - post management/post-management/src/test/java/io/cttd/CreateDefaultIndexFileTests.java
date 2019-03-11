package io.cttd;

import java.io.File;

import org.junit.Test;

public class CreateDefaultIndexFileTests {

	@Test
	public void testCreateFile() {
		File htmlFile = new File("posts/highcharts - tooltip/index.html");
		if (!htmlFile.exists()) {
			CreateDefaultIndexFile.createFile(htmlFile);
			System.out.println("File created");
		}
	}
}
