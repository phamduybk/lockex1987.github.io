package thumbnailer;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class FfmpegFacade {

	private static final String FFMPEG_PATH = "E:/program/ffmpeg/bin/ffmpeg.exe";

	public static void takeScreenshot(String videoPath, String imagePath, int duration, String size)
			throws Exception {
		String[] args = new String[] {
				FFMPEG_PATH,
				"-loglevel", "error",
				"-ss", String.valueOf(duration),
				"-i", videoPath,
				"-vframes", "1",
				"-f", "image2",
				"-s", size,
				imagePath
		};
		Process process = new ProcessBuilder(args).start();
		BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream()));
		String line;
		while ((line = br.readLine()) != null) {
			System.out.println(line);
		}
		System.out.println(videoPath + " -> " + imagePath);
	}
}
