package files.service;

/**
 * Tao file thong ke upcode.
 */
public class UpcodeFileBean implements Comparable<UpcodeFileBean> {

	private String sourceFolder;
	private String sourceFile;

	public UpcodeFileBean(String sourceFolder, String sourceFile) {
		this.sourceFolder = sourceFolder;
		this.sourceFile = sourceFile;
	}

	public String getSourceFolder() {
		return sourceFolder;
	}

	public void setSourceFolder(String sourceFolder) {
		this.sourceFolder = sourceFolder;
	}

	public String getSourceFile() {
		return sourceFile;
	}

	public void setSourceFile(String sourceFile) {
		this.sourceFile = sourceFile;
	}

	@Override
	public int compareTo(UpcodeFileBean o) {
		int c1 = this.sourceFolder.compareTo(o.sourceFolder);
		if (c1 == 0) {
			return this.sourceFile.compareTo(o.sourceFile);
		} else {
			return c1;
		}
	}
}
