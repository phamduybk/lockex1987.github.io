package com.viettel.tree.dao;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.viettel.tree.model.ActionLog;
import com.viettel.tree.model.ActionLogKey;
import com.viettel.tree.util.CassandraUtil;

public class ActionLogDAO {

	public void addActionLog(UUID userId, String type, String description, Integer showToUser, UUID docId) {
		UUID id = UUID.randomUUID();
		Date actionTime = new Date();

		ActionLog obj = new ActionLog();
		ActionLogKey key = new ActionLogKey();
		key.setId(id);
		key.setUserId(userId);
		key.setActionTime(actionTime);
		obj.setKey(key);
		obj.setType(type);
		obj.setDescription(description);
		obj.setShowToUser(showToUser);
		obj.setDocId(docId);

		EntityManager em = CassandraUtil.getEntityManager();
		em.persist(obj);
	}

	public List<ActionLog> getLatestActionLogs(UUID userId) {
		String hql = " select t from ActionLog t where t.key.userId = :userId ";
		Query query = CassandraUtil.createQuery(hql);
		query.setParameter("userId", userId);
		query.setMaxResults(5);
		return query.getResultList();
	}

	public ActionLog getActionLog(UUID id) {
		Query query = CassandraUtil.createQuery(" select t from ActionLog t where t.key.id = :id ");
		query.setParameter("id", id);
		return (ActionLog) query.getSingleResult();
	}

	public void deleteActionLog(UUID id) {
		EntityManager em = CassandraUtil.getEntityManager();
		Query query = em.createQuery(" delete from ActionLog t where t.key.id = :id ");
		query.setParameter("id", id);
		query.executeUpdate();
	}

	public List<ActionLog> getSomeColumns(UUID userId) {
		// Chỉ định các cột ở mệnh đề select
		// Đối tượng trả về vẫn là ActionLog, nhưng chỉ có cột select là khác null,
		// các cột không được select sẽ bằng null
		String hql = " select t.type from ActionLog t where t.key.userId = :userId ";
		Query query = CassandraUtil.createQuery(hql);
		query.setParameter("userId", userId);
		query.setMaxResults(5);
		return query.getResultList();
	}
}
