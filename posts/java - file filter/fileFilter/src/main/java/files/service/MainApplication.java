package files.service;

public class MainApplication {

	public static void main(String[] args) throws Exception {
		String rootPath = args[0];
		System.out.println(rootPath);
		FileFilter fileFilter = new FileFilter();
		fileFilter.getListFromInputFile("changes.txt");
		fileFilter.filterPhpWeb(rootPath);
	}
}
