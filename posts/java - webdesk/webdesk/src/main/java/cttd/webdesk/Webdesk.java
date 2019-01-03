package cttd.webdesk;

import java.util.Map;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class Webdesk extends Application {

	private String title;
	private String width;
	private String height;
	private String url;
	private String[] clazz;

	private void getParams() {
		Parameters params = getParameters();
		Map<String, String> paramMap = params.getNamed();

		title = paramMap.get("title");
		width = paramMap.get("width");
		height = paramMap.get("height");
		url = paramMap.get("url");
		String classes = paramMap.get("classes");
		System.out.println("classes: " + classes);
		if (classes != null) {
			clazz = classes.split(",");
		}
	}

	private void buildGui(Stage stage) {
		setUserAgentStylesheet(STYLESHEET_MODENA);
		
		// Stage la to nhat, bao gom ca border
		// Scene la vung ben trong
		stage.setTitle(title);
		stage.setScene(new Scene(new Browser(url, clazz)));
		stage.setWidth(Integer.parseInt(width));
		stage.setHeight(Integer.parseInt(height));
		//stage.setResizable(false);
		stage.show();
	}
	
	private void improveStyle() {
		//setUserAgentStylesheet(STYLESHEET_MODENA);
		System.setProperty("prism.lcdtext", "false");
	}

	@Override
	public void start(final Stage stage) {		
		getParams();
		improveStyle();
		buildGui(stage);
	}
}
