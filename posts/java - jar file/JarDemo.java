import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class JarDemo {

	public static void main(String[] args) throws Exception {
		String path = "test_jar.txt";
		InputStream stream = ClassLoader.getSystemResourceAsStream(path);
		BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
		String line;
		while ((line = reader.readLine()) != null) {
			System.out.println(line);
		}
		reader.close();
	}
}