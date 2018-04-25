package common.testing;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
		BasicAnnotationTests.class,
		ExceptionTests.class
})
public class SuiteTests {
	// Normally, this is an empty class
}
