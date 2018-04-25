package common.testing;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Test;

public class AuthorServiceImplTests {

	@Test
	public void testGetTotalBooks1() {
		testGetTotalBooks(getBookService1(), 0);
	}

	@Test
	public void testGetTotalBooks2() {
		testGetTotalBooks(getBookService2(), 2);
	}

	@Test
	public void testGetTotalBooks2b() {
		testGetTotalBooks(getBookService2b(), 2);
	}

	@Test
	public void testGetTotalBooks3() {
		testGetTotalBooks(getBookService3(), 2);
	}

	public void testGetTotalBooks(BookService bookService, int expected) {
		// Setup AuthorService
		AuthorServiceImpl authorService = new AuthorServiceImpl();
		authorService.setBookService(bookService);

		// Verify result
		assertEquals(expected, authorService.getTotalBooks("mkyong"));
	}

	private BookService getBookService1() {
		BookServiceImpl bookService = new BookServiceImpl();
		bookService.setBookDao(new BookDaoImpl()); // where Dao connect to?
		return bookService;
	}

	private BookService getBookService2() {
		return new MockBookServiceImpl();
	}

	private BookService getBookService2b() {
		return new BookService() {

			@Override
			public List<Book> findBookByAuthor(String author) {
				List<Book> books = new ArrayList<>();
				if ("mkyong".equals(author)) {
					books.add(new Book("mkyong in action"));
					books.add(new Book("abc in action"));
					books.add(new Book("bot"));
				}
				return books;
			}

			@Override
			public void anotherMethod() {
				// TODO Auto-generated method stub
			}
		};
	}

	private BookService getBookService3() {
		List<Book> books = Arrays.asList(
				new Book("mkyong in action"),
				new Book("abc in action"),
				new Book("bot"));
		BookService bookService = mock(BookService.class);
		// If the author is "mkyong", then return a 'books' object.
		when(bookService.findBookByAuthor("mkyong")).thenReturn(books);
		return bookService;
	}
}
