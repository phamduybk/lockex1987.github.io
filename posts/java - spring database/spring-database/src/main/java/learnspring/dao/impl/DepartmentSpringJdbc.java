package learnspring.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.sql.DataSource;

import learnspring.dao.DepartmentDAO;
import learnspring.model.Department;

public class DepartmentSpringJdbc implements DepartmentDAO {

	private DataSource dataSource;

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	@Override
	public void insert(Department dept) {
		try (Connection conn = dataSource.getConnection()) {
			String sql = " INSERT INTO Department(department_id, code, name, location) "
					+ " VALUES (?, ?, ?, ?) ";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setInt(1, dept.getDepartmentId());
			statement.setString(2, dept.getCode());
			statement.setString(3, dept.getName());
			statement.setString(4, dept.getLocation());
			statement.executeUpdate();
			statement.close();
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}

	@Override
	public Department findByDepartmentId(int deptId) {
		try (Connection conn = dataSource.getConnection()) {
			// Normal JDBC code
			// So why use Spring?
			String sql = " SELECT * FROM Department WHERE department_id = ? ";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setInt(1, deptId);
			Department dept = null;
			ResultSet result = statement.executeQuery();
			if (result.next()) {
				dept = new Department(result.getInt("department_id"),
						result.getString("code"),
						result.getString("name"),
						result.getString("location"));
			}
			result.close();
			statement.close();
			return dept;
		} catch (SQLException ex) {
			ex.printStackTrace();
			return null;
		}
	}
}
