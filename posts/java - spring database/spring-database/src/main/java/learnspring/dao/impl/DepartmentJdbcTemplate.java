package learnspring.dao.impl;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;

import learnspring.dao.DepartmentDAO;
import learnspring.model.Department;
import learnspring.model.DepartmentRowMapper;

public class DepartmentJdbcTemplate implements DepartmentDAO {

	private DataSource dataSource;
	private JdbcTemplate jdbcTemplate;

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public void insert(Department dept) {
		String sql = " INSERT INTO Department(department_id, code, name, location) "
				+ " VALUES (?, ?, ?, ?) ";
		
		jdbcTemplate.update(sql, new Object[] {
				dept.getDepartmentId(),
				dept.getCode(),
				dept.getName(),
				dept.getLocation()
		});
	}

	@Override
	public Department findByDepartmentId(int deptId) {
		String sql = " SELECT * FROM Department WHERE department_id = ? ";
		
		Department dept = jdbcTemplate.queryForObject(
				sql,
				new Object[] { deptId },
				new DepartmentRowMapper());
		return dept;
	}
}
