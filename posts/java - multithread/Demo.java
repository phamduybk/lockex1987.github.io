class Queue {
	int exchangeValue;
	boolean busy = false;

	synchronized int get() {
		if (!busy)
			try {
				wait();
			} catch (InterruptedException e) {
				System.out.println("Get: InterruptedException");
			}
			System.out.println("Get: " + exchangeValue);
			notify();
			return exchangeValue;
	}

	synchronized void put(int exchangeValue) {
		if (busy)
			try {
				wait();
			} catch (InterruptedException e) {
				System.out.println("Put: InterruptedException");
			}
			this.exchangeValue = exchangeValue;
			busy = true;
			System.out.println("Put: " + exchangeValue);
			notify();
	}
}

class Publisher implements Runnable {
	Queue q;
	
	Publisher(Queue q) {
		this.q = q;
		new Thread (this, "Publisher").start();
	}

	public void run() {
		for (int i = 0; i < 5; i++) {
			q.put(i);
		}
	}
}

class Consumer implements Runnable {
	Queue q;

	Consumer(Queue q) {
		this.q = q;
		new Thread (this, "Consumer").start();
	}

	public void run() {
		for (int i = 0; i < 5; i++) {
			q.get();
		}
	}
}

class Demo {
	public static void main(String args []) {
		Queue q = new Queue ();
		new Publisher (q);
		new Consumer (q);
	}
}