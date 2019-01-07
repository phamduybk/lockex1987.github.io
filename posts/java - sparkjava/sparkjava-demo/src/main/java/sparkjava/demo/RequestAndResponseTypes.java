package sparkjava.demo;

import static spark.Spark.get;
import static spark.Spark.post;

public class RequestAndResponseTypes {

	public void init() {
		testGet();
		testPost();
	}
	
	private void testGet() {
		get("/hello", (req, res) -> "Hello World");
	}

	private void testPost() {
		post("/login", (request, response) -> {
			// Lấy tham số người dùng truyền vào
			String username = request.queryParams("username");
			String password = request.queryParams("password");

			// Giả lập việc kiểm tra xác thực
			// Đơn giản là tên phải đúng là "foo" và mật khẩu phải đúng là "bar"
			boolean check = ("foo".equals(username)) && ("bar".equals(password));

			// Kiểu trả về là JSON
			response.type("application/json");

			// Trả về cho client
			return "{ result: " + check + " }";
		});
	}
}
