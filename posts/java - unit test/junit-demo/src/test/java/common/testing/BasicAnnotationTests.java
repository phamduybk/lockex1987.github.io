package common.testing;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class BasicAnnotationTests {

	private List<String> list;

	@BeforeClass
	public static void oneTimeSetUp() {
		System.out.println("@BeforeClass - oneTimeSetUp");
	}

	@AfterClass
	public static void oneTimeCleanUp() {
		System.out.println("@AfterClass - oneTimeCleanUp");
	}

	@Before
	public void setUp() {
		list = new ArrayList<>();
		System.out.println("  @Before - setUp");
	}

	@After
	public void cleanUp() {
		list.clear();
		System.out.println("  @After - cleanUp");
	}

	@Test
	public void testEmptyList() {
		assertTrue(list.isEmpty());
		System.out.println("    @Test - testEmptyList");
	}

	@Test
	public void testOneItemList() {
		list.add("itemA");
		assertEquals(1, list.size());
		System.out.println("    @Test - testOneItemList");
	}
}
