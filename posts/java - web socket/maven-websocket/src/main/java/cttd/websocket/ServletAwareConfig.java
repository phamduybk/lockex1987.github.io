package cttd.websocket;

import javax.servlet.http.HttpSession;
import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;

public class ServletAwareConfig extends ServerEndpointConfig.Configurator {

	public static final String HTTP_SESSION_PROPERTY = "httpSession";

	@Override
	public void modifyHandshake(ServerEndpointConfig config, HandshakeRequest request,
			HandshakeResponse response) {
		HttpSession httpSession = (HttpSession) request.getHttpSession();
		config.getUserProperties().put(HTTP_SESSION_PROPERTY, httpSession);
	}

	public void modifyHandshake2(ServerEndpointConfig config,
			HandshakeRequest request,
			HandshakeResponse response) {
		HttpSession httpSession = (HttpSession) request.getHttpSession();
		config.getUserProperties().put(HttpSession.class.getName(), httpSession);
	}
}