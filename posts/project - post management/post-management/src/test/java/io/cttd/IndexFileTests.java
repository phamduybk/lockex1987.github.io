package io.cttd;

import org.junit.Test;

public class IndexFileTests {

	@Test
	public void testGetTitleAndDescription() {
		String indexFilePath = "../index.html";
		IndexFile indexFile = new IndexFile(indexFilePath);
		String title = indexFile.getTitle();
		String description = indexFile.getDescription();
		
		System.out.println("title: " + title);
		System.out.println("description: " + description);
	}
}
