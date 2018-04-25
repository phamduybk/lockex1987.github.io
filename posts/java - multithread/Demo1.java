class MyThread implements Runnable {
	String tName;
	Thread t;

	MyThread(String threadName) {
		tName = threadName;
		t = new Thread (this, tName);
		t.start();
	}

	public void run() {
		try {
			System.out.println("Thread: " + tName );
			Thread.sleep(2000);
		} catch (InterruptedException e ) {
			System.out.println("Exception: Thread " + tName + " interrupted");
		}
		System.out.println("Terminating thread: " + tName );
	}
}

class Demo1 {
	public static void main(String args []) {
		new MyThread ("1");
		new MyThread ("2");
		new MyThread ("3");
		new MyThread ("4");
		System.out.println("Call from main thread.");
	}
}

class Demo2 {
	public static void main (String args []) {
		MyThread thread1 = new MyThread ("1");
		MyThread thread2 = new MyThread ("2");
		MyThread thread3 = new MyThread ("3");
		MyThread thread4 = new MyThread ("4");
		System.out.println("Thread Status: Alive");
		System.out.println("Thread 1: " + thread1.t.isAlive());
		System.out.println("Thread 2: " + thread2.t.isAlive());
		System.out.println("Thread 3: " + thread3.t.isAlive());
		System.out.println("Thread 4: " + thread4.t.isAlive());
		try {
			System.out.println("Threads Joining.");
			thread1.t.join();
			thread2.t.join();
			thread3.t.join();
			thread4.t.join();
		} catch (InterruptedException e) {
			System.out.println("Exception: Thread main interrupted.");
		}
		System.out.println("Thread Status: Alive");
		System.out.println("Thread 1: " + thread1.t.isAlive());
		System.out.println("Thread 2: " + thread2.t.isAlive());
		System.out.println("Thread 3: " + thread3.t.isAlive());
		System.out.println("Thread 4: " + thread4.t.isAlive());
		System.out.println("Terminating thread: main thread.");
	}
}