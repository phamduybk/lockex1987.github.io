package cttd.webdesk;

import cttd.webdesk.BaseJsController;

public class ChangeBackgroundController extends BaseJsController {

	public void showTime() {
		System.out.println("Execute by Java");
		executeScript("changeBgColor();");
	}
}
