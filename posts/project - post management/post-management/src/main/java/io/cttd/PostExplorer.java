package io.cttd;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PostExplorer {

	/**
	 * Hàm xử lý chính.
	 */
	public void process() throws Exception {
		List<Post> postList = this.getPostList("posts");
		Map<String, Integer> categoryCountMap = this.calculateCategoryCountMap(postList);
		String content = this.getDataContent(postList, categoryCountMap);
		this.writeDataFile(content, "js/posts-data.js");
	}

	/**
	 * Lấy ra danh sách Post.
	 * 
	 * @param rootPath Đường dẫn đến thư mục to
	 * @return Danh sách Post
	 */
	public List<Post> getPostList(String rootPath) {
		// Duyệt các thư mục con bên trong thư mục to "posts"
		List<Post> postList = new ArrayList<>();

		Arrays.stream(new File(rootPath).list())
				.sorted()
				.forEach(folderName -> {
					// Lấy ra thể loại của bài viết (phần đầu tiên trước dấu trừ ngăn cách)
					String[] a = folderName.split(" - ");
					String category = a[0];

					// Lấy ra tiêu đề, mô tả (tag) của bài viết
					IndexFile indexFile = new IndexFile(rootPath + "/" + folderName + "/index.html");
					String title = indexFile.getTitle();
					String description = indexFile.getDescription();

					// Đường dẫn
					String path = folderName;

					// Thêm vào danh sách
					postList.add(new Post(category, title, path, description));
				});
		return postList;
	}

	/**
	 * Tính toán số bài viết của từng thể loại.
	 * 
	 * @param postList Danh sách Post
	 * @return Map thể loại với số bài viết của thể loại đó
	 */
	private Map<String, Integer> calculateCategoryCountMap(List<Post> postList) {
		Map<String, Integer> categoryCountMap = new HashMap<>();
		postList.stream()
				.forEach(post -> {
					String category = post.getCategory();
					Integer count = categoryCountMap.get(category);
					if (count == null) {
						categoryCountMap.put(category, 1);
					} else {
						categoryCountMap.put(category, count + 1);
					}
				});
		return categoryCountMap;
	}

	/**
	 * Lấy ra nội dung để ghi ra file.
	 * 
	 * @param postList         Danh sách Post
	 * @param categoryCountMap Map thể loại và bài viết
	 * @return Nội dung file
	 */
	private String getDataContent(List<Post> postList, Map<String, Integer> categoryCountMap) {
		// Nội dung danh sách bài viết
		StringBuilder posts = new StringBuilder();
		postList.stream()
				.forEach(post -> {
					posts.append("    {");
					posts.append(" category: \"" + post.getCategory().replace("\"", "\\\"") + "\",");
					posts.append(" path: \"" + post.getPath().replace("\"", "\\\"") + "\",");
					posts.append(" title: \"" + post.getTitle().replace("\"", "\\\"") + "\",");
					posts.append(" description: \"" + post.getDescription().replace("\"", "\\\"") + "\"");
					posts.append(" },\n");
				});

		// Nội dung thể loại
		StringBuilder categories = new StringBuilder();
		categoryCountMap.entrySet()
				.stream()
				.sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
				.forEach(e -> {
					categories.append("    { name: \"" + e.getKey() + "\", y: " + e.getValue() + " },\n");
				});

		// Nội dung in ra file
		String content = "var allPosts = [\n"
				+ posts.substring(0, posts.length() - 2) // loại dấu phảy cuối cùng
				+ "\n];"
				+ "\n"
				+ "\n"
				+ "var categories = [\n"
				+ categories.substring(0, categories.length() - 2) // loại dấu phảy cuối cùng
				+ "\n];"
				+ "\n";
		return content;
	}

	/**
	 * Ghi ra file dữ liệu.
	 * 
	 * @param content  Nội dung file
	 * @param filePath Đường dẫn đến file đầu ra
	 */
	private void writeDataFile(String content, String filePath)
			throws IOException {
		Files.write(Paths.get(filePath), content.getBytes("UTF-8"));
	}
}
