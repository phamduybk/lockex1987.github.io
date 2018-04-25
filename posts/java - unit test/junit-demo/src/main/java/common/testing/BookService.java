package common.testing;

import java.util.List;

public interface BookService {

	List<Book> findBookByAuthor(String author);
	
	void anotherMethod();
}
