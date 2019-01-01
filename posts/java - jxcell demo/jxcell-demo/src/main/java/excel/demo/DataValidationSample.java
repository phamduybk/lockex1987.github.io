package excel.demo;

import java.awt.Color;
import com.jxcell.CellFormat;
import com.jxcell.DataValidation;
import com.jxcell.View;

public class DataValidationSample {

	public static void demo() {
		View view = new View();
		try {
			view.setText(0, 1, "Apple");
			view.setText(0, 2, "Orange");
			view.setText(0, 3, "Banana");

			DataValidation dataValidation = view.CreateDataValidation();
			dataValidation.setType(DataValidation.eUser);
			dataValidation.setFormula1("\"AAAA\0BBBB\0cccc\"");
			dataValidation.setErrorBoxText("value should be in AAAA,BBBB,cccc");
			view.setSelection("A2:A5");
			view.setDataValidation(dataValidation);

			dataValidation = view.CreateDataValidation();
			dataValidation.setType(DataValidation.eUser);
			dataValidation.setFormula1("$B$1:$D$1");
			dataValidation.setErrorBoxText("value should be in Apple,Orange,Banana");
			view.setSelection("B2:D5");
			view.setDataValidation(dataValidation);

			dataValidation = view.CreateDataValidation();
			dataValidation.setType(DataValidation.eInteger);
			dataValidation.setFormula1("10");
			dataValidation.setOperator(DataValidation.eGreater);
			dataValidation.setErrorBoxText("value should be greater than 10");
			view.setSelection("B7:D7");
			view.setDataValidation(dataValidation);

			CellFormat cellformat = view.getCellFormat(1, 0, 4, 0);
			cellformat.setPattern(CellFormat.PatternSolid);
			cellformat.setPatternFG(Color.blue);
			view.setCellFormat(cellformat, 1, 0, 4, 0);

			cellformat = view.getCellFormat(1, 1, 4, 3);
			cellformat.setPattern(CellFormat.PatternSolid);
			cellformat.setPatternFG(Color.green);
			view.setCellFormat(cellformat, 1, 1, 4, 3);

			cellformat = view.getCellFormat(6, 1, 6, 3);
			cellformat.setPattern(CellFormat.PatternSolid);
			cellformat.setPatternFG(Color.orange);
			view.setCellFormat(cellformat, 6, 1, 6, 3);

			view.setText(0, 0, "AAAA,BBBB,cccc");
			view.setText(5, 1, "greater than 10");

			//view.write("data_validation.xls");
			view.writeXLSX("data_validation.xlsx");
			com.jxcell.designer.Designer.newDesigner(view);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}