package learnspring.main;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import learnspring.dao.DepartmentDAO;
import learnspring.dao.JdbcTemplateQuerying;
import learnspring.model.Department;

public class SpringJdbcDemo {

	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext("spring-beans.xml");
		testGetData(ctx, "departmentSpringJdbc");
		testGetData(ctx, "departmentJdbcTemplate");
		testGetData(ctx, "departmentJdbcDaoSupport");
		testTempateQuerying(ctx);
	}

	private static void testInsert(ApplicationContext ctx, String beanName) {
		DepartmentDAO dao = (DepartmentDAO) ctx.getBean(beanName);
		Department dept = new Department(1, "CTTD", "Cao Thị Thùy Dương", "Nam Định");
		dao.insert(dept);
	}

	private static void testGetData(ApplicationContext ctx, String beanName) {
		DepartmentDAO dao = (DepartmentDAO) ctx.getBean(beanName);
		Department dept = dao.findByDepartmentId(1);
		System.out.println(dept);
	}

	private static void testTempateQuerying(ApplicationContext ctx) {
		JdbcTemplateQuerying jdbcTemplateQuerying = (JdbcTemplateQuerying) ctx.getBean("jdbcTemplateQuerying");

		List<Department> deptList = jdbcTemplateQuerying.findAll3();
		for (Department dept : deptList) {
			System.out.println(dept);
		}

		int deptId = 1;
		String deptName = jdbcTemplateQuerying.findDepartmentNameById(deptId);
		System.out.println(deptName);

		int total = jdbcTemplateQuerying.findTotalDepartment();
		System.out.println(total);
	}
}
