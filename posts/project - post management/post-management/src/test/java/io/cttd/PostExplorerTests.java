package io.cttd;

import java.util.List;

import org.junit.Ignore;
import org.junit.Test;

public class PostExplorerTests {

	private PostExplorer obj = new PostExplorer();

	@Ignore
	@Test
	public void testGetPostList() {
		// Thư mục hiện tại là post-management
		// Lên 1 cấp là thư mục "project - post management"
		String rootPath = "../..";
		List<Post> postList = obj.getPostList(rootPath);

		postList.stream().forEach(post -> {
			System.out.println(post.getPath());
		});
	}	
}
