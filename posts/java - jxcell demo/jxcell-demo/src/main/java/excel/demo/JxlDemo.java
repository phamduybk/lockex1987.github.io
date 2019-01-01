package excel.demo;

import java.io.File;
import java.io.IOException;
import jxl.Cell;
import jxl.CellType;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

public class JxlDemo {

	public static void read() {
		try {
			Workbook workbook = Workbook.getWorkbook(AppUtils.getFile("jxl_input.xls"));
			Sheet sheet = workbook.getSheet(0);
			Cell a1 = sheet.getCell(0, 0);
			String a1Contents = a1.getContents();
			System.out.println(a1Contents);
			workbook.close();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		} catch (BiffException be) {
			be.printStackTrace();
		}
	}

	public static void write() {
		try {
			WritableWorkbook workbook = Workbook.createWorkbook(new File("jxl_output.xls"));
			WritableSheet sheet = workbook.createSheet("First sheet", 0);
			Label label = new Label(0, 2, "A label record");
			sheet.addCell(label);
			workbook.write();
			workbook.close();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		} catch (WriteException we) {
			we.printStackTrace();
		}
	}

	public static void modify() {
		try {
			Workbook workbook = Workbook.getWorkbook(AppUtils.getFile("jxl_input.xls"));
			WritableWorkbook copy = Workbook.createWorkbook(new File("jxl_modify.xls"), workbook);
			WritableSheet sheet1 = copy.getSheet(0);

			WritableCell cell = sheet1.getWritableCell(0, 0);
			if (cell.getType() == CellType.LABEL) {
				Label l = (Label) cell;
				l.setString("I love you");
			}

			Label label = new Label(0, 2, "NEW");
			sheet1.addCell(label);

			workbook.close();
			copy.write();
			copy.close();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		} catch (WriteException we) {
			we.printStackTrace();
		} catch (BiffException be) {
			be.printStackTrace();
		}
	}
}
