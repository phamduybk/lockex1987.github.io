/*
 * NVH
 */

import java.io.*;

class Time {

	public int hour;
	public int minute;
	public int second;
	public int tik;

	@Override
	public String toString() {
		return (String.valueOf(hour + 100).substring(1, 3) + ":"
				+ String.valueOf(minute + 100).substring(1, 3) + ":"
				+ String.valueOf(second + 100).substring(1, 3) + ","
				+ String.valueOf(tik + 1000).substring(1, 4));
	}
}

class Subtitle {

	// Thoi gian ket qua, thoi gian doc, thoi gian can tru.
	static Time result, st, t, d;

	// Tinh hieu hai thoi gian, ket qua la mot thoi gian.
	// t3 = t1-t2.
	public static void subtract(Time t1, Time t2, Time t3) {
		int n = (t1.hour * 60 * 60 + t1.minute * 60 + t1.second - t2.hour * 60 * 60 - t2.minute * 60 - t2.second) * 1000 + (t1.tik - t2.tik);
		t3.tik = n % 1000;
		n = (n - t3.tik) / 1000;
		t3.second = n % 60;
		n = (n - t3.second) / 60;
		t3.minute = n % 60;
		t3.hour = (n - t3.minute) / 60;
	}

	public static void main(String args[]) {
		result = new Time();
		st = new Time();
		t = new Time();
		d = new Time();
		String s;
		try {
			// Mo file nguon va file ket qua.
			PrintWriter fo = new PrintWriter("output.srt");
			BufferedReader fi = new BufferedReader(new FileReader("input.srt"));
			// Doc dong dau tien, tinh thoi gian bat dau.
			s = fi.readLine();
			st.hour = Integer.parseInt(s.substring(0, 2));
			st.minute = Integer.parseInt(s.substring(3, 5));
			st.second = Integer.parseInt(s.substring(6, 8));
			st.tik = Integer.parseInt(s.substring(9, 12));

			// Doc doan dau tien.
			s = fi.readLine();
			fo.println(s);
			s = fi.readLine();
			t.hour = Integer.parseInt(s.substring(0, 2));
			t.minute = Integer.parseInt(s.substring(3, 5));
			t.second = Integer.parseInt(s.substring(6, 8));
			t.tik = Integer.parseInt(s.substring(9, 12));
			// Tinh d.
			subtract(t, st, d);
			// In ra thoi gian bat dau.
			fo.print(st + " --> ");
			t.hour = Integer.parseInt(s.substring(17, 19));
			t.minute = Integer.parseInt(s.substring(20, 22));
			t.second = Integer.parseInt(s.substring(23, 25));
			t.tik = Integer.parseInt(s.substring(26, 29));
			subtract(t, d, result);
			// In ra thoi gian ket thuc.
			fo.println(result);
			// Doc cac dong loi va in ra.
			do {
				s = fi.readLine();
				fo.println(s);
			} while (s.length() != 0); // Dong trang la "", khong phai la null.

			// Doc cac doan tiep theo cho den het file.
			while (true) {
				s = fi.readLine();
				if (s.length() == 0) {
					break;
				}
				fo.println(s);
				s = fi.readLine();

				t.hour = Integer.parseInt(s.substring(0, 2));
				t.minute = Integer.parseInt(s.substring(3, 5));
				t.second = Integer.parseInt(s.substring(6, 8));
				t.tik = Integer.parseInt(s.substring(9, 12));
				subtract(t, d, result);

				fo.print(result + " --> ");

				t.hour = Integer.parseInt(s.substring(17, 19));
				t.minute = Integer.parseInt(s.substring(20, 22));
				t.second = Integer.parseInt(s.substring(23, 25));
				t.tik = Integer.parseInt(s.substring(26, 29));
				subtract(t, d, result);

				fo.println(result);
				do {
					s = fi.readLine();
					fo.println(s);
				} while (s.length() != 0);
			}
			// Dong file nguon va file ket qua.
			fi.close();
			fo.close();
		} catch (IOException e) {
			e.printStackTrace();
			System.exit(1);
		}
	}
}
