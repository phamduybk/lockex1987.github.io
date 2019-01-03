package cttd.webdesk;

import javafx.scene.web.WebEngine;

public class BaseJsController {

	private WebEngine webEngine;

	public void setWebEngine(WebEngine webEngine) {
		this.webEngine = webEngine;
	}

	/**
	 * Goi mot ham JavaScript cua trang dang hien thi
	 * @param script Ham JavaScript
	 * @return
	 */
	public Object executeScript(String script) {
		return webEngine.executeScript(script);
	}
}
