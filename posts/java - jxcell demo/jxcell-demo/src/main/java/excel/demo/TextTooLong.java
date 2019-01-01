package excel.demo;

import com.jxcell.View;

public class TextTooLong {

	public static void demo() {
		try {
			String tooLongText = "0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 LTTD";
			View view = new View();
			view.read(AppUtils.readFile("too_long_template.xls"));
			view.setSheet(0);
			view.setTextAsValue(7, 5, tooLongText);
			view.write("too_long_output.xls");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
