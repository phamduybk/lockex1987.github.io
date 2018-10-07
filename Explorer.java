import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Map;
import java.util.HashMap;

public class Explorer {

	public static void main(String[] args) throws Exception {
		String path = "posts/";
		File root = new File(path);

		StringBuilder posts = new StringBuilder();
		Map<String, Integer> map = new HashMap<>();
		Arrays.stream(root.list())
				.sorted()
				.forEach(s -> {
					posts.append("'" + s.replace("'", "\\'") + "',\n");
					String[] a = s.split(" - ");

					String category = a[0];

					Integer count = map.get(category);
					if (count == null) {
						map.put(category, 1);
					} else {
						map.put(category, count + 1);
					}
				});

		StringBuilder categories = new StringBuilder();
		map.entrySet()
				.stream()
				.sorted(Map.Entry.<String, Integer> comparingByValue().reversed())
				.forEach(e -> {
					categories.append("{ name: '" + e.getKey() + "', y: " + e.getValue() + " },\n");
				});

		// map.forEach((k, v) -> { System.out.println(k + ": " + v); });

		String content = "var posts = [\n"
				+ posts.substring(0, posts.length() - 2)
				+ "\n];\n"
				+ "var categories = [\n"
				+ categories.substring(0, categories.length() - 2)
				+ "\n];\n";
		System.out.println(content);

		Files.write(Paths.get("js/explorer-data.js"), content.getBytes());
	}
}
