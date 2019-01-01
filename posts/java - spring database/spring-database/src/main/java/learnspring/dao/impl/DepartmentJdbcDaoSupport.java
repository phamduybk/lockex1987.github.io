package learnspring.dao.impl;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import learnspring.dao.DepartmentDAO;
import learnspring.model.Department;
import learnspring.model.DepartmentRowMapper;

public class DepartmentJdbcDaoSupport extends JdbcDaoSupport implements DepartmentDAO {

	@Override
	public void insert(Department dept) {
		String sql = " INSERT INTO Department(department_id, code, name, location) "
				+ " VALUES (?, ?, ?, ?) ";
		
		getJdbcTemplate().update(sql, new Object[] {
				dept.getDepartmentId(),
				dept.getCode(),
				dept.getName(),
				dept.getLocation()
		});
	}

	@Override
	public Department findByDepartmentId(int deptId) {
		System.out.println("Call from JdbcDaoSupport");
		String sql = " SELECT * FROM Department WHERE department_id = ? ";
		
		// Use customized RowMapper
//		Department dept = getJdbcTemplate().queryForObject(
//				sql,
//				new Object[] { deptId },
//				new DepartmentRowMapper());
		
		// Use BeanPropertyRowMapper
		Department dept = getJdbcTemplate().queryForObject(
				sql,
				new Object[] { deptId },
				new BeanPropertyRowMapper<Department>(Department.class));
		
		return dept;
	}
}
