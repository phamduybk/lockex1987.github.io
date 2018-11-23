import java.awt.*;
import java.awt.event.*;

public class PictureAni2 extends Frame implements Runnable {
	private int width;
	private int height;
	private int num;
	private int y = 0;
	private int size;
	private Image image;
	private Image offImage;
	private Graphics offGraphics;

	public PictureAni2(int width, int height, int num, String imageName) {
		this.width = width;
		this.height = height;
		this.num = num;
		image = Toolkit.getDefaultToolkit().getImage("images2/" + imageName);

		size = height / num;
		this.setSize(width + 40, size + 80);
		this.setLocation(400, 400);
		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				System.exit(0);
			}
		});
		System.out.println(width + ", " + height + ", " + size);

		this.setVisible(true);
		offImage = this.createImage(this.getWidth(), this.getHeight());
		offGraphics = offImage.getGraphics();
	}

	public void update(Graphics g) {
		offGraphics.setColor(Color.BLACK);
		offGraphics.fillRect(0, 0, this.getWidth(), this.getHeight());
		offGraphics.drawImage(image, 0, 0, width, size, 0, y, width, y + size, this);
		g.drawImage(offImage, 10, 30, this);
	}

	public void run() {
		while (true) {
			try {
				Thread.sleep(20);
			}
			catch (InterruptedException ie) {
				ie.printStackTrace();
			}
			repaint();
			y += size;
			if (y >= height) {
				y = 0;
			}
		}
	}

	public static void main(String[] args) {
		new Thread(new PictureAni2(Integer.parseInt(args[0]), Integer.parseInt(args[1]), Integer.parseInt(args[2]), args[3])).start();
	}
}