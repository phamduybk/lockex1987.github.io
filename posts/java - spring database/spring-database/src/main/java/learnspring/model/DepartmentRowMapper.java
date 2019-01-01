package learnspring.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class DepartmentRowMapper implements RowMapper<Department> {
	
	@Override
	public Department mapRow(ResultSet rs, int rowNum) throws SQLException {
		Department dept = new Department();
		dept.setDepartmentId(rs.getInt("department_id"));
		dept.setCode(rs.getString("code"));
		dept.setName(rs.getString("name"));
		dept.setLocation(rs.getString("location"));
		return dept;
	}
}