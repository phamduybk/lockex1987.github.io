package excel.demo;

import com.jxcell.View;
import com.jxcell.CellException;
import java.io.IOException;

public class EncryptDecrypt {
	
	private static final String PASSWORD = "123456a@";
	private static final String ENCRYPT_FILE = "encrypt.xls";
	
	public static void demo() {
		encrypt();
		decrypt();
	}

	private static void encrypt() {
		try {
			View view = new View();
			view.setTextAsValue(1, 2, "Jan");
			view.setTextAsValue(1, 3, "Feb");
			view.setTextAsValue(1, 4, "Mar");
			view.setTextAsValue(1, 5, "Apr");
			view.setTextAsValue(2, 1, "Bananas");
			view.setTextAsValue(3, 1, "Papaya");
			view.setTextAsValue(4, 1, "Mango");
			view.setTextAsValue(5, 1, "Lilikoi");
			view.setTextAsValue(6, 1, "Comfrey");
			view.setTextAsValue(7, 1, "Total");
			for (int col = 2; col <= 5; col++) {
				for (int row = 2; row <= 7; row++) {
					view.setFormula(row, col, "RAND()");
				}
			}
			view.setFormula(7, 2, "SUM(C3:C7)");
			view.setSelection("C8:F8");
			view.editCopyRight();

			// Set the workbook open password
			view.write(ENCRYPT_FILE, PASSWORD);
		} catch (CellException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private static void decrypt() {
		View m_view = new View();
		try {
			// Read the encrypted excel file
			m_view.read(ENCRYPT_FILE, PASSWORD);
			// Write without password protected
			m_view.write("decrypt.xls");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
}
