package learnspring.main;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ResourceBundle;

public class NativeJdbcDemo {

	public static void main(String[] args) {
		// Get configuration
		ResourceBundle rb = ResourceBundle.getBundle("database");
		String url = rb.getString("db.url");
		String username = rb.getString("db.username");
		String password = rb.getString("db.password");

		try (Connection conn = DriverManager.getConnection(url, username, password)) {
			// Execute statement
			System.out.println("No driver needed (only MySQL)");
			String sql = " SELECT * FROM Department WHERE department_id = ? ";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setInt(1, 1);
			ResultSet result = statement.executeQuery();
			
			// Print the result
			if (result.next()) {
				System.out.println("Department ID: " + result.getInt("department_id")
						+ ", name: " + result.getString("name")
						+ ", location: " + result.getString("location"));
			}
			
			// Close resources
			result.close();
			statement.close();
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}
}
