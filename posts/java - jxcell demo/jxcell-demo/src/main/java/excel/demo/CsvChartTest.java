package excel.demo;

import com.jxcell.ChartShape;
import com.jxcell.RangeRef;
import com.jxcell.View;

public class CsvChartTest {
	public static void demo() {
		try {
			View view = new View();
			view.read(AppUtils.readFile("book.csv"));
			
			ChartShape chart = view.addChart((short) 1, (short) 9, (short) 9, (short) 22);
			chart.initData(new RangeRef(0, 1, 4, 7), true); // Sheet1!$A$2:$E$8
			
			// Default is type column
			view.write("chart_column.xls");
			
			chart.setChartType(ChartShape.TypeBar);
			view.write("chart_bar.xls");
			
			chart.setChartType(ChartShape.TypePie);
			view.write("chart_pie.xls");
			
			chart.setChartType(ChartShape.TypeLine);
			view.write("chart_line.xls");
			
			chart.setChartType(ChartShape.TypeArea);
			view.write("chart_area.xls");
			
			chart.setChartType(ChartShape.TypePie);
			view.write("chart_pie.xls");
			
			chart.setChartType(ChartShape.TypeDoughnut);
			view.write("chart_doughnut.xls");
			
			chart.setChartType(ChartShape.TypeScatter);
			view.write("chart_scatter.xls");
			
			chart.setChartType(ChartShape.TypeBubble);
			view.write("chart_bubble.xls");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
