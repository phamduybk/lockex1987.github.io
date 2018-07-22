package com.crunchify.restjersey;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

@Path("/ftocservice")
public class FtoCService {

	@GET
	@Produces("application/json")
	public Response convertFtoC() {
		Double fahrenheit = 98.24;
		return convertFahrenheitToCelcius(fahrenheit);
	}

	@Path("{f}")
	@GET
	@Produces("application/json")
	public Response convertFtoCfromInput(@PathParam("f") Double fahrenheit) {
		return convertFahrenheitToCelcius(fahrenheit);
	}

	private Response convertFahrenheitToCelcius(Double fahrenheit) {
		Double celsius = (fahrenheit - 32) * 5 / 9;
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("F Value", fahrenheit);
		jsonObject.put("C Value", celsius);
		return Response.status(200).entity(jsonObject.toString()).build();
	}
}