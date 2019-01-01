package excel.demo;

import java.io.IOException;
import com.jxcell.CellException;
import com.jxcell.CellFormat;
import com.jxcell.View;

public class PDFDemo {

	public static void demo1() {
		try {
			View view = new View();
			view.readXLSX(AppUtils.readFile("pdf_template.xlsx"));
			view.setPrintGridLines(false);
			view.setPrintScaleFitToPage(true);
			view.exportPDF("pdf_output_1.pdf");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void demo2() {
		try {
			View view = new View();
			view.read(AppUtils.readFile("empty.xls"));
			// m_view.setPrintScale(100); // set print scale value --- default is 100%
			// m_view.setPrintHeader("Your header"); //set header --- default is &A
			// m_view.setPrintFooter("Your footer"); //set footer --- default is Page &P
			// m_view.setPrintGridLines(true); //show grid line

			view.setTextAsValue(8, 0, "ABC DEF GHI KLM OPQ RS TUV W XYZ");
			view.setRowHeightAutomatic(8, true);
			view.setRowHeightAuto(8, 0, 9, 5, true);

			CellFormat format = view.getCellFormat(8, 0, 9, 5);
			format.setWordWrap(true);
			view.setCellFormat(format, 8, 0, 9, 5);

			// m_view.flushModifiedEvents();
			// m_view.setAutoRecalc(true);
			// m_view.setRepainting(true);
			// m_view.endEdit();
			// m_view.setRowHeight(8, 500);

			view.exportPDF("pdf_output_2.pdf");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void demo3() {
		try {
			View view = new View();
			view.read(AppUtils.readFile("empty.xls"));
			String logo = AppUtils.getPath("logo.jpg");
			//System.out.println(logo);
			view.addPicture(0, 0, 2, 6, logo);
			view.setPrintScale(100); // set print scale value --- default is 100%
			view.setPrintHeader("Your header"); // set header --- default is &A
			view.setPrintFooter("Your footer"); // set footer --- default is Page &P
			view.setPrintGridLines(true); // show grid line
			view.exportPDF("pdf_output_3.pdf"); // export to pdf file
		} catch (CellException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}