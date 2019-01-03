package cttd.websocket;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/ratesrv")
public class ExchangeRate {

	// Queue holds the list of connected clients
	private static Queue<Session> queue = new ConcurrentLinkedQueue<Session>();
	// Rate publisher thread
	private static Thread rateThread;

	static {
		// Rate publisher thread, generates a new value for USD rate every 2 seconds
		rateThread = new Thread() {
			public void run() {
				DecimalFormat df = new DecimalFormat("#.####");
				while (true) {
					double d = 2 + Math.random();
					if (queue != null) {
						sendAll("USD Rate: " + df.format(d));
					}
					try {
						sleep(2000);
					} catch (InterruptedException e) {
						// Do nothing
					}
				}
			};
		};
		rateThread.start();
	}

	@OnMessage
	public void onMessage(Session session, String msg) {
		// Provided for completeness, in out scenario clients don't send any msg
		try {
			System.out.println("Received msg " + msg + " from " + session.getId());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@OnOpen
	public void open(Session session) {
		queue.add(session);
		System.out.println("New session opened: " + session.getId());
	}

	@OnError
	public void error(Session session, Throwable t) {
		queue.remove(session);
		System.err.println("Error on session " + session.getId());
	}

	@OnClose
	public void closedConnection(Session session) {
		queue.remove(session);
		System.out.println("session closed: " + session.getId());
	}

	private static void sendAll(String msg) {
		try {
			if (!queue.isEmpty()) {
				// Send the new rate to all open WebSocket sessions
				List<Session> closedSessions = new ArrayList<>();
				for (Session session : queue) {
					if (!session.isOpen()) {
						System.err.println("Closed session: " + session.getId());
						closedSessions.add(session);
					} else {
						session.getBasicRemote().sendText(msg);
					}
				}
				queue.removeAll(closedSessions);
				System.out.println("Sending " + msg + " to " + queue.size() + " clients");
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}
	}
}
