package excel.demo;

import com.jxcell.*;
import java.io.IOException;
import com.jxcell.designer.Designer;

public class Hyperlinks {

	public static void demo() {
		try {
			View view = new View();
			// Creating Hyperlink to another cell
			view.addHyperlink(1, 1, 1, 1, "C3", HyperLink.kRange, "This is Workbook Link!");

			// Creating Hyperlink for Website
			view.addHyperlink(2, 1, 2, 1, "http://www.jxcell.net", HyperLink.kURLAbs, "This is Web Url Link!");

			// Creating Hyperlink for e-mail
			view.addHyperlink(3, 1, 3, 1, "mailto:support@jxcell.com", HyperLink.kURLAbs, "Send Mail!");

			// Creating Hyperlink for Opening Files
			view.addHyperlink(4, 1, 4, 1, "c:\\", HyperLink.kURLAbs, "This is File Link!");

			view.write("hyperlink.xls");
			Designer.newDesigner(view);
		} catch (CellException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}