package io.cttd;

/**
 * Đối tượng bài viết.
 */
public class Post {

	// Thể loại (JavaScript, HTML, Bootstrap, Java,...)
	private String category;
	// Tiêu đề bài viết
	private String title;
	// Đường dẫn bài viết (bên trong thư mục to posts)
	private String path;
	// Mô tả bài viết
	// Gộp chung tag vào mô tả
	private String description;
	// Ngôn ngữ của bài viết (tiếng Anh, tiếng Việt)
	// private String language;

	public Post(String category, String title, String path, String description) {
		this.category = category;
		this.title = title;
		this.path = path;
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
