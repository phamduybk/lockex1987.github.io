package excel.demo;

import com.jxcell.CellFormat;
import com.jxcell.View;
import com.jxcell.designer.Designer;
import java.awt.*;

public class TextFormattingTest {

	public static void demo() {
		try {
			View view = new View();
			
			// set data
			String text = "Hello, you are welcome!";
			view.setText(0, 0, text);

			view.setColWidth(0, 36 * 256);
			view.setRowHeight(0, 120 * 20);

			// text orientation
			CellFormat rangeStyle = view.getCellFormat();
			rangeStyle.setOrientation((short) 45);
			view.setCellFormat(rangeStyle);

			// multi text selection format
			view.setTextSelection(0, 6);
			CellFormat cfmt = view.getCellFormat();
			cfmt.setFontItalic(true);
			cfmt.setFontColor(Color.BLUE.getRGB());
			view.setCellFormat(cfmt);

			view.setTextSelection(7, 10);
			cfmt = view.getCellFormat();
			cfmt.setFontBold(true);
			cfmt.setFontSize(16 * 20);
			view.setCellFormat(cfmt);

			view.setTextSelection(11, 13);
			cfmt = view.getCellFormat();
			cfmt.setFontUnderline(CellFormat.UnderlineSingle);
			cfmt.setFontColor(Color.GREEN.getRGB());
			view.setCellFormat(cfmt);

			view.setTextSelection(14, text.length() - 1);
			cfmt = view.getCellFormat();
			cfmt.setFontSize(14);
			view.setCellFormat(cfmt);

			view.setSelection(0, 5, 65535, 5);
			cfmt = view.getCellFormat();
			cfmt.setMergeCells(true);
			view.setCellFormat(cfmt);

			view.write("text_formatting.xls");

			Designer.newDesigner(view);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
