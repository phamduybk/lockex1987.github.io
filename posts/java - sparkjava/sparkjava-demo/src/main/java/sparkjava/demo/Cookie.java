package sparkjava.demo;

import static spark.Spark.get;
import static spark.Spark.post;

public class Cookie {

	private static final String COOKIE_NAME = "authentication_token";

	public void init() {
		setCookie();
		setCookieWithPost();
		getCookie();
		removeCookie();
	}

	private void setCookie() {
		get("/set-cookie", (request, response) -> {
			// Lưu token vào cookie trong 1 tiếng
			String token = "random_token";
			response.cookie(COOKIE_NAME, token, 60 * 60);

			return "Set cookie";
		});
	}

	private void setCookieWithPost() {
		post("/set-cookie-with-post", (request, response) -> {
			// Lưu token vào cookie trong 1 tiếng
			String token = "random_token_post";
			response.cookie(COOKIE_NAME, token, 60 * 60);

			return "Set cookie";
		});
	}

	private void getCookie() {
		get("/get-cookie", (request, response) -> {
			// Lấy thông tin cookie
			String authenticationToken = request.cookie(COOKIE_NAME);
			if (authenticationToken == null || authenticationToken.isEmpty()) {
				authenticationToken = "EMPTY";
			}

			return "authenticationToken: \"" + authenticationToken + "\"";
		});
	}

	private void removeCookie() {
		get("/remove-cookie", (request, response) -> {
			// Remove cookie
			response.removeCookie(COOKIE_NAME);

			return "Remove cookie";
		});
	}
}
