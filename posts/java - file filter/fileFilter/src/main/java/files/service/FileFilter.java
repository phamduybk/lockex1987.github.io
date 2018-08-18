package files.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

/**
 * Tao file thong ke upcode.
 */
public class FileFilter {

	private List<UpcodeFileBean> list = new LinkedList<>();

	public void getListFromInputFile(String inputFilePath) throws Exception {
		// Đọc danh sách các file thay đổi từ file input.txt
		// Đẩy vào danh sách UpcodeFileBean
		BufferedReader reader = new BufferedReader(
				new InputStreamReader(new FileInputStream(inputFilePath), "UTF8"));
		String s;
		while ((s = reader.readLine()) != null) {
			// Loại bỏ dấu cách 2 đầu
			s = s.trim();

			// Chuyển hết về dấu / của Linux, không sử dụng dấu \ của Windows
			s = s.replace("\\", "/");

			// Bỏ qua dòng trắng
			if (s.isEmpty()) {
				continue;
			}

			// "git status" hiển thị như sau:
			// new file:   posts/java - file filter/fileFilter/changes.txt
			if (s.contains(":")) {
				s = s.substring(s.lastIndexOf(":") + 1).trim();
				//System.out.println(s);
			}

			// Tách thư mục và tên file
			int index = s.lastIndexOf("/");
			String sourceFolder = s.substring(0, index + 1);
			String sourceFile = s.substring(index + 1);

			// Thêm vào danh sách
			UpcodeFileBean bean = new UpcodeFileBean(sourceFolder, sourceFile);
			// System.out.println(bean);
			list.add(bean);
		}
		reader.close();

		// System.out.println(list.size());
		Collections.sort(list);
	}

	public void filterPhpWeb(String rootPath) throws Exception {
		String destPath = "filtered";

		File sourceRoot = new File(rootPath);
		if (sourceRoot.exists()) {
			File destRoot = new File(destPath);
			if (!destRoot.exists()) {
				destRoot.mkdir();
			}

			for (UpcodeFileBean bean : list) {
				String sourceFolder = bean.getSourceFolder();
				String sourceFile = bean.getSourceFile();

				File destFolder = new File(destRoot, sourceFolder);
				if (!destFolder.exists()) {
					destFolder.mkdirs();
				}

				File oldFile = new File(sourceRoot, sourceFolder + sourceFile);
				File newFile = new File(destFolder, sourceFile);

				if (oldFile.exists()) {
                    System.out.println(sourceFolder + sourceFile);
					Files.copy(oldFile.toPath(), newFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
				} else {
					System.out.println("File not found: " + oldFile.toPath());
				}
			}
		}
	}

	public void filterJavaWebNetbeans(String rootPath) throws Exception {
		String destPath = "filtered";

		final File sourceRoot = new File(rootPath);
		if (sourceRoot.exists()) {
			File destRoot = new File(destPath);
			if (!destRoot.exists()) {
				destRoot.mkdir();
			}

			for (UpcodeFileBean bean : list) {
				// Thư mục Java web sinh bởi Netbeans (dist)
				String sourceFolder = bean.getSourceFolder();
				String sourceFile = bean.getSourceFile();

				String buildFolder;
				if (sourceFolder.startsWith("web")) {
					buildFolder = sourceFolder.replace("web/", "");
				} else if (sourceFolder.startsWith("src")) {
					buildFolder = sourceFolder.replace("src/java/", "WEB-INF/classes/");
				} else {
					buildFolder = sourceFolder.replace("lib/", "WEB-INF/lib/");
				}

				// File nguồn .java sẽ được dịch ra file .class
				String buildFile;
				if (sourceFile.endsWith(".java")) {
					buildFile = sourceFile.replace(".java", ".class");
				} else {
					buildFile = sourceFile;
				}

				sourceFolder = buildFolder;
				sourceFile = buildFile;

				File destFolder = new File(destRoot, sourceFolder);
				if (!destFolder.exists()) {
					destFolder.mkdirs();
				}

				File oldFile = new File(sourceRoot, sourceFolder + sourceFile);
				File newFile = new File(destFolder, sourceFile);

				if (oldFile.exists()) {
                    System.out.println(sourceFolder + sourceFile);
					Files.copy(oldFile.toPath(), newFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
				} else {
					System.out.println("File not found: " + oldFile.getPath());
				}

				// Copy cả các file .class của lớp con
				if (sourceFile.endsWith(".class")) {
					int index = sourceFile.lastIndexOf(".");
					String fileName = sourceFile.substring(0, index);

					File[] files = new File(sourceRoot, sourceFolder).listFiles();
					for (File f : files) {
						if (f.getName().startsWith(fileName + "$")) {
							// System.out.println(f.getName());
							newFile = new File(destFolder, f.getName());
							Files.copy(f.toPath(), newFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
						}
					}
				}
			}
		}
	}
}
