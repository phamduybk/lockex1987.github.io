package javafx.demo;

import javafx.application.Application;
import javafx.geometry.Side;
import javafx.scene.Scene;
import javafx.scene.chart.PieChart;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

public class PieChartDemo extends Application {

	@Override
	public void start(Stage primaryStage) throws Exception {

		PieChart pieChart = new PieChart();

		PieChart.Data slice1 = new PieChart.Data("USA", 17947195);
		PieChart.Data slice2 = new PieChart.Data("EU", 11540278);
		PieChart.Data slice3 = new PieChart.Data("China", 10982829);
		PieChart.Data slice4 = new PieChart.Data("Japan", 4116242);
		PieChart.Data slice5 = new PieChart.Data("Others", 28584442);

		pieChart.getData().add(slice1);
		pieChart.getData().add(slice2);
		pieChart.getData().add(slice3);
		pieChart.getData().add(slice4);
		pieChart.getData().add(slice5);

		pieChart.setLegendSide(Side.LEFT);

		primaryStage.setTitle("JavaFX PieChart (o7planning.org)");
		StackPane root = new StackPane(pieChart);

		Scene scene = new Scene(root, 400, 200);

		primaryStage.setScene(scene);

		primaryStage.show();
	}

	public static void main(String[] args) {
		Application.launch(args);
	}
}
