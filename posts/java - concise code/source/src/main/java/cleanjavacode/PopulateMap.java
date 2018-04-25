package cleanjavacode;

import java.util.AbstractMap.SimpleEntry;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import alexh.Fluent;

public class PopulateMap {

	// http://wiki.c2.com/?DoubleBraceInitialization
	private void doubleBrace() {
		Map<Integer, Float> myMap = new HashMap<Integer, Float>() {
			{
				put(-99, 1f);
				put(-1, 4f);
				put(0, 5f);
				put(1, 9f);
				put(2, 11f);
				put(3, 15f);
				put(4, 15f);
				put(5, 11f);
				put(6, 9f);
				put(7, 5f);
				put(8, 4f);
				put(9, 3f);
				put(10, 3f);
				put(12, 2f);
				put(15, 2f);
				put(20, 1f);
			}
		};
		if (myMap.containsKey("xafsd")) {
			System.out.println("Hehehe");
		}
	}

	private void initializeOldWay() {
		Map<String, String> myMap = new HashMap<String, String>();
		myMap.put("a", "b");
		myMap.put("c", "d");
	}

	// http://minborgsjavapot.blogspot.com/2014/12/java-8-initializing-maps-in-smartest-way.html
	protected static Map<Integer, String> imperative() {
		final Map<Integer, String> numMap = new HashMap<>();
		numMap.put(0, "zero");
		numMap.put(1, "one");
		numMap.put(2, "two");
		numMap.put(3, "three");
		numMap.put(4, "four");
		numMap.put(5, "five");
		numMap.put(6, "six");
		numMap.put(7, "seven");
		numMap.put(8, "eight");
		numMap.put(9, "nine");
		numMap.put(10, "ten");
		numMap.put(11, "eleven");
		numMap.put(12, "twelve");
		return Collections.unmodifiableMap(numMap);
	}

	// Guava
	// https://stackoverflow.com/questions/6802483/how-to-directly-initialize-a-hashmap-in-a-literal-way/6802523
	// https://github.com/google/guava/wiki/ImmutableCollectionsExplained
	// Map<String, Integer> left = ImmutableMap.of("a", 1, "b", 2, "c", 3);

	// Lib 1: https://objectpartners.com/2014/06/05/inline-initialization-of-java-maps/

	private void populateMapInJava8() {
		Collections.unmodifiableMap(Stream.of(
				new SimpleEntry<>(0, "zero"),
				new SimpleEntry<>(1, "one"),
				new SimpleEntry<>(2, "two"),
				new SimpleEntry<>(3, "three"),
				new SimpleEntry<>(4, "four"),
				new SimpleEntry<>(5, "five"),
				new SimpleEntry<>(6, "six"),
				new SimpleEntry<>(7, "seven"),
				new SimpleEntry<>(8, "eight"),
				new SimpleEntry<>(9, "nine"),
				new SimpleEntry<>(10, "ten"),
				new SimpleEntry<>(11, "eleven"),
				new SimpleEntry<>(12, "twelve"))
				.collect(Collectors.toMap((e) -> e.getKey(), (e) -> e.getValue())));
	}

	// https://github.com/alexheretic/fluent
	private void fluentJava() {
		Map<String, String> someMap = null;

		// simple usage, assuming someMap is a Map<String, String> already declared
		Map<String, String> example = new Fluent.LinkedHashMap<String, String>()
				.append("key1", "val1")
				.append("key2", "val2")
				.appendAll(someMap);

		// nested structures declared all at once
		Map users = new Fluent.HashMap<>()
				.append("David", new Fluent.HashMap<>()
						.append("customers", Arrays.asList(
								new Fluent.HashMap<>()
										.append("name", "Darrel")
										.append("age", 33),
								new Fluent.HashMap<>()
										.append("name", "John")
										.append("age", 29)))
						.append("keywords", Arrays.asList("word1", "word2")))
				.append("Karen", new Fluent.HashMap<>()
						.append("customers", null) // emptyList()
						.append("keywords", Arrays.asList("word33")));

		// fluent immutable maps
		Map immutable = new Fluent.HashMap<>()
				.append("one", 1)
				.append("two", 2)
				.append("three", 3)
				.unmodifiable();
	}
}
