package sparkjava.demo;

import static spark.Spark.get;

public class Session {
	
	public void init() {
		createSession();
		setSessionAttribute();
		getSessionAttribute();
	}

	private void createSession() {
		get("/create-session", (request, response) -> {
			// Create and return session
			request.session(true);
			return "Create session";
		});
	}

	private void setSessionAttribute() {
		get("/set-session", (request, response) -> {
			// Set session attribute 'user'
			request.session().attribute("user", "xxx");
			return "Set session";
		});
	}

	private void getSessionAttribute() {
		get("/get-session", (request, response) -> {
			// Get session attribute 'user'
			String user = request.session().attribute("user");
			return "Get session: " + user;
		});
	}
}
