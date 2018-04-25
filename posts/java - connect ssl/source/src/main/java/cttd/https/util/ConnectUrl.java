package cttd.https.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.Set;

public class ConnectUrl {

	public static String sendPost(String url, String requestBody, Map<String, String> headers) {
		HttpURLConnection con = null;
		try {
			// Create connection
			con = (HttpURLConnection) new URL(url).openConnection();
			con.setRequestMethod("POST");
			con.setDoOutput(true);

			// Write headers
			if (headers != null) {
				Set<String> headerKey = headers.keySet();
				for (String key : headerKey) {
					con.setRequestProperty(key, headers.get(key));
				}
			}

			// Write request body
			DataOutputStream dos = new DataOutputStream(con.getOutputStream());
			dos.write(requestBody.getBytes("UTF-8"));
			dos.flush();
			dos.close();

			// Get response
			return processResponse(con);
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		} finally {
			if (con != null) {
				con.disconnect();
			}
		}
	}

	public static String sendGet(String url) {
		HttpURLConnection con = null;
		try {
			// Create connection
			con = (HttpURLConnection) new URL(url).openConnection();
			con.setRequestMethod("GET");

			// Get response
			return processResponse(con);
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		} finally {
			if (con != null) {
				con.disconnect();
			}
		}
	}

	private static String processResponse(HttpURLConnection con) throws IOException {
		if (con.getResponseCode() >= 400) {
			logErrorResponse(con.getErrorStream());
			return null;
		} else {
			return getResponse(con.getInputStream());
		}
	}

	private static void logErrorResponse(InputStream is) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(is));
		String line;
		StringBuffer resp = new StringBuffer();
		while ((line = br.readLine()) != null) {
			resp.append(line).append('\n');
		}
		br.close();

		System.out.println(resp.toString());
	}

	private static String getResponse(InputStream is) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(is));
		String line;
		StringBuffer resp = new StringBuffer();
		while ((line = br.readLine()) != null) {
			resp.append(line).append('\n');
		}
		br.close();

		return resp.toString();
	}
}
