package download.service.book;

import java.util.Arrays;
import java.util.List;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import common.util.CommonUtils;

/**
 * Download TutorialsPoint's tutorials.
 */
public class DownloadTutorialsPoint extends BaseBookDownloader {

	private static final List<String> REMOVE_CLASSES = Arrays.asList(
			"cover",
			"pre-btn",
			"nxt-btn",
			"clearer",
			"center-aligned tutorial-menu",
			"print-btn center",
			"pdf-btn",
			"bottomgooglead",
			"topgooglead",
			"print-btn");

	public DownloadTutorialsPoint(String[] urls, String title) throws Exception {
		download("http://www.tutorialspoint.com", urls, title);
	}

	@Override
	protected String filterContent(Document doc, String baseUrl, String url, int index) throws Exception {
		// Get content of a article
		Element article = doc.getElementsByClass("middle-col").first();
		// Download image and change image's reference
		CommonUtils.changeImages(article, "", url, baseUrl);

		// Filter the content of the article
		// Remove special classes and rulers (horizontal lines)
		Elements children = article.children();
		for (Element e : children) {
			String cl = e.className();
			if (REMOVE_CLASSES.contains(cl)) {
				e.remove();
			} else {
				String t = e.tagName();
				if (t.equals("hr")) {
					e.remove();
				}
			}
		}
		return article.html();
	}

	public static void main(String[] args) throws Exception {
		String[] urls = new String[] {
				"http://www.tutorialspoint.com/mongodb/index.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_overview.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_advantages.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_environment.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_data_modeling.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_create_database.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_drop_database.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_create_collection.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_drop_collection.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_datatype.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_insert_document.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_query_document.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_update_document.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_delete_document.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_projection.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_limit_record.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_sort_record.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_indexing.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_aggregation.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_replication.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_sharding.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_create_backup.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_deployment.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_java.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_php.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_relationships.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_database_references.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_covered_queries.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_analyzing_queries.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_atomic_operations.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_advanced_indexing.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_indexing_limitations.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_objectid.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_map_reduce.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_text_search.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_regular_expression.htm",
				"http://www.tutorialspoint.com/mongodb/working_with_rockmongo.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_gridfs.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_capped_collections.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_autoincrement_sequence.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_questions_answers.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_quick_guide.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_useful_resources.htm",
				"http://www.tutorialspoint.com/mongodb/mongodb_discussion.htm"
		};
		new DownloadTutorialsPoint(urls, "MongoDB Tutorial");
	}
}
