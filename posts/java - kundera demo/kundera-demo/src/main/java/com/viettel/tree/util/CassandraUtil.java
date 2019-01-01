package com.viettel.tree.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

import com.impetus.client.cassandra.common.CassandraConstants;

public class CassandraUtil {

	private static final ThreadLocal<Map<String, EntityManagerFactory>> THREAD_FACTORY = new ThreadLocal<>();
	private static final ThreadLocal<Map<String, EntityManager>> THREAD_ENTITY_MANAGER = new ThreadLocal<>();

	private static final String DEFAULT_UNIT = "cassandra_pu";

	private static EntityManagerFactory initEntityManagerFactory(String persistenceUnit) {
		Map<String, String> props = new HashMap<>();
		props.put(CassandraConstants.CQL_VERSION, CassandraConstants.CQL_VERSION_3_0);
		return Persistence.createEntityManagerFactory(persistenceUnit, props);
	}

	private static EntityManagerFactory getFactory(String persistenceUnit) {
		Map<String, EntityManagerFactory> map = THREAD_FACTORY.get();
		if (map == null) {
			map = new HashMap<>();
			THREAD_FACTORY.set(map);
		}
		EntityManagerFactory emf = map.get(persistenceUnit);
		if (emf == null) {
			emf = initEntityManagerFactory(persistenceUnit);
			map.put(persistenceUnit, emf);
		}
		return emf;
	}

	public static EntityManager getEntityManager() {
		return getEntityManager(DEFAULT_UNIT);
	}

	public static EntityManager getEntityManager(String persistenceUnit) {
		Map<String, EntityManager> map = THREAD_ENTITY_MANAGER.get();
		if (map == null) {
			map = new HashMap<>();
			THREAD_ENTITY_MANAGER.set(map);
		}
		EntityManager em = map.get(persistenceUnit);
		if (em == null || !em.isOpen()) {
			EntityManagerFactory emf = getFactory(persistenceUnit);
			em = emf.createEntityManager();
			map.put(persistenceUnit, em);
		}
		return em;
	}

	public static void closeConnection() {
		Map<String, EntityManager> entityManagerMap = THREAD_ENTITY_MANAGER.get();
		Map<String, EntityManagerFactory> factoryMap = THREAD_FACTORY.get();

		if (entityManagerMap != null) {
			Set<String> keySet = entityManagerMap.keySet();
			for (String key : keySet) {
				EntityManager em = entityManagerMap.get(key);
				if (em != null) {
					em.close();
				}
			}
		}
		if (factoryMap != null) {
			Set<String> keySet = factoryMap.keySet();
			for (String key : keySet) {
				EntityManagerFactory emf = factoryMap.get(key);
				if (emf != null) {
					emf.close();
				}
			}
		}

		THREAD_FACTORY.set(null);
		THREAD_ENTITY_MANAGER.set(null);
	}

	public static Query createQuery(String hql) {
		EntityManager em = getEntityManager();
		Query query = em.createQuery(hql);
		return query;
	}

	public static <T> T find(Class<T> clazz, Object id) {
		EntityManager em = getEntityManager();
		return em.find(clazz, id);
	}

	public static void persist(Object obj) {
		EntityManager em = getEntityManager();
		em.persist(obj);
	}
}
