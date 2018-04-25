package thumbnailer;

import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;
import org.imgscalr.Scalr;
import org.imgscalr.Scalr.Method;
import org.imgscalr.Scalr.Mode;

public class ImgScalrFacade {

	public static void createThumbnail(String sourcePath, String destPath,
			int targetWidth, int targetHeight) throws Exception {
		// Load image
		File sourceFile = new File(sourcePath);
		BufferedImage sourceImage = ImageIO.read(sourceFile);
		Method scalingMethod = Scalr.Method.QUALITY;
		Mode resizeMode = Scalr.Mode.AUTOMATIC;

		// The last parameter is ops - Zero or more optional image operations (e.g. sharpen, blur, etc.)
		// of type BufferedImageOp that can be applied to the resized image.
		// These include OP_BRIGHTER, OP_ANTIALIAS and OP_BRIGHTER, OP_ANTIALIAS.
		BufferedImage destImage = Scalr.resize(sourceImage,
				scalingMethod,
				resizeMode,
				targetWidth,
				targetHeight,
				Scalr.OP_ANTIALIAS);

		// Wrtite to a file
		File destFile = new File(destPath);
		ImageIO.write(destImage, "jpg", destFile);
	}
}
