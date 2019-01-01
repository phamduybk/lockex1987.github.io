package excel.demo;

import com.jxcell.CellException;
import com.jxcell.View;
import java.io.IOException;

public class FormulaSample {

	public static void demo() {
		try {
			View view = new View();
			int rowIndex = 0;
			
			// Sets the number of worksheets in this workbook
			view.setNumSheets(2);
			// set sheet names
			view.setSheetName(0, "sheet1");
			view.setSheetName(1, "sheet2");
			// select the first sheet
			view.setSheet(0);

			// set column width,units equal to 1/256th of the character 0's width in the default font
			view.setColWidth(0, 35 * 256);
			view.setColWidth(1, 15 * 256);
			view.setColWidth(2, 15 * 256);

			view.setTextAsValue(rowIndex++, 0, "Examples of typical formulas usage:");
			view.setTextAsValue(++rowIndex, 0, "Some data:");

			view.setTextAsValue(rowIndex, 1, "3"); // enter number as text
			view.setNumber(rowIndex, 2, 4.1);
			view.setTextAsValue(++rowIndex, 1, "5.2");
			view.setNumber(rowIndex, 2, 6);
			view.setTextAsValue(++rowIndex, 1, "7");
			view.setNumber(rowIndex++, 2, 8.3);

			// Named ranges.
			String namedRange = "Range1";
			view.setDefinedName(namedRange, "$B$3:$C$4");

			// Floats without first digit.
			view.setText(++rowIndex, 0, "Float number without first digit:");
			// Sets the formula,The formula string should not have a leading equal sign (=)
			view.setFormula(rowIndex, 1, ".5/23+.1-2");

			// Function using named range.
			view.setText(++rowIndex, 0, "Named range:");
			view.setFormula(rowIndex, 1, "SUM(" + namedRange + ")");

			// 3D sheet references.
			view.setText(++rowIndex, 0, "3d sheet reference:");
			view.setFormula(rowIndex, 1, "sheet2!$C$2");

			// 3D area sheet references.
			view.setText(++rowIndex, 0, "3d area sheet reference:");
			view.setFormula(rowIndex, 1, "AVERAGE(sheet2!A2:C2)");

			// Function's miss argument.
			view.setText(++rowIndex, 0, "Function's miss arguments:");
			view.setFormula(rowIndex, 1, "Count(1,  ,  ,,,2, 23,,,,,, 34,,,54,,,,  ,)");

			// Functions are case-insensitive.
			view.setText(++rowIndex, 0, "Functions are case-insensitive:");
			view.setFormula(rowIndex, 1, "cOs( 1 )");

			// Functions.
			view.setText(++rowIndex, 0, "Supported functions:");

			String nextFunction = null;
			view.setText(++rowIndex, 0, "Results");
			view.setText(rowIndex++, 1, "Formulas");

			nextFunction = "NOW()+123";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "SECOND(12)/23";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "MINUTE(24)-1343/35";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "(HOUR(56)-23/35)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "WEEKDAY(5)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "YEAR(23)-WEEKDAY(5)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "MONTH(3)-2342/235345";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "((DAY(1)))";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "TIME(1,2,3)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "DATE(1,2,3)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "RAND()";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "TEXT(\"text\", \"$d\")";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "VAR(1,2)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "MOD(1,2)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "NOT(FALSE)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "OR(FALSE)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "AND(TRUE)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "FALSE()";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "TRUE()";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "VALUE(3)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "LEN(\"hello\")";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "MID(\"hello\",1,1)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "ROUND(1,2)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "SIGN(-2)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "INT(3)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "ABS(-3)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "LN(2)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "EXP(4)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "SQRT(2)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "PI()";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "COS(4)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "SIN(3)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "MAX(1,2)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "MIN(1,2)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "AVERAGE(1,2)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "SUM(1,3)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "IF(1,2,3)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "COUNT(1,2,3)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			nextFunction = "SUBTOTAL(1,sheet2!A2:C2)";
			view.setFormula(rowIndex, 0, nextFunction);
			view.setText(rowIndex++, 1, nextFunction);

			// Paranthless checks.
			view.setText(++rowIndex, 0, "Paranthless:");
			view.setFormula(rowIndex, 1, "((12+2343+34545))");

			// Unary operators.
			view.setText(++rowIndex, 0, "Unary operators:");
			view.setFormula(rowIndex, 1, "B5%");
			view.setFormula(rowIndex, 2, "+++B5");

			// Operand tokens, bool.
			view.setText(++rowIndex, 0, "Bool values:");
			view.setFormula(rowIndex, 1, "TRUE");
			view.setFormula(rowIndex, 2, "FALSE");

			// Operand tokens, int.
			view.setText(++rowIndex, 0, "Integer values:");
			view.setFormula(rowIndex, 1, "1");
			view.setFormula(rowIndex, 2, "20");

			// Operand tokens, num.
			view.setText(++rowIndex, 0, "Float values:");
			view.setFormula(rowIndex, 1, ".4");
			view.setFormula(rowIndex, 2, "2235.5132");

			// Operand tokens, str.
			view.setText(++rowIndex, 0, "String values:");
			view.setFormula(rowIndex, 1, "\"hello world!\"");

			// Operand tokens, error.
			view.setText(++rowIndex, 0, "Error values:");
			view.setFormula(rowIndex, 1, "#NULL!");
			view.setFormula(rowIndex, 2, "#DIV/0!");

			// Binary operators.
			view.setText(++rowIndex, 0, "Binary operators:");
			view.setFormula(rowIndex, 1, "(1)-(2)+(3/2+34)/2+12232-32-4");

			// Another sheet.
			view.setSheet(1);
			rowIndex = 0;
			view.setText(rowIndex++, 0, "Some data on another sheet:");
			view.setNumber(rowIndex, 0, 33);
			view.setNumber(rowIndex, 1, 44.1);
			view.setNumber(rowIndex, 2, 55.2);
			view.setNumber(++rowIndex, 0, 66);
			view.setNumber(rowIndex, 1, 77);
			view.setNumber(rowIndex, 2, 88.3);

			view.write("formula_sample.xls");
			// Designer.newDesigner(m_view);
		} catch (CellException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
