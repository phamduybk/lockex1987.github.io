package memcached.demo;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.Future;

import net.spy.memcached.AddrUtil;
import net.spy.memcached.BinaryConnectionFactory;
import net.spy.memcached.CASResponse;
import net.spy.memcached.CASValue;
import net.spy.memcached.MemcachedClient;

public class MemcachedDemo {

	private static final String HOST = "127.0.0.1";
	private static final int PORT = 11211;

	private static MemcachedClient mcc;
	private static String key = "tutorialspoint";

	public static void main(String[] args) {
		connectMemcached();
		setData();
//		addData();
//		replaceData();
//		appendData();
//		prependData();
		deleteData();
		clearData();
//		displayStats();
		shutdownMemcached();
	}

	private static void connectMemcached() {
		try {
			// Connecting to Memcached server
			// mcc = new MemcachedClient(new InetSocketAddress(HOST, PORT));
			mcc = new MemcachedClient(new BinaryConnectionFactory(), AddrUtil.getAddresses(HOST + ":" + PORT));
			System.out.println("Connect to server successfully");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void shutdownMemcached() {
		try {
			// Shutdowns the memcached client
			mcc.shutdown();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void setData() {
		try {
			// Now set data into memcached server
			Future<Boolean> fo = mcc.set(key, 900, "Free Education");

			// Print status of set method
			System.out.println("Set status: " + fo.get());

			// Retrieve and check the value from cache
			System.out.println(key + " value in cache: " + mcc.get(key));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void addData() {
		try {
			String newKey = "codingground";

			// Try to add data with existing key
			Future<Boolean> fo = mcc.add(key, 900, "memcached");

			// Print status of set method
			System.out.println("Add status with old key: " + fo.get());

			// Adding a new key to memcached server
			fo = mcc.add(newKey, 900, "All Free Compilers");

			// Print status of set method
			System.out.println("Add status with new key: " + fo.get());

			// retrieve and check the value from cache
			System.out.println(newKey + " value in cache: " + mcc.get(newKey));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void replaceData() {
		try {
			// Replace
			Future<Boolean> fo = mcc.replace(key, 900, "Largest Tutorials' Library");

			// Print status of replace method
			System.out.println("Replace status: " + fo.get());

			// Retrieve and check the value from cache
			System.out.println(key + " value in cache: " + mcc.get(key));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void appendData() {
		try {
			// Try to append data with existing key
			Future<Boolean> fo = mcc.append(900, key, " for All");

			// Print status of append method
			System.out.println("Append status: " + fo.get());

			// Retrieve and check the value from cache
			System.out.println(key + " value in cache: " + mcc.get(key));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void prependData() {
		try {
			// Try to prepend data with existing key
			Future<Boolean> fo = mcc.prepend(900, key, "Free ");

			// Print status of prepend method
			System.out.println("Prepend status: " + fo.get());

			// Retrieve and check the value from cache
			System.out.println(key + " value in cache: " + mcc.get(key));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void cas() {
		try {
			// add data to memcached server
			Future fo = mcc.set("tutorialspoint", 900, "Free Education");

			// print status of set method
			System.out.println("set status:" + fo.get());

			// retrieve value stored for tutorialspoint from cache
			System.out.println("tutorialspoint value in cache - " + mcc.get("tutorialspoint"));

			// obtain CAS token value using gets method
			CASValue casValue = mcc.gets("tutorialspoint");

			// display CAS token value
			System.out.println("CAS token - " + casValue);

			// try to update data using memcached cas method
			CASResponse casresp = mcc.cas("tutorialspoint", casValue.getCas(), 900, "Largest Tutorials-Library");

			// display CAS Response
			System.out.println("CAS Response - " + casresp);

			// retrieve and check the value from cache
			System.out.println("tutorialspoint value in cache - " + mcc.get("tutorialspoint"));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void getCas() {
		try {
			// add data to memcached server
			Future fo = mcc.set("tutorialspoint", 900, "Free Education");

			// print status of set method
			System.out.println("set status:" + fo.get());

			// retrieve value stored for tutorialspoint from cache
			System.out.println("tutorialspoint value in cache - " + mcc.get("tutorialspoint"));

			// obtain CAS token value using gets method
			CASValue casValue = mcc.gets("tutorialspoint");

			// display CAS token value
			System.out.println("CAS value in cache - " + casValue);

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void deleteData() {
		try {
			// Try to delete data with existing key
			Future<Boolean> fo = mcc.delete(key);

			// Print status of delete method
			System.out.println("Delete status: " + fo.get());

			// Retrieve and check the value from cache
			System.out.println(key + " value in cache: " + mcc.get(key));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void counter() {
		try {
			// add numerical data to memcached server
			Future<Boolean> fo = mcc.set("number", 900, "1000");

			// print status of set method
			System.out.println("set status:" + fo.get());

			// retrieve and check the value from cache
			System.out.println("value in cache - " + mcc.get("number"));

			// increment and check the value from cache
			System.out.println("value in cache after increment - " + mcc.incr("number", 111));

			// decrement and check the value from cache
			System.out.println("value in cache after decrement - " + mcc.decr("number", 112));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void displayStats() {
		try {
			// Display statistics about memcached
			System.out.println("Memcached Statistics: " + mcc.getStats());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private static void clearData() {
		try {
			// Now clear all this data
			System.out.println("Clear data: " + mcc.flush().isDone());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
