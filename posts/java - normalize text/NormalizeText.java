// https://vi.wikipedia.org/wiki/Phi_h%E1%BB%93_ngo%E1%BA%A1i_truy%E1%BB%87n
// https://en.wikipedia.org/wiki/EPUB
// Thư viện soát lỗi chính tả tiếng Việt?
// https://download.com.vn/web/vspell/download
// http://trungtamcntt.vinhuni.edu.vn/chia-se-cong-nghe/seo/thu-thuat-kiem-tra-loi-chinh-ta-tieng-viet-trong-microsoft-word-85443
public class Kimdung {

	public String replaceMultipleSpaces(String text) {
		// Chuyển nhiều dấu cách thành 1 dấu cách
		String pattern = "\\s+";
		String newText = text.replaceAll(pattern, " ");
		return newText;
	}

	public String addExtraSpaceAfterHyphen(String text) {
		// "-A" thành "- A"
		String pattern = "-(\\S)";
		String newText = text.replaceAll(pattern, "- $1");
		return newText;
	}

	public String removeEndSpaces(String text) {
		// Removes whitespace between a word character and . or ,
		String pattern = "(\\w)(\\s+)([.,?!:])";
		String newText = text.replaceAll(pattern, "$1$3");
		return newText;
	}

	public String extractTitle(String text) {
		// Extract the text between the two title elements
		String pattern = "(?i)<(title).*?>(.+?)</\\1>";
		String newText = text.replaceAll(pattern, "$2");
		return newText;
	}

	public static void main(String[] args) {
		Kimdung obj = new Kimdung();
		System.out.println(obj.replaceMultipleSpaces("how to   do    in  java   .         com"));
		System.out.println(obj.addExtraSpaceAfterHyphen("-Thằng khỉ con kia!"));
		System.out.println(obj.removeEndSpaces("Một thanh âm khàn khàn , trầm trọng khẽ hô lên . Xin chào ! Tại sao ? Tôi nói : "));
		System.out.println(obj.extractTitle("<title>Phi hồ ngoại truyện - Hồi 1</title>"));
	}
}

