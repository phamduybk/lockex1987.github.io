package common.testing;

public class PrivateMethod {

	public String publicMethod() {
		return "Call from public method: " + privateMethod();
	}
	
	private String privateMethod() {
		return "This method is only used in this class";
	}
}
