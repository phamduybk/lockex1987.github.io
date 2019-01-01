package itext.demo;

import java.io.FileOutputStream;
import java.net.URL;

import com.itextpdf.text.Document;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * You can do a lot with images in IText, including scaling, rotating, masking,
 * absolute positioning, borders, alignment etc.
 */
public class Demo12Image {

	public static void main(String[] args) throws Exception {
		String output = "output/demo_12_image.pdf";
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		Image image1 = Image.getInstance("input/demo_12_jakob_jenkov.png");
		document.add(image1);

		String imageUrl = "https://i-giadinh.vnecdn.net/2017/09/10/0-6301-1505002634.jpg";
		Image image2 = Image.getInstance(new URL(imageUrl));
		document.add(image2);

		Image image3 = Image.getInstance("input/demo_12_small_portrait.jpg");
		image3.setAbsolutePosition(500f, 650f);
		document.add(image3);

		Image image4 = Image.getInstance("input/demo_12_small_portrait.jpg");
		image4.scaleAbsolute(150f, 150f);
		document.add(image4);

		Image image5 = Image.getInstance("input/demo_12_small_portrait.jpg");
		image5.scalePercent(300f);
		document.add(image5);

		Image image6 = Image.getInstance("input/demo_12_small_portrait.jpg");
		image6.setRotationDegrees(45f);
		document.add(image6);

		document.close();
	}
}
