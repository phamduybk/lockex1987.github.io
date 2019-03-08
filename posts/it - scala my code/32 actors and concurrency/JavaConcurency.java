public class JavaConcurency implements Runnable {

	private int index;
	
	public JavaConcurency(int i) {
		index = i;
	}

	@Override
	public void run() {
		try {
			Thread.sleep(5000);
			System.out.println(index + " finished");
		} catch (InterruptedException ex) {
			System.out.println("thread interrupted");
		}
	}

	public static void main(String[] args) {
		System.out.println("------------------");
		for (int i = 0; i < 50; i++) {
			Thread t = new Thread(new JavaConcurency(i));
			t.start();
		}
		System.out.println("------------------");
	}
}
