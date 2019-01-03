package cttd.webdesk;

import javafx.application.Application;

public class LaunchApplication {

	public static void main(String[] args) {
		Application.launch(Webdesk.class,
				"--width=600",
				"--height=600",
				"--url=file:///data/archive/project (old)/webdesk/webdesk-demo.html",
				// "--url=file:///data/new/sunburst-01.html",
				// "--url=file:///data/new/firework/index.html",
				// "--url=file:///data/new/hacker/index.html",
				// "--url=file:///data/new/w3.css/00.html",
				// "--url=http://vnexpress.net/",
				// "--url=http://khoahoc.tv/",

				"--classes=myJavaMember:cttd.webdesk.ChangeBackgroundController",
				"--title=WebDesk Demo");
	}
}
