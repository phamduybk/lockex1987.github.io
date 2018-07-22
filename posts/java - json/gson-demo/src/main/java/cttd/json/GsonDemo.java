package cttd.json;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import cttd.json.model.BagOfPrimitives;
import cttd.json.model.PerfomanceData;

import static java.lang.System.*;

import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.Collection;

public class GsonDemo {

	public static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	// private static final Gson gson = new Gson();
	private static final Gson gson = new GsonBuilder().setDateFormat(DATE_FORMAT).create();

	public static void main(String[] args) {
		// serializePrimitives();
		// deserializePrimitives();
		// serializeObject();
		// deserializeObject();
		// serializeArray();
		// deserializeArray();
		// serializeCollection();
		// deserializeCollection();
		// deserializeObjectWithDifferentPropertyNames();
		deserializeListOfObjects();
	}

	private static void serializePrimitives() {
		out.println(gson.toJson(1)); // ==> 1
		out.println(gson.toJson("abcd")); // ==> "abcd"
		out.println(gson.toJson(new Long(10))); // ==> 10
		int[] values = { 1 };
		out.println(gson.toJson(values)); // ==> [1]
	}

	private static void deserializePrimitives() {
		int oneInt = gson.fromJson("1", int.class);
		Integer oneInteger = gson.fromJson("1", Integer.class);
		Long oneLong = gson.fromJson("1", Long.class);
		Boolean falseBoolean = gson.fromJson("false", Boolean.class);
		String abcStr = gson.fromJson("\"abc\"", String.class);
		String[] abcArr = gson.fromJson("[\"abc\"]", String[].class);

		out.println(oneInt);
		out.println(oneInteger);
		out.println(oneLong);
		out.println(falseBoolean);
		out.println(abcStr);
		for (String s : abcArr) {
			out.println(s);
		}
	}

	private static void serializeObject() {
		BagOfPrimitives obj = new BagOfPrimitives();
		out.println(gson.toJson(obj));
	}

	private static void deserializeObject() {
		String json = "{\"value1\":100,\"value2\":\"Cao Thị Thùy Dương\"}";
		BagOfPrimitives obj = gson.fromJson(json, BagOfPrimitives.class);
		out.println(obj);
	}

	private static void serializeArray() {
		int[] ints = { 1, 2, 3, 4, 5 };
		String[] strings = { "abc", "def", "ghi" };
		out.println(gson.toJson(ints)); // ==> [1,2,3,4,5]
		out.println(gson.toJson(strings)); // ==> ["abc", "def", "ghi"]
	}

	private static void deserializeArray() {
		int[] ints = gson.fromJson("[1,2,3,4,5]", int[].class);
		for (int n : ints) {
			out.println(n);
		}
	}

	private static void serializeCollection() {
		Collection integers = Arrays.asList(1, 2, 3);
		out.println(gson.toJson(integers)); // => [1,2,3]
	}

	private static void deserializeCollection() {
		Type collectionType = new TypeToken<Collection<Integer>>() {
		}.getType();
		Collection<Integer> integers = gson.fromJson("[10,20,30]", collectionType);
		for (Integer n : integers) {
			System.out.println(n);
		}
	}

	private static void deserializeObjectWithDifferentPropertyNames() {
		String json = replaceJsonQuotes(
				" {'site_id':101,'date_time':'2015-01-01 00:00:00','dataDJU':16.6,'datakWhMensuel':17.9,'signatureEnergy':88.6}");
		PerfomanceData obj = gson.fromJson(json, PerfomanceData.class);
		out.println(obj);
	}

	private static void deserializeListOfObjects() {
		String json = replaceJsonQuotes(
				"[" + "  {'site_id':101,'date_time':'2015-01-01 00:00:00','dataDJU':16.6,'datakWhMensuel':17.9,'signatureEnergy':88.6},"
						+ "  {'site_id':202,'date_time':'2015-02-01 00:00:00','dataDJU':155.6,'datakWhMensuel':11.9,'signatureEnergy':884.2}"
						+ "]");
		Type collectionType = new TypeToken<Collection<PerfomanceData>>() {
		}.getType();
		Collection<PerfomanceData> list = gson.fromJson(json, collectionType);
		for (PerfomanceData obj : list) {
			System.out.println(obj);
		}
	}

	/**
	 * Replace single quotes with double quotes
	 * 
	 * @param text
	 *            An JSON text with single quotes (to declare in Java easily)
	 * @return An equivalent (valid) JSON text with double quotes
	 */
	private static String replaceJsonQuotes(String text) {
		return text.replace("'", "\"");
	}
}
