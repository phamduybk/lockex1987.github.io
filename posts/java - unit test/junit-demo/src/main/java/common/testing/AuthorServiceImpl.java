package common.testing;

import java.util.List;
import java.util.stream.Collectors;

public class AuthorServiceImpl implements AuthorService {

	private BookService bookService;

	public BookService getBookService() {
		return bookService;
	}

	public void setBookService(BookService bookService) {
		this.bookService = bookService;
	}

	@Override
	public int getTotalBooks(String author) {
		List<Book> books = bookService.findBookByAuthor(author);

		// Filters some bot writers
		List<Book> filtered = books.stream()
				.filter(x -> !x.getName().equals("bot"))
				.collect(Collectors.toList());

		return filtered.size();
	}
}
