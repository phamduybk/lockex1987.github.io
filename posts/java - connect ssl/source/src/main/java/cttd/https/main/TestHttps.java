package cttd.https.main;

import java.security.SecureRandom;
import java.security.cert.X509Certificate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import cttd.https.util.ConfigUtil;
import cttd.https.util.ConnectUrl;

public class TestHttps {

	public static void main(String[] args) {
		setupProxy();
		// testPostHttps();
		// disableSslVerification();
		disableSniExtension();
		testGetHttps();
	}

	private static void setupProxy() {
		if (ConfigUtil.getConfig("allow.using.proxy").trim().equalsIgnoreCase("true")) {
			String host = ConfigUtil.getConfig("proxy.host");
			String port = ConfigUtil.getConfig("proxy.port");
			System.setProperty("http.proxyHost", host);
			System.setProperty("http.proxyPort", port);
			System.setProperty("https.proxyHost", host);
			System.setProperty("https.proxyPort", port);
		}
		System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
	}

	private static void testPostHttps() {
		String url = ConfigUtil.getConfig("postUrl");
		String requestBody = ConfigUtil.getConfig("requestBody");
		String response = ConnectUrl.sendPost(url, requestBody, null);
		System.out.println(response);
	}

	private static void testGetHttps() {
		String url = ConfigUtil.getConfig("getUrl");
		String response = ConnectUrl.sendGet(url);
		System.out.println(response);
	}

	private static void disableSniExtension() {
		System.setProperty("jsse.enableSNIExtension", "false");
	}

	/**
	 * Use this method with self-signed SSL (BlueWay web service)
	 */
	private static void disableSslVerification() {
		try {
			TrustManager x509 = new X509TrustManager() {
				public X509Certificate[] getAcceptedIssuers() {
					return null;
				}

				public void checkClientTrusted(X509Certificate[] certs, String authType) {
				}

				public void checkServerTrusted(X509Certificate[] certs, String authType) {
				}
			};
			TrustManager[] trustAllCerts = {
				x509
			};
			SSLContext sc = SSLContext.getInstance("SSL");
			sc.init(null, trustAllCerts, new SecureRandom());
			HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

			HostnameVerifier allHostsValid = new HostnameVerifier() {
				public boolean verify(String hostname, SSLSession session) {
					return true;
				}
			};
			HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
		} catch (Exception ex) {
			System.out.println("Lỗi khi disable SSL");
			ex.printStackTrace();
		}
	}
}
