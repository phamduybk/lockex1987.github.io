/*
 * NVH.
 */
package cttd.jsondemo;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 *
 * @author locke
 */
public class GsonDemo {

	private static final Gson GSON = new Gson();

	public static void main(String[] args) {
//		primitiveDemo();
//		objectDemo();
//		arrayDemo();
//		collectionDemo();
		android();
	}
	
	private static void android() {
		String input = "{"
						+ "  'id': '1000',"
						+ "  'name': 'Nguy\u1ec5n Ho\u00e0ng Phong',"
						+ "  'username': 'nguyen.hoangphong.50',"
						+ "  'gender': 'male',"
						+ "  'favoriteList': ['comics', 'music']"
						+ "}";
		FaceBook faceBook = new Gson().fromJson(input, FaceBook.class);
		System.out.println(faceBook.getId());
		System.out.println(faceBook.getName());
		System.out.println(faceBook.getUsername());
		System.out.println(faceBook.getGender());
		System.out.println(faceBook.getFavoriteList());
	}

	private static void primitiveDemo() {
		// Serialization
		System.out.println(GSON.toJson(1));            // ==> 1
		System.out.println(GSON.toJson("abcd"));       // ==> "abcd"
		System.out.println(GSON.toJson(new Long(10))); // ==> 10
		int[] values = {1};
		System.out.println(GSON.toJson(values));       // ==> [1]

		// Deserialization
		int one1 = GSON.fromJson("1", int.class);
		Integer one2 = GSON.fromJson("1", Integer.class);
		Long one3 = GSON.fromJson("1", Long.class);
		Boolean bool = GSON.fromJson("false", Boolean.class);
		String str = GSON.fromJson("\"abc\"", String.class);
		String[] anotherStr = GSON.fromJson("[\"abc\"]", String[].class);

		System.out.println(one1);
		System.out.println(one2);
		System.out.println(one3);
		System.out.println(bool);
		System.out.println(str);
		for (String s : anotherStr) {
			System.out.println(s);
		}
	}

	private static void objectDemo() {
		// Serialization
		BagOfPrimitives obj = new BagOfPrimitives(1, "abc", 3);
		String json = GSON.toJson(obj); // ==> json is {"value1":1,"value2":"abc"}
		System.out.println(json);

		// Deserialization
		BagOfPrimitives obj2 = GSON.fromJson(json, BagOfPrimitives.class); // ==> obj2 is just like obj
		System.out.println(obj2.description());
	}

	private static void arrayDemo() {
		int[] ints = {1, 2, 3, 4, 5};
		String[] strings = {"abc", "def", "ghi"};

		// Serialization
		System.out.println(GSON.toJson(ints));     // ==> [1,2,3,4,5]
		System.out.println(GSON.toJson(strings));  // ==> ["abc", "def", "ghi"]

		// Deserialization
		int[] ints2 = GSON.fromJson("[1,2,3,4,5]", int[].class); // ==> ints2 will be same as ints
		for (int n : ints2) {
			System.out.print(n + ", ");
		}
		System.out.println();
	}

	private static void collectionDemo() {
		List<Integer> ints = new ArrayList<>();
		ints.add(1);
		ints.add(2);
		ints.add(3);
		ints.add(4);
		ints.add(5);

		// Serialization
		String json = GSON.toJson(ints);  // ==> json is [1,2,3,4,5]
		System.out.println(json);

		// Deserialization
		Type collectionType = new TypeToken<Collection<Integer>>() {
		}.getType();
		Collection<Integer> ints2 = GSON.fromJson(json, collectionType); // ==> ints2 is same as ints
		ints2.stream().forEach((n) -> {
			System.out.print(n + "-");
		});
		System.out.println();
	}
}
