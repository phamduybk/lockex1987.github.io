package common.testing;

import static org.junit.Assert.assertEquals;

import java.lang.reflect.Method;

import org.junit.Test;

public class PrivateMethodTests {
	
	private PrivateMethod obj = new PrivateMethod();

	@Test
	public void publicMethodTest() {
		assertEquals("Call from public method: This method is only used in this class", obj.publicMethod());
	}
	
	@Test
	public void privateMethodTest() throws Exception {
		Method m = PrivateMethod.class.getDeclaredMethod("privateMethod");
		if (!m.isAccessible()) {
			m.setAccessible(true);
		}
		String s = (String) m.invoke(obj, null);
		//System.out.println(s);
		assertEquals("This method is only used in this class", s);
	}
}
