package org.o7planning.tutorial.hibernate.query;

import java.util.List;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.o7planning.tutorial.hibernate.HibernateUtils;

import cttd.hibernate.bo.EmployeeBo;


public class QueryObjectDemo {

	public static void main(String[] args) {
		SessionFactory factory = HibernateUtils.getSessionFactory();

		Session session = factory.getCurrentSession();

		try {
			// Tất cả các lệnh hành động với DB thông qua Hibernate
			// đều phải nằm trong 1 giao dịch (Transaction)
			// Bắt đầu giao dịch
			session.getTransaction().begin();

			// Tạo một câu lệnh HQL query object.
			// Tương đương với Native SQL:
			// Select e.* from EMPLOYEE e order by e.EMP_NAME, e.EMP_NO

			String sql = " select e from EmployeeBo e "
					+ " order by e.name, e.code ";

			// Tạo đối tượng Query.
			Query query = session.createQuery(sql);

			// Thực hiện truy vấn.
			List<EmployeeBo> employees = query.list();

			for (EmployeeBo emp : employees) {
				System.out.println("Emp: " + emp.getCode() + " : "
						+ emp.getName());
			}

			// Commit dữ liệu
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			// Rollback trong trường hợp có lỗi xẩy ra.
			session.getTransaction().rollback();
		}
		
		// Use this function to terminate the application gently
		HibernateUtils.shutdown();
	}
}
