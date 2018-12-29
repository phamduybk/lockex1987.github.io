/*
 * NVH
 */
package download.service;

import common.util.CommonUtils;
import common.util.Constants;
import common.util.Downloader;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import java.util.Map;

/**
 * Download mp3 file and lrc file from mp3.zing.vn.
 *
 * @author huyennv1
 */
public class DownloadMp3ZingVn2 {

    private static final String API = "http://api.mp3.zing.vn/api/mobile/song/getsonginfo?requestdata={\"id\":\"IDBAIHAT\"}";

    public DownloadMp3ZingVn2(String url) throws Exception {
        // Get song ID
        int idx = url.lastIndexOf("/");
        String id = url.substring(idx + 1, url.length() - 5);

        // Parse JSON
        String json = Downloader.getJson(API.replace("IDBAIHAT", id));
        Gson gson = new Gson();
        Mp3ZingVn r = gson.fromJson(json, Mp3ZingVn.class);
        String title = r.title;
        String artist = r.artist;
        String lyric = r.lyric;
        Map<String, String> link = r.link;
        String source = getSource(link);

        // Download files
        String name = CommonUtils.stripAccents(title + " - " + artist).toLowerCase();
        Downloader.downloadFile(source, Constants.OUTPUT_FOLDER + name + ".mp3"); // 403 Forbidden
        if (!lyric.isEmpty()) {
        	Downloader.downloadFile(lyric, Constants.OUTPUT_FOLDER + name + ".lrc");
        }
    }

    private String getSource(Map<String, String> link) {
        String l128 = "";
        String lossless = "";
        String l320 = "";
        for (Map.Entry<String, String> e : link.entrySet()) {
            if (e.getKey().equals("128")) {
                l128 = e.getValue();
            } else if (e.getKey().equals("320")) {
                l320 = e.getValue();
            } else if (e.getKey().equals("lossless")) {
                lossless = e.getValue();
            }
        }
        // 320 forbidden
        return l128;
//        if (!lossless.isEmpty()) {
//            return lossless;
//        } else if (!l320.isEmpty()) {
//            return l320;
//        } else {
//            return l128;
//        }
    }

    class Mp3ZingVn {

        String title;
        String artist;
        @SerializedName("lyrics_file")
        String lyric;
        @SerializedName("source")
        Map<String, String> link;
    }
    
    private static void testDownloadMp3ZingVn2() throws Exception {
		//new DownloadMp3ZingVn2(prop.getProperty(KEY_URL));
		// http://mp3.zing.vn/bai-hat/Happy-New-Year-ABBA/ZWZEC669.html
	}
}
