/*
 * NVH
 */
package download.service.book;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

/**
 * Download and standardize word-only story.
 */
public class DownloadVnthuquan extends BaseBookDownloader {

	public DownloadVnthuquan(String[] urls, String title) throws Exception {
		download("http://vnthuquan.org/", urls, title);
	}

	@Override
	protected String filterContent(Document doc, String baseUrl, String url, int index) throws Exception {
		Element content = doc.getElementById("fontchu").parent();
		return content.html();
	}

	public static void main(String[] args) throws Exception {
		String[] a = new String[] {
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nvn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237n1n",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nnn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237n2n",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237ntn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237n3n",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nqn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237n4n",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nmn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nvn0n",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nvnvn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nvn1n",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nvnnn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nvn2n",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nvntn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nvn3n",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nvnqn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nvn4n",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237nvnmn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237n1n0n",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237n1nvn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237n1n1n",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237n1nnn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237n1n2n",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237n1ntn",
				"truyen.aspx?tid=2qtqv3m3237nvntnvn2nqn31n343tq83a3q3m3237n1n3n"
		};
		String[] urls = new String[a.length];
		for (int i = 0; i < urls.length; i++) {
			urls[i] = "http://vnthuquan.org/(S(1bo4pqievalcwfvxtmev3fez))/truyen/" + a[i];
		}
		new DownloadVnthuquan(urls, "Tế Công");
	}
}
