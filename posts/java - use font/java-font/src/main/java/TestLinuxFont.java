
import java.awt.Color;
import java.awt.Font;
import java.awt.FontFormatException;
import java.awt.Graphics2D;
import java.awt.GraphicsEnvironment;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Random;

import javax.imageio.ImageIO;

public class TestLinuxFont {

	private static Font CAPTCHA_FONT = createFont();

	public static void main(String[] args) throws Exception {
		// installFont();
		// listAllFonts();
		drawImageFile();
		System.out.println("Finish");
	}

	private static void drawImageFile() throws IOException {
		String token = "abdefg";
		OutputStream os = new FileOutputStream("test.png", false);
		byte[] bytes = generateImage(token);
		os.write(bytes);
		os.close();
	}

	private static void listAllFonts() {
		GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
		String[] fonts = ge.getAvailableFontFamilyNames();
		for (String s : fonts) {
			System.out.println(s);
		}
	}

	private static Font createFont() {
		try {
			ClassLoader loader = Thread.currentThread().getContextClassLoader();
			InputStream is = loader.getResourceAsStream("capture_it.ttf");
			File file = new File("capture_it.ttf");
			// Font f = Font.createFont(Font.TRUETYPE_FONT, file);
			Font f = Font.createFont(Font.TRUETYPE_FONT, is);
			f = f.deriveFont(28f);
			return f;
		} catch (IOException | FontFormatException ex) {
			ex.printStackTrace();
			return null;
		}
	}

	private static void installFont() {
		GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
		Font newFont = createFont();
		ge.registerFont(newFont);
	}

	private static byte[] generateImage(String text) {
		int w = 180, h = 40;
		BufferedImage image = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
		Graphics2D g = image.createGraphics();
		g.setRenderingHint(RenderingHints.KEY_FRACTIONALMETRICS, RenderingHints.VALUE_FRACTIONALMETRICS_ON);
		g.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

		g.setColor(Color.white);
		g.fillRect(0, 0, w, h);
		if (CAPTCHA_FONT == null) {
			// System.out.println("Use system font");
			g.setFont(new Font("Serif", Font.PLAIN, 26));
		} else {
			// System.out.println("Use customized font");
			g.setFont(CAPTCHA_FONT);
		}

		int start = 10;
		Random random = new Random();
		for (int i = 0; i < text.length(); i++) {
			g.setColor(new Color(random.nextInt(255), random.nextInt(255), random.nextInt(255)));
			g.drawString(String.valueOf(text.charAt(i)), start + (i * 20), (int) (Math.random() * 20 + 20));
		}

		// Them cac hinh cho kho doc
		g.setColor(Color.white);
		// g.setColor(Color.red);
		for (int i = 0; i < 8; i++) {
			g.drawOval((int) (Math.random() * 160), (int) (Math.random() * 10), 30, 30);
		}
		g.dispose();
		ByteArrayOutputStream bout = new ByteArrayOutputStream();
		try {
			ImageIO.write(image, "png", bout);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return bout.toByteArray();
	}
}
