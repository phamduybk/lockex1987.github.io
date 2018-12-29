package download.getlink;

import java.io.BufferedReader;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;

import common.util.CommonUtils;
import common.util.Downloader;

public class GetYoutubeLink {

	// Video quality
	public static String HD_720 = "22";
	public static String SD_360 = "18";

	public static final Map<String, String> MP4_QUALITY_MAP;
	static {
		MP4_QUALITY_MAP = new HashMap<>();
		MP4_QUALITY_MAP.put(HD_720, "HD 720");
		MP4_QUALITY_MAP.put(SD_360, "SD 360");
	}

	/**
	 * Get URL of video to download
	 * @param watchUrl Normal Youtube URL
	 * @return List of string arrays (the first element is quality, the second element is URL, the
	 *         third element is title).
	 */
	public static List<String[]> getVideoUrl(String watchUrl) throws Exception {
		BufferedReader br = Downloader.readUrl(watchUrl);
		String s;
		String clue = "ytplayer.config = {";
		List<String[]> retval = null;
		while ((s = br.readLine()) != null) {
			int startIdx = s.indexOf(clue);
			if (startIdx >= 0) {
				int endIdx = s.indexOf("};", startIdx);
				String jsonText = s.substring(startIdx + clue.length() - 1, endIdx + 1);
				//System.out.println(jsonText);
				retval = parseJson(jsonText);
				break;
			}
		}
		br.close();
		return retval;
	}

	/**
	 * Extract information
	 * @param jsonText JSON text
	 * @return Map of URLs
	 */
	private static List<String[]> parseJson(String jsonText) {
		JSONObject jsonRoot = new JSONObject(jsonText);
		JSONObject args = jsonRoot.getJSONObject("args");
		String title = args.getString("title");
		//System.out.println(title);

		String[] streamMap = args.getString("url_encoded_fmt_stream_map").split(",");
		List<String[]> retval = new ArrayList<>();
		for (String s : streamMap) {
			s = s.replace("\u0026", "&");
			JSONObject jsonObject = CommonUtils.queryStringToJson(s);
			String itag = jsonObject.getString("itag");

			// Get only MP4 format
			String quality = MP4_QUALITY_MAP.get(itag);
			if (quality != null) {
				String url = jsonObject.getString("url");
				url = alterVideoUrl(url, title);
				retval.add(new String[] { quality, url, title });
			}
		}
		return retval;
	}

	/**
	 * Change the URL so it is downloadable
	 * @param url Original URL
	 * @param title Title of the video
	 * @return Downloadable URL
	 */
	private static String alterVideoUrl(String url, String title) {
		url = URLDecoder.decode(url);
		url = url.replace("%2F", "/").replace("%2C", ",");
		return url + "&title=" + title; // Add 'title' parameter to download file instead of view file on the browser 
	}
}
