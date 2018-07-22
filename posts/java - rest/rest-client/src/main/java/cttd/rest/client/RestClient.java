package cttd.rest.client;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

/**
 * Encoding of source files should be UTF-8.
 */
public class RestClient {

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
				long id = (Long) obj.get("id"); // JSON number is Long
				String name = (String) obj.get("name");
				System.out.println("id: " + id);
				System.out.println("name: " + name);
			}
		} catch (ParseException ex) {
			ex.printStackTrace();
		}
	}
}
