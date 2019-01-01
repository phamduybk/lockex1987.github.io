package learnspring.dao;

import learnspring.model.Department;

public interface DepartmentDAO {

	public void insert(Department dept);

	public Department findByDepartmentId(int deptId);
}
