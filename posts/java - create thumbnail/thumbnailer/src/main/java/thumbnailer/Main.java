package thumbnailer;

public class Main {

	public static void main(String[] args) throws Exception {
		createThumbnail();
		takeScreenshot();
	}

	private static void createThumbnail() throws Exception {
		String sourcePath = "E:/new/chrysanthemum.jpg";
		String destPath = "E:/new/chrysanthemum_thumb.jpg";
		int targetWidth = 100;
		int targetHeight = 100;
		ImgScalrFacade.createThumbnail(sourcePath, destPath, targetWidth, targetHeight);
	}

	private static void takeScreenshot() throws Exception {
		String videoPath = "E:/new/43.mp4";
		String imagePath = "E:/new/43.jpg";
		int duration = 500;
		String size = "400x300";
		FfmpegFacade.takeScreenshot(videoPath, imagePath, duration, size);
	}
}
