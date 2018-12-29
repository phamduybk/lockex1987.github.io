package cttd.rest.client;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

public class JerseyClientDemo {

	public static void main(String[] args) {
		String url = "http://localhost:8080/spring-rest/test/getBean?id=200";
		String json = getRestResponse(url);
		parseJson(json);
	}

	private static String getRestResponse(String url) {
		Client client = Client.create();
		WebResource webResource = client.resource(url);
		ClientResponse res = webResource.accept("application/json").get(ClientResponse.class);
		if (res.getStatus() != 200) {
			System.out.println("Failed with HTTP error code: " + res.getStatus());
			return null;
		} else {
			return res.getEntity(String.class);
		}
	}

	private static void parseJson(String json) {
		try {
			if (json != null && !json.isEmpty()) {
				JSONParser parser = new JSONParser();
				JSONObject obj = (JSONObject) parser.parse(json);
				String url = (String) obj.get("url");
				String method = (String) obj.get("method");
				System.out.println("method: " + method);
				System.out.println("url: " + url);
			}
		} catch (ParseException ex) {
			ex.printStackTrace();
		}
	}
}
