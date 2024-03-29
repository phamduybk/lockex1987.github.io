package javafx.demo;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.model.Employee;
import javafx.scene.Scene;
import javafx.scene.control.TreeItem;
import javafx.scene.control.TreeTableColumn;
import javafx.scene.control.TreeTableView;
import javafx.scene.control.cell.TreeItemPropertyValueFactory;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

public class TreeTableViewDemo extends Application {

	@Override
	public void start(Stage stage) {
		TreeTableView<Employee> treeTableView = new TreeTableView<Employee>();

		// Tạo cột EmpNo (Kiểu dữ liệu String)
		TreeTableColumn<Employee, String> empNoCol //
				= new TreeTableColumn<Employee, String>("Emp No");

		// Tạo cột FullName (Kiểu dữ liệu String)
		TreeTableColumn<Employee, String> fullNameCol//
				= new TreeTableColumn<Employee, String>("Full Name");

		// Tạo 2 cột con cho cột FullName
		TreeTableColumn<Employee, String> firstNameCol //
				= new TreeTableColumn<Employee, String>("First Name");

		TreeTableColumn<Employee, String> lastNameCol //
				= new TreeTableColumn<Employee, String>("Last Name");

		// Thêm 2 cột con vào cột FullName
		fullNameCol.getColumns().addAll(firstNameCol, lastNameCol);

		// Gender Column
		TreeTableColumn<Employee, String> genderCol //
				= new TreeTableColumn<Employee, String>("Gender");

		// Position Column
		TreeTableColumn<Employee, String> positionCol //
				= new TreeTableColumn<Employee, String>("Position");

		// Single? Column
		TreeTableColumn<Employee, Boolean> singleCol//
				= new TreeTableColumn<Employee, Boolean>("Single?");

		// Định nghĩa cách để lấy dữ liệu cho mỗi ô.
		// Lấy giá trị từ các thuộc tính của Employee.
		empNoCol.setCellValueFactory(new TreeItemPropertyValueFactory<Employee, String>("empNo"));
		firstNameCol.setCellValueFactory(new TreeItemPropertyValueFactory<Employee, String>("firstName"));
		lastNameCol.setCellValueFactory(new TreeItemPropertyValueFactory<Employee, String>("lastName"));
		positionCol.setCellValueFactory(new TreeItemPropertyValueFactory<Employee, String>("position"));
		genderCol.setCellValueFactory(new TreeItemPropertyValueFactory<Employee, String>("gender"));
		singleCol.setCellValueFactory(new TreeItemPropertyValueFactory<Employee, Boolean>("single"));

		// Thêm các cột vào TreeTable
		treeTableView.getColumns().addAll(empNoCol, fullNameCol, positionCol, genderCol, singleCol);

		// Thêm dữ liệu
		Employee empBoss = new Employee("E00", "Abc@gmail.com", //
				"Boss", "Boss", "Manager", "M", false);

		Employee empSmith = new Employee("E01", "Smith@gmail.com", //
				"Susan", "Smith", "Salesman", "F", true);

		Employee empMcNeil = new Employee("E02", "McNeil@gmail.com", //
				"Anne", "McNeil", "Cleck", "M", false);

		// Phần tử gốc
		TreeItem<Employee> itemRoot = new TreeItem<Employee>(empBoss);
		TreeItem<Employee> itemSmith = new TreeItem<Employee>(empSmith);
		TreeItem<Employee> itemMcNeil = new TreeItem<Employee>(empMcNeil);

		itemRoot.getChildren().addAll(itemSmith, itemMcNeil);
		treeTableView.setRoot(itemRoot);
		//
		StackPane root = new StackPane();
		root.setPadding(new Insets(5));
		root.getChildren().add(treeTableView);

		stage.setTitle("TreeTableView (o7planning.org)");

		Scene scene = new Scene(root, 450, 300);
		stage.setScene(scene);
		stage.show();
	}

	public static void main(String[] args) {
		launch(args);
	}
}
