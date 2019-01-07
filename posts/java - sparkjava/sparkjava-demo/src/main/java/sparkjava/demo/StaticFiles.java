package sparkjava.demo;

import static spark.Spark.staticFiles;

public class StaticFiles {

	public void init() {
		// root is 'src/main/resources', so put files in 'src/main/resources/public'
		staticFiles.location("/public");
	}
}
