import java.awt.*;
import java.awt.event.*;

public class PictureAni extends Frame implements Runnable {
	private int width;
	private int height;
	private int num;
	private int x = 0;
	private int length;
	private Image image;
	private Image offImage;
	private Graphics offGraphics;

	public PictureAni(int length, int height, int num, String imageName) {
		this.length = length;
		this.height = height;
		this.num = num;
		image = Toolkit.getDefaultToolkit().getImage("images/" + imageName);

		width = length / num;
		this.setSize(width + 40, height + 80);
		this.setLocation(400, 400);
		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				System.exit(0);
			}
		});

		this.setVisible(true);
		offImage = this.createImage(this.getWidth(), this.getHeight());
		offGraphics = offImage.getGraphics();
	}

	public void update(Graphics g) {
		offGraphics.setColor(Color.BLACK);
		offGraphics.fillRect(0, 0, this.getWidth(), this.getHeight());
		offGraphics.drawImage(image, 0, 0, width, height, x, 0, x + width, height, this);
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
			x += width;
			if (x >= length) {
				x = 0;
			}
		}
	}

	public static void main(String[] args) {
		new Thread(new PictureAni(Integer.parseInt(args[0]), Integer.parseInt(args[1]), Integer.parseInt(args[2]), args[3])).start();
	}
}