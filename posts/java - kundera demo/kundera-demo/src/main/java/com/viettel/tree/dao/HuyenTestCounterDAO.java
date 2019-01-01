package com.viettel.tree.dao;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.viettel.tree.model.HuyenTestCounter;
import com.viettel.tree.util.CassandraUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class HuyenTestCounterDAO {

	public void increasePointNative(String name) {
		Integer value = 1;
		String fieldName = "point";
		String sql = String.format(" update huyen_test_counter set %s = %s + %d where name = '%s' ",
				fieldName, fieldName, value, name);

		EntityManager em = CassandraUtil.getEntityManager();
		Query query = em.createNativeQuery(sql);
		query.executeUpdate();
	}

	// Kiểu dữ liệu counter không hỗ trợ Query bình thường, mà chỉ NativeQuery
	// NativeQuery không hỗ trợ setParameter (https://github.com/impetus-opensource/Kundera/issues/508)
	// Vậy fix ATTT kiểu gì? :(
	// Không dùng kiểu dữ liệu counter nữa
	public void increasePointParam(String name) {
		//String sql = String.format(" update HuyenTestCounter set point = point + 1 where name = '%s' ", name);
		String sql = " update huyen_test_counter set point = point + 1 where name = :name ";
		log.debug(sql);

		EntityManager em = CassandraUtil.getEntityManager();
		//Query query = em.createQuery(sql);
		Query query = em.createNativeQuery(sql);
		//query.setParameter(0, name);
		query.setParameter("name", name);
		query.executeUpdate();
	}
	
	public HuyenTestCounter get(String name) {
		EntityManager em = CassandraUtil.getEntityManager();
		return em.find(HuyenTestCounter.class, name);
	}
}
