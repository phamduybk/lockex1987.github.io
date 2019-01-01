
/**
 * Hien thi anh o desktop.
 */
import java.awt.*;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.net.URL;
import javax.imageio.ImageIO;
import javax.swing.*;
import javax.swing.JComponent;
import javax.swing.JWindow;

public class MyNote extends JComponent {

    private BufferedImage image;

    public MyNote() {
        try {
            image = ImageIO.read(new File("background.jpg"));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public void paint(Graphics g) {
        g.drawImage(image, 0, 0, this.getWidth(), this.getHeight(), 0, 0, image.getWidth(), image.getHeight(), null);
    }

    @Override
    public Dimension getPreferredSize() {
        return new Dimension(240, 180);
    }

    public static void main(String[] args) {
        MyNote r = new MyNote();
        JWindow f = new JWindow();
        f.getContentPane().add(r);
        f.setLocation(890, 10);
        f.pack();
        f.setVisible(true);
        createAndShowGUI();
    }

    private static void createAndShowGUI() {
        if (!SystemTray.isSupported()) {
            System.out.println("SystemTray is not supported");
            return;
        }
        final PopupMenu popup = new PopupMenu();
        URL imageURL = MyNote.class.getResource("my_note.gif");
        final TrayIcon trayIcon = new TrayIcon((new ImageIcon(imageURL, "tray icon")).getImage());
        final SystemTray tray = SystemTray.getSystemTray();

        // Create a popup menu components
        MenuItem nextItem = new MenuItem("Next");
        MenuItem exitItem = new MenuItem("Exit");

        // Add components to popup menu
        popup.add(nextItem);
        popup.add(exitItem);

        trayIcon.setPopupMenu(popup);

        try {
            tray.add(trayIcon);
        } catch (AWTException e) {
            System.out.println("TrayIcon could not be added.");
            return;
        }

        nextItem.addActionListener(new ActionListener() {

            public void actionPerformed(ActionEvent e) {
                JOptionPane.showMessageDialog(null, "This dialog box is run from the About menu item");
            }
        });

        exitItem.addActionListener(new ActionListener() {

            public void actionPerformed(ActionEvent e) {
                tray.remove(trayIcon);
                System.exit(0);
            }
        });
    }
}