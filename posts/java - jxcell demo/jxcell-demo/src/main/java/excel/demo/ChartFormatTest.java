package excel.demo;

import com.jxcell.*;
import java.awt.*;

public class ChartFormatTest {
	public static void demo() {
		View view = new View();
		try {
			view.getLock();
			view.setTextAsValue(1, 2, "Jan");
			view.setTextAsValue(1, 3, "Feb");
			view.setTextAsValue(1, 4, "Mar");
			view.setTextAsValue(1, 5, "Apr");
			view.setTextAsValue(2, 1, "Bananas");
			view.setTextAsValue(3, 1, "Papaya");
			view.setTextAsValue(4, 1, "Mango");
			view.setTextAsValue(5, 1, "Lilikoi");
			view.setTextAsValue(6, 1, "Comfrey");
			view.setTextAsValue(7, 1, "Total");

			view.setTextAsValue(1, 6, "time");
			view.setNumber(2, 6, 1);
			view.setNumber(3, 6, 2);
			view.setNumber(4, 6, 3);
			view.setNumber(5, 6, 4);
			view.setNumber(6, 6, 5);
			view.setNumber(7, 6, 6);

			for (int col = 2; col <= 5; col++) {
				for (int row = 2; row <= 7; row++) {
					view.setFormula(row, col, "rand()");
				}
			}
			view.setFormula(7, 2, "SUM(C3:C7)");
			view.setSelection("C8:F8");
			view.editCopyRight();

			ChartShape chart = view.addChart(0, 9.1, 7, 20.4);

			chart.setChartType(ChartShape.TypeLine);
			// chart.setLinkRange("Sheet1!$C$2", false);

			chart.addSeries();
			chart.setSeriesName(0, "Sheet1!$C$2");
			chart.setSeriesYValueFormula(0, "Sheet1!$C$3:$C$7");
			chart.setCategoryFormula("Sheet1!$B$3:$B$7");

			chart.addSeries();
			chart.setSeriesName(1, "Sheet1!$D$2");
			chart.setSeriesYValueFormula(1, "Sheet1!$D$3:$D$7");

			chart.addSeries();
			chart.setSeriesName(2, "Sheet1!$E$2");
			chart.setSeriesYValueFormula(2, "Sheet1!$E$3:$E$7");

			chart.addSeries();
			chart.setSeriesName(3, "Sheet1!$F$2");
			chart.setSeriesYValueFormula(3, "Sheet1!$F$3:$F$7");

			// chart.getChart().validateData();

			chart.setAxisTitle(ChartShape.XAxis, 0, "Category");
			chart.setAxisTitle(ChartShape.YAxis, 0, "Amount");

			// set fill color
			ChartFormat cf = chart.getChartFormat();
			cf.setPattern((short) 1);
			cf.setPatternFG(Color.LIGHT_GRAY.getRGB());
			chart.setChartFormat(cf);

			cf = chart.getPlotFormat();
			cf.setPattern((short) 1);
			cf.setPatternFG(new Color(204, 255, 255).getRGB());
			chart.setPlotFormat(cf);

			cf = chart.getAxisFormat(ChartShape.XAxis, 0);
			cf.setFontSizeInPoints(8.5);
			chart.setAxisFormat(ChartShape.XAxis, 0, cf);

			cf = chart.getAxisFormat(ChartShape.YAxis, 0);
			cf.setFontSizeInPoints(8.5);
			chart.setAxisFormat(ChartShape.YAxis, 0, cf);

			cf = chart.getSeriesFormat(0);
			cf.setLineStyle((short) 1);
			cf.setLineWeight(3 * 20);
			cf.setLineColor((new Color(0, 0, 128)).getRGB());
			cf.setMarkerAuto(false);
			cf.setMarkerStyle((short) 0);
			chart.setSeriesFormat(0, cf);

			cf = chart.getSeriesFormat(1);
			cf.setLineStyle((short) 1);
			cf.setLineWeight(3 * 20);
			cf.setLineColor((new Color(255, 0, 255)).getRGB());
			cf.setMarkerAuto(false);
			cf.setMarkerStyle((short) 0);
			chart.setSeriesFormat(1, cf);

			cf = chart.getSeriesFormat(2);
			cf.setLineStyle((short) 1);
			cf.setLineWeight(3 * 20);
			cf.setLineColor((new Color(255, 255, 0)).getRGB());
			cf.setMarkerAuto(false);
			cf.setMarkerStyle((short) 0);
			chart.setSeriesFormat(2, cf);

			cf = chart.getSeriesFormat(3);
			cf.setLineStyle((short) 1);
			cf.setLineWeight(3 * 20);
			cf.setLineColor((new Color(0, 255, 255)).getRGB());
			cf.setMarkerAuto(false);
			cf.setMarkerStyle((short) 0);
			chart.setSeriesFormat(3, cf);

			cf = chart.getMajorGridFormat(ChartShape.YAxis, 0);
			cf.setLineStyle((short) 2);
			cf.setLineColor((new Color(255, 0, 0)).getRGB());
			cf.setLineAuto();
			chart.setMajorGridFormat(ChartShape.YAxis, 0, cf);

			chart.setLegendPosition(ChartFormat.LegendPlacementTop);

			cf = chart.getLegendFormat();
			cf.setFontBold(true);
			cf.setFontSizeInPoints(8);
			chart.setLegendFormat(cf);

			view.write("formatted_chart.xls");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		} finally {
			view.releaseLock();
		}
	}
}