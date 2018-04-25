## Thực hiện nhiều hàm con đồng thời trong Java

Trong quá trình đi tìm lý do tại sao nên sử dụng Spring Framework, tôi có được đọc hướng dẫn [Creating Asynchronous Methods](https://spring.io/guides/gs/async-method/). Nghe thật là hay phải không: bạn có thể thực hiện nhiều hàm đồng thời, do đó tổng thời gian sẽ giảm nếu có nhiều hàm. Tuy nhiên, kỹ thuật chính được sử dụng không phải của Spring mà là của Java bình thường (lớp **java.util.concurrent.Future**). Tiếp theo, tôi tìm hiểu về cách thực hiện xử lý đồng thời của Java ở bài viết cũng rất hay [Java 8 Concurrency Tutorial: Threads and Executors](http://winterbe.com/posts/2015/04/07/java8-concurrency-tutorial-thread-executor-examples/). Tôi xin trình bày lại với một ví dụ đơn giản sau:

### Toàn bộ source code

```java
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class FutureDemo {

  public static void main(String[] args) throws Exception {
    long start = System.currentTimeMillis();

    testNormal(3, 3, 5);
    // testAsynchronous(3, 3, 5);

    System.out.printf("Elapsed time: %d seconds\n", (System.currentTimeMillis() - start) / 1000);
  }

  private static void testNormal(int s1, int s2, int s3) {
    String r1 = doLongTask(s1);
    String r2 = doLongTask(s2);
    String r3 = doLongTask(s3);

    System.out.println(r1);
    System.out.println(r2);
    System.out.println(r3);
  }

  private static void testAsynchronous(int s1, int s2, int s3)
      throws InterruptedException, ExecutionException {
    int poolSize = 3;
    ExecutorService executor = Executors.newFixedThreadPool(poolSize);
    
    Future<String> r1 = executor.submit(() -> {
      return doLongTask(s1);
    });
    Future<String> r2 = executor.submit(() -> {
      return doLongTask(s2);
    });
    Future<String> r3 = executor.submit(() -> {
      return doLongTask(s3);
    });
    
    System.out.println(r1.get());
    System.out.println(r2.get());
    System.out.println(r3.get());
    
    executor.shutdown();
  }

  private static String doLongTask(int second) {
    try {
      Thread.sleep(1000 * second);
      return "Finish after " + second + " second";
    } catch (InterruptedException ex) {
      return null;
    }
  }
}
```

Đầu tiên, chúng ta có một (hoặc) nhiều hàm mà thực hiện mất nhiều thời gian. Tôi xin giả lập bằng hàm `doLongTask`. Hàm này sẽ thực hiện trong khoảng thời gian đúng bằng tham số truyền vào (đo bằng giây).

### Chạy thông thường

Tiếp theo, chúng ta thực hiện nhiều lần hàm đó theo cách bình thường (như chúng ta vẫn hay làm :smile:) trong hàm testNormal:

```java
String r1 = doLongTask(s1);
String r2 = doLongTask(s2);
String r3 = doLongTask(s3);
```

Thực tế, chúng ta có thể thực hiện 1 hàm nhiều lần hoặc thực hiện nhiều hàm khác nhau.

Hãy thử thực hiện hàm to đó:

```java
testNormal(3, 3, 5);
```

Tổng thời gian thực hiện sẽ là 3+3+5 = 11 (giây).

### Chạy đồng thời

Bây giờ chúng ta hãy thử cách khác là thực hiện đồng thời các hàm. Đầu tiên chúng ta khởi tạo một đối tượng ExecutorService:

```java
ExecutorService executor = Executors.newFixedThreadPool(poolSize);
```

Bạn hãy coi đó là một thread pool. Tham số poolSize là số phần tử trong pool. Hiện tại poolSize bằng 3, nghĩa là một lúc có tối đa 3 hàm được thực hiện đồng thời. Giả sử poolSize bằng 3 nhưng ta lại có 5 hàm thì lúc đầu cũng chỉ 3 hàm được start, 2 hàm sẽ ở trong trạng thái chờ.

Bạn hãy thử thay đổi tham số poolSize thành 1 và xem kết quả như thế nào nhé!

Tiếp theo chúng ta sẽ thực hiện các hàm một cách đồng thời:

```java
Future<String> r1 = executor.submit(() -> {
  return doLongTask(s1);
});
Future<String> r2 = executor.submit(() -> {
  return doLongTask(s2);
});
Future<String> r3 = executor.submit(() -> {
  return doLongTask(s3);
});
```

Khi thực hiện như thế này, hệ thống sẽ không chờ thực hiện xong hàm 1 rồi mới đến hàm 2, không chờ xong hàm 2 rồi mới đến hàm 3. Các hàm được thực hiện đồng thời ngay lập tức.

Chúng ta lấy các giá trị trả về như sau:

```java
System.out.println(r1.get());
System.out.println(r2.get());
System.out.println(r3.get());
```

Khi gọi phương thức get của một đối tượng Future, chúng ta chờ hàm của đối tượng đó thực hiện xong đã (bây giờ hệ thống sẽ block tiến trình, chờ kết quả trả về). Tuy nhiên, sau khi hàm lâu nhất chạy xong thì tất cả các hàm khác đều cũng đã xong rồi. Tổng thời gian thực hiện sẽ chỉ bằng thời gian thực hiện của hàm chạy lâu nhất.

Cuối cùng hãy đóng đối tượng ExecutorService, nếu không chương trình của bạn sẽ không bao giờ kết thúc :smile::

```java
executor.shutdown();
```

Bạn hãy thử kiểm tra lại cách này xem sao:

```java
testAsynchronous(3, 3, 5);
```

Bây giờ chương trình sẽ chỉ chạy trong 5 giây thôi.

Chúng ta có thể sử dụng các kỹ thuật cũ của Java như Thread, Runnable để thực hiện các hàm đồng thời, nhưng Thread, Runnable thì không trả về kết quả. Tất nhiên bạn có thể tạo thuộc tính dùng chung, sau đó thay đổi trong Thread, Runnable, nhưng nó hơi phức tạp chút và bạn cũng phải quan tâm đến vấn đề synchronize nữa.

### Kết luận

Một kỹ thuật thật đơn giản và dễ hiểu đúng không! Tuy nhiên tôi thấy nếu chúng ta được giao lập trình một chức năng nào đó, chúng ta ít để ý đến vấn đề này, miễn là chức năng đó chạy được :smile:. Bạn hãy thử xem, nó rất đáng thử đấy!

Có nhiều tình huống thực tế có thể áp dụng kỹ thuật này không? Bản thân tôi thì có 2 trường hợp:

1. Một chương trình lấy link download ảnh từ nhiều link truyện online khác nhau
2. Một báo cáo mà mình phải select dữ liệu lớn trong CSDL trong vòng for (ví dụ báo cáo theo từng tháng)

Tôi đã thử và thấy đúng là thời gian thực hiện giảm đi khá nhiều.

Hy vọng bài viết cũng sẽ hữu ích trong trường hợp của bạn :smile:.
