package excel.demo;

import com.jxcell.*;
import com.jxcell.designer.Designer;

public class OpenXML {

	public static void demo() {
		try {
			View view = new View();
			view.readXLSX(AppUtils.readFile("2007_template.xlsx"));
			view.writeXLSX("2007_output.xlsx");
			Designer.newDesigner(view);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
