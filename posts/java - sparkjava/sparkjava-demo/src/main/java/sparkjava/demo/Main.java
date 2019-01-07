package sparkjava.demo;

public class Main {

	public static void main(String[] args) {
		new StaticFiles().init();
		new Cors().enable();
		new RequestAndResponseTypes().init();
		new Cookie().init();;
		new Session().init();
	}
}
