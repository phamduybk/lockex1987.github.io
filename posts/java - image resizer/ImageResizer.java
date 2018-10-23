
/*
 * NVH
 */

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;

/**
 * Resize images.
 *
 * @author lockex1987
 */
public class ImageResizer {

	private float oldTotal = 0;
	private float newTotal = 0;

	public ImageResizer(String rootFolderPath, String qualityOpt, String resizeOpt) throws IOException {
		// Get the list of sub folders
		File rootFolder = new File(rootFolderPath);
		File[] fileList = rootFolder.listFiles();
		Arrays.sort(fileList, (File o1, File o2) -> o1.getName().compareTo(o2.getName()));

		// Process all sub folders
		for (File sourceFolder : fileList) {
			System.out.println("Folder: " + sourceFolder.getName());
			processFolder(sourceFolder, qualityOpt, resizeOpt);
		}
	}
	
	public void processFolder(File sourceFolder, String qualityOpt, String resizeOpt) throws IOException {
		// Get the list of files
		File[] fileList = sourceFolder.listFiles();
		Arrays.sort(fileList, (File o1, File o2) -> o1.getName().compareTo(o2.getName()));

		// Destination folder
		File destFolder = new File(sourceFolder.getParentFile(), sourceFolder.getName() + ".resized");
		if (!destFolder.exists()) {
			destFolder.mkdir();
		}

		// Process all images
		for (File file : fileList) {
			processFile(file, destFolder, qualityOpt, resizeOpt);
		}

		// Print summary
		int percent = Math.round(newTotal * 100 / oldTotal);
		System.out.println("-------------------------------------");
		System.out.println("Total: " + String.format("%.2f", oldTotal) + "kb"
				+ " -> " + String.format("%.2f", newTotal) + "kb"
				+ " (" + percent + "%)");
	}

	private void printImageInfo(File file) throws IOException {
		// BufferedImage image = ImageIO.read(file);
		// System.out.println(" Width: " + image.getWidth());
		// System.out.println(" Height: " + image.getHeight());
	}

	private void processFile(File file, File destFolder, String qualityOpt, String resizeOpt) throws IOException {
		// Kich thuoc cua anh
		double sizeInKb = file.length() / 1024d;

		File newFile = new File(destFolder, file.getName());

		// Anh co kich thuoc lon hon 1000 kb thi moi resize
		if (sizeInKb < 1000) {
			copyFile(file, newFile);
		} else {
			resizeImage(file, newFile, qualityOpt, resizeOpt);
		}

		// Print info and compare
		float oldSize = file.length() / 1024f;
		float newSize = newFile.length() / 1024f;
		int percent = Math.round(newSize * 100 / oldSize);
		System.out.println(file.getName() + ": " + String.format("%.2f", oldSize) + "kb"
				+ " -> " + String.format("%.2f", newSize) + "kb"
				+ " (" + percent + "%)");

		// Update total summary
		oldTotal += oldSize;
		newTotal += newSize;
	}

	private void resizeImage(File inputFile, File outputFile, String qualityOpt, String resizeOpt) {
		try {
			String[] args = {
					"convert",
					inputFile.getAbsolutePath(),
					"-quality", qualityOpt, "-resize", resizeOpt,
					outputFile.getAbsolutePath()
			};

			Process localProcess = Runtime.getRuntime().exec(args);
			localProcess.waitFor();
			BufferedReader br = new BufferedReader(new InputStreamReader(localProcess.getInputStream()));
			String line;
			while ((line = br.readLine()) != null) {
				System.out.println(line);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private void copyFile(File source, File dest) throws IOException {
		Files.copy(source.toPath(), dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
	}

	public static void main(String[] args) throws Exception {
		String rootFolderPath = args[0];
		String qualityOpt;
		String resizeOpt;
		if (args.length > 2) {
			qualityOpt = args[1];
			resizeOpt = args[2];
		} else {
			qualityOpt = "75";
			resizeOpt = "50%";
		}
		new ImageResizer(rootFolderPath, qualityOpt, resizeOpt);
	}
}
