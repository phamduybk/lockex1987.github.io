
public class PrintSameLine {

	public static void main(String[] args) {
		//processing();
		//wave("nguyen van huyen presents");
		//speak();
		
		String[] a = {
				"mot mua he, mua thi nua lai den ",
				"hay co gang het minh, dung de sau nay phai hoi tiec ",
				"ban khong the biet ket qua se ra sao neu ban khong thu "
		};
		prompt(a);
		
		//backSpaceCharacterTest();
	}
	
	private static void backSpaceCharacterTest() {
		System.out.print("Start[          ]");
		System.out.flush();
		System.out.print("\b\b\b\b\b\b\b\b\b\b\b");
		System.out.flush();
		try {
			Thread.sleep(500);
		} catch (InterruptedException ex) {
			// Ignore
		}
		for (int i = 0; i < 10; i++) {
			System.out.print("."); // overwrites a space
			System.out.flush();
			try {
				Thread.sleep(100);
			} catch (InterruptedException ex) {
				// Ignore
			}
		}
		System.out.print("] Done\n"); // overwrites the ']' + adds chars
		System.out.flush();
	}
	
	// Rotate: - | / - \ | / -

	private static void processing() {
		String text = "|/-|/-\\";
		char[] a = text.toCharArray();
		int idx = 0;
		for (int i = 0; i <= 100; i++) {
			String s = " " + a[idx] + " " + i + "%";
			System.out.printf("%s\r", s);
			sleep(50);
			idx++;
			if (idx == a.length) {
				idx = 0;
			}
		}
	}

	private static void wave(String text) {
		System.out.println("\n\n\n");
		int idx = 0;
		while (true) {
			String s = text.substring(0, idx)
					+ Character.toUpperCase(text.charAt(idx))
					+ text.substring(idx + 1);
			System.out.printf("     %s\r", s);
			sleep(100);
			idx = (idx == text.length() - 1) ? 0 : idx + 1;
		}
	}

	// (*.*) (*_*) (^.^) (+.+) (*~*) :)
	private static void speak() {
		boolean phase = true;
		System.out.println();
		while (true) {
			String s = phase ? "." : "_";
			System.out.printf("\r          (*%s*) ", s);			
			sleep(100);
			phase = !phase;	
		}
	}
	
	private static void prompt(String[] a) {
		System.out.printf("\n");
		while (true) {
			for (String text : a) {
				print(text);
				sleep(300);
			}
		}
	}

	private static void print(String text) {
		System.out.printf("\r                                                               ");
		for (int idx = 0; idx < text.length(); idx++) {
			String s = text.substring(0, idx) + Character.toUpperCase(text.charAt(idx));
			System.out.printf("\r %s", s);
			sleep(100);
		}
	}

	private static void sleep(int millis) {
		try {
			Thread.sleep(millis);
		} catch (InterruptedException ex) {
		}
	}
}
