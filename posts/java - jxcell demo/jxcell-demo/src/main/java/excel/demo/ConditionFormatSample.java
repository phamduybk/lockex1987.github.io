package excel.demo;

import com.jxcell.CellFormat;
import com.jxcell.ConditionFormat;
import com.jxcell.GRObject;
import com.jxcell.View;

public class ConditionFormatSample {

	public static void demo() {
		View view = new View();
		try {
			view.getLock();
			ConditionFormat condfmt[] = new ConditionFormat[3];
			condfmt[0] = view.CreateConditionFormat();
			condfmt[1] = view.CreateConditionFormat();
			condfmt[2] = view.CreateConditionFormat();

			// Condition #1
			CellFormat cf = condfmt[0].getCellFormat();
			condfmt[0].setType(ConditionFormat.TypeFormula);
			condfmt[0].setFormula1("and(iseven(row()), $D1 > 1000)", 0, 0);
			cf.setFontColor(java.awt.Color.blue);
			cf.setPattern(CellFormat.PatternSolid);
			cf.setPatternFG(java.awt.Color.magenta);
			condfmt[0].setCellFormat(cf);

			// Condition #2
			condfmt[1].setType(ConditionFormat.TypeFormula);
			condfmt[1].setFormula1("iseven($A1)", 0, 0);
			cf = condfmt[1].getCellFormat();
			cf.setFontColor(java.awt.Color.orange);
			cf.setPattern(CellFormat.PatternSolid);
			cf.setPatternFG(java.awt.Color.lightGray);
			condfmt[1].setCellFormat(cf);

			// Condition #3
			condfmt[2].setType(ConditionFormat.TypeCell);
			condfmt[2].setFormula1("500", 0, 0);
			condfmt[2].setOperator(ConditionFormat.OperatorGreaterThan);
			cf = condfmt[2].getCellFormat();
			cf.setFontColor(java.awt.Color.red);
			cf.setFontBold(true);
			cf.setFontItalic(true);
			condfmt[2].setCellFormat(cf);

			// Select the range and apply conditional formatting
			view.setSelection(0, 0, 39, 3);
			view.setConditionalFormats(condfmt);

			// set data
			view.setNumber(1, 3, 2000); // D2
			view.setNumber(2, 0, 2); // A3
			view.setNumber(2, 1, 600); // B3
			view.setText(2, 2, "Mark"); // C3
			view.setNumber(3, 0, 1); // A4
			view.setNumber(3, 1, 600); // B4
			view.setText(3, 2, "Mark"); // C4

			view.setText(1, 4, "Rule 1(and(iseven(row()), $D1 > 1000))"); // E2
			view.setText(2, 4, "Rule 2(iseven($A1))"); // E3
			view.setText(3, 4, "Rule 3(cell value greater than 500)"); // E4

			GRObject textBox = view.addObject(GRObject.eText, 5, 5, 11.0, 21.0); // F6:K21
			textBox.setText("Conditional  formattings(scope:$A$1:$D$40)\n\n" +
					"Rule 1:\n" +
					"formula:     and(iseven(row()), $D1 > 1000)\n" +
					"formatting:  font(blue) and fill(magenta)\n\n" +
					"Rule 2:\n" +
					"formula:     iseven($A1)\n" +
					"formatting:  font(orange) and fill(lightgray)\n\n\n" +
					"Rule 3:\n" +
					"formula:     cell value greater than 500\n" +
					"formatting:  font(red)");

			view.write("condition_formats.xls");
			com.jxcell.designer.Designer.newDesigner(view);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			view.releaseLock();
		}
	}

}