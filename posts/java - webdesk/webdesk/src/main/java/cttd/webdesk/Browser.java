package cttd.webdesk;

import java.lang.reflect.Method;

import javafx.concurrent.Worker;
import javafx.scene.layout.VBox;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import netscape.javascript.JSObject;

public class Browser extends VBox {

	public Browser(String url, String[] clazz) {
		// Khoi tao giao dien WebView va doi tuong thuc thi WebEngine
		WebView webView = new WebView();
		WebEngine webEngine = webView.getEngine();

		// Bat JavaScript
		webEngine.setJavaScriptEnabled(true);

		// Improve style
		webEngine.setUserStyleSheetLocation("data:,body { font: 12px Arial; }");

		setJsControllers(webEngine, clazz);

		// Tai trang
		webEngine.load(url);
		getChildren().add(webView);
	}

	private void setJsControllers(final WebEngine webEngine, String[] clazz) {
		if (clazz != null && clazz.length > 0) {
			// Worker lam nhiem vu tai trang web
			Worker<Void> worker = webEngine.getLoadWorker();

			// Lang nghe cac trang thai tai trang web
			worker.stateProperty().addListener((observable, oldValue, newValue) -> {

				// Khi trang web tai thanh cong
				if (newValue == Worker.State.SUCCEEDED) {

					// Lay ra doi tuong cua trang web
					JSObject jsWindow = (JSObject) webEngine.executeScript("window");

					for (String s : clazz) {
						System.out.println("Setting JavaScript");
						String[] a = s.split(":");
						String ref = a[0];
						String className = a[1];
						try {
							System.out.println(ref + " -> " + className);
							Class<?> c = Class.forName(className);
							Method method = c.getMethod("setWebEngine", WebEngine.class);
							Object jsController = c.newInstance();
							method.invoke(jsController, webEngine);

							// De co the goi ham Java tu JavaScript,
							// chung ta goi kieu <ref>.<ham Java>
							jsWindow.setMember(ref, jsController);
						} catch (Exception ex) {
							ex.printStackTrace();
						}
					}
				}
			});
		}
	}
}
