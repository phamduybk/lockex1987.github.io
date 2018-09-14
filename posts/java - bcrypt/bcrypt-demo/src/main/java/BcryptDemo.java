
import org.mindrot.jbcrypt.BCrypt;

// https://www.mindrot.org/projects/jBCrypt/
public class BcryptDemo {

    public static void main(String[] args) {
        hash();
        check();
    }

    private static void hash() {
        String password = "123456a@";
        System.out.println(BCrypt.hashpw(password, BCrypt.gensalt()));
        System.out.println(BCrypt.hashpw(password, BCrypt.gensalt(12)));
        
        // $2a$10$JOCO16BGEjdtwSyeKjcQs.LOMUZP62ZbACsYsxfwBxdogrGIh88Xu
        // $2a$12$UFY3hCK9OF3ojIW8Ve5NJOWJL8lKjR2JLbpSNYG9XAO9Gr3YPGMjK
    }

    private static void check() {
        // Xâu password được mã hóa bởi Laravel
        String hashed = "$2y$10$bTvm6wAADzfptlHuufxbDuF9QJMtX0W9ly.kb.FpottRB0tp5xeDu";
        
        hashed = checkPrefix(hashed);

        String candidate = "123456a@";
        if (BCrypt.checkpw(candidate, hashed)) {
            System.out.println("Match");
        } else {
            System.out.println("Failed");
        }
    }

    /**
     * Giả sử password được hashed bởi PHP (Laravel).
     * Một ứng dụng Java khác cũng cần validate password này.
     * Có khi bị lỗi: java.lang.IllegalArgumentException: Invalid salt revision
     * Đó là do thư viện PHP sử dụng prefix 2y, trong khi thư viện Java vẫn dùng prefix 2a.
     * Ban đầu prefix của bcrypt là 2a, nhưng việc implement bcrypt trong PHP và nhiều phần mềm khác (sử dụng crypt_blowfish) có một lỗi.
     * Để phân biệt cái cũ có thể bị lỗi với cái mới, prefix mới 2y được giới thiệu.
     * Nếu code Java không hỗ trợ prefix 2y, có 2 cách:
     * - Nếu code Java không bị lỗi (vì không sử dụng crypt_blowfish), thì đơn giản chỉ cần thay thế "2y" bằng "2a"
     * - Nếu thư viện Java có lỗi thì nên cập nhật lại thư viện Java
     */
    private static String checkPrefix(String hashed) {
        if (hashed.startsWith("$2a$")) {
            return hashed;
        }
        
        return "$2a$" + hashed.substring(4);
    }
}
