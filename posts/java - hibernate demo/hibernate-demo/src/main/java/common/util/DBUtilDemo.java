package common.util;

import java.util.List;

import org.hibernate.query.Query;

import cttd.hibernate.bo.EmployeeBo;

public class DBUtilDemo {

	public static void main(String[] args) {
		try {
			DBUtil.openThreadSession();
			DBUtil.beginTransaction();

			demo();

			DBUtil.commitTransaction();
		} catch (Exception ex) {
			ex.printStackTrace();
			DBUtil.rollbackTransaction();
		} finally {
			DBUtil.closeSession();
		}
		
		DBUtil.shutdown();
	}
	
	public static void main2(String[] args) {
		try {
			DBUtil.openThreadSession();
			demo();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			DBUtil.closeSession();
		}
		
		DBUtil.shutdown();
		System.out.println("Why not finish?");
	}

	private static void demo() {
		String sql = " FROM EmployeeBo e ORDER BY e.name, e.code ";
		Query query = DBUtil.createQuery(sql);
		List<EmployeeBo> employees = query.list();
		for (EmployeeBo emp : employees) {
			System.out.println("Emp: " + emp.getCode() + " : " + emp.getName());
		}
	}
}
