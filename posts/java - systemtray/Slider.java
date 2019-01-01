
/**
Hien thi anh kieu widget.
 */
import java.awt.Color;
import java.awt.Graphics;
import java.awt.SystemTray;
import java.awt.TrayIcon;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Random;
import javax.imageio.ImageIO;
import javax.swing.JFrame;
import javax.swing.JWindow;

public class Slider extends JWindow {

	private TrayIcon a;
	private int width;
	private int height;
	private SystemTray st;
	private BufferedImage image;

	public Slider() {
		super(new JFrame());
		try {
			Random random = new Random();
			image = ImageIO.read(new File("/data/archive/image/2016/AAP427.jpg"));
		} catch (Exception e) {
			System.out.println("Image not found");
		}
		double zoom = 0.285D;
		width = (int) (image.getWidth() * zoom);
		height = (int) (image.getHeight() * zoom);
		this.setSize(width, height);

		setLocation(1366 - width - 10, 30);
		// setResizable(false);
		// this.setUndecorated(true);
		this.setVisible(true);
		// this.setAlwaysOnTop(true);
		addWindowListener(new WindowAdapter() {

			@Override
			public void windowClosing(WindowEvent we) {
				System.exit(1);
			}
		});
		this.setFocusableWindowState(false);
	}

	@Override
	public void paint(Graphics g) {
		g.drawImage(image, 0, 0, width, height, new Color(140, 140, 140, 20), this);
	}

	public static void main(String[] args) {
		Slider slider = new Slider();
	}
}
