package javafx.demo;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.concurrent.Worker;
import javafx.concurrent.Worker.State;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import netscape.javascript.JSObject;

public class WebViewUpCallsDemo extends Application {

	private DateFormat df = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

	private Label label;

	// Một class cầu nối, phải là public
	public class Bridge {

		public void showTime() {
			System.out.println("Show Time");

			label.setText("Now is: " + df.format(new Date()));
		}
	}

	// Nội dung HTML với một hàm javascript.
	private static String HTML_STRING = //
			"<html>"//
					+ "<head> " //
					+ "  <script language='javascript'> " //
					+ "     function callToJavaFX()  { "//
					+ "        myJavaMember.showTime(); " //
					+ "     } " //
					+ "  </script> "//
					+ "</head> "//
					+ "<body> "//
					+ "   <h2>This is Html content</h2> "//
					+ "   <button onclick='callToJavaFX();'>Call To JavaFX</button> "//
					+ "</body> "//
					+ "</html> "//
	;

	@Override
	public void start(final Stage stage) {

		label = new Label("-");

		final WebView browser = new WebView();
		final WebEngine webEngine = browser.getEngine();

		// Bật JavaScript.
		webEngine.setJavaScriptEnabled(true);

		// Worker làm nhiệm vụ tải trang web
		Worker<Void> worker = webEngine.getLoadWorker();

		// Lắng nghe các trạng thái tải trang web.
		worker.stateProperty().addListener(new ChangeListener<State>() {

			@Override
			public void changed(ObservableValue<? extends State> observable, //
					State oldValue, State newValue) {

				// Khi trang web tải thành công
				if (newValue == Worker.State.SUCCEEDED) {

					// Lấy ra đối tượng window của trang
					JSObject jsobj = (JSObject) webEngine.executeScript("window");

					// Set member cho đối tượng 'window'
					// Trong Javascript truy cập: window.myJavaMember....
					jsobj.setMember("myJavaMember", new Bridge());
					System.out.println("Why?");
				}
			}
		});

		// Tải nội dung HTML
		webEngine.loadContent(HTML_STRING);

		VBox root = new VBox();
		root.setPadding(new Insets(5));
		root.setSpacing(5);
		root.getChildren().addAll(label, browser);

		Scene scene = new Scene(root);

		stage.setTitle("JavaFX WebView (o7planning.org)");
		stage.setScene(scene);
		stage.setWidth(450);
		stage.setHeight(300);

		stage.show();
	}

	public static void main(String[] args) {
		launch(args);
	}

}
