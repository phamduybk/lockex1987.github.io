package com.crunchify.client;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

public class CrunchifyRESTJerseyClient {

	public static void main(String[] args) {
		CrunchifyRESTJerseyClient crunchifyClient = new CrunchifyRESTJerseyClient();
		crunchifyClient.getCtoFResponse();
		System.out.println();
		crunchifyClient.getFtoCResponse();
	}

	private void getFtoCResponse() {
		try {
			Client client = Client.create();
			WebResource webResource = client.resource("http://localhost:8080/CrunchifyRESTJerseyExample/crunchify/ftocservice/90");
			ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);
			if (response.getStatus() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + response.getStatus());
			}
			String output = response.getEntity(String.class);
			System.out.println("============getFtoCResponse============");
			System.out.println(output);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void getCtoFResponse() {
		try {
			Client client = Client.create();
			WebResource webResource = client.resource("http://localhost:8080/CrunchifyRESTJerseyExample/crunchify/ctofservice/40");
			ClientResponse response = webResource.accept("application/xml").get(ClientResponse.class);
			if (response.getStatus() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + response.getStatus());
			}
			String output = response.getEntity(String.class);
			System.out.println("============getCtoFResponse============");
			System.out.println(output);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}