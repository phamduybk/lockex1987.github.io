package learnspring.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import learnspring.model.Department;
import learnspring.model.DepartmentRowMapper;

public class JdbcTemplateQuerying extends JdbcDaoSupport {

	public List<Department> findAll1() {
		String sql = " SELECT * FROM Department ";
		List<Department> deptList = new ArrayList<>();
		List<Map<String, Object>> rows = getJdbcTemplate().queryForList(sql);
		for (Map<String, Object> row : rows) {
			Department dept = new Department();
			Long id = (Long) (row.get("department_id"));
			dept.setDepartmentId(id.intValue());
			dept.setCode((String) row.get("code"));
			dept.setName((String) row.get("name"));
			dept.setLocation((String) row.get("location"));
			deptList.add(dept);
		}
		return deptList;
	}

	public List<Department> findAll2() {
		String sql = " SELECT * FROM Department ";
		List<Department> deptList = getJdbcTemplate().query(sql,
				new BeanPropertyRowMapper<Department>(Department.class));
		return deptList;
	}

	public List<Department> findAll3() {
		String sql = " SELECT * FROM Department ";
		List<Department> deptList = getJdbcTemplate().query(sql,
				new DepartmentRowMapper());
		return deptList;
	}

	public String findDepartmentNameById(int deptId) {
		String sql = " SELECT name FROM Department WHERE department_id = ? ";
		String name = getJdbcTemplate().queryForObject(sql,
				new Object[] { deptId }, String.class);
		return name;
	}

	public int findTotalDepartment() {
		String sql = " SELECT COUNT(*) FROM Department ";
		int total = getJdbcTemplate().queryForObject(sql, Integer.class);
		return total;
	}
}
