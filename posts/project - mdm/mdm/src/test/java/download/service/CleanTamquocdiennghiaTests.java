package download.service;

import org.junit.Test;

public class CleanTamquocdiennghiaTests {

	/**
	 * Xử lý chính.
	 */
	@Test
	public void testProcess() throws Exception {
		CleanTamquocdiennghia obj = new CleanTamquocdiennghia();
		int startChapter = 2;
		int endChapter = 2;
		for (int number = startChapter; number <= endChapter; number++) {
			obj.process(number);
		}
		System.out.println("Finish");
	}
}
