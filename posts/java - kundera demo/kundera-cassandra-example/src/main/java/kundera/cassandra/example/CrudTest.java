package kundera.cassandra.example;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.impetus.client.cassandra.common.CassandraConstants;

public class CrudTest {

	public static void main(String[] args) {
		testQuestion();
	}
	
	private static void testCrud() {
		String persistenceUnit = "cassandra_pu";
		Map<String, String> props = new HashMap<>();
		props.put(CassandraConstants.CQL_VERSION, CassandraConstants.CQL_VERSION_3_0);
		EntityManagerFactory emf = Persistence.createEntityManagerFactory(persistenceUnit, props);
		EntityManager em = emf.createEntityManager();

		testInsert(em);
		testMerge(em);
		testRemove(em);

		em.close();
		emf.close();
	}
	
	private static void testQuestion() {
		Question q = new Question();
		q.setQuestion("Cao Thị Thùy Dương 3");
		q.setUser("huyennv 3");
		
		String persistenceUnit = "cassandra_pu";
		Map<String, String> props = new HashMap<>();
		props.put(CassandraConstants.CQL_VERSION, CassandraConstants.CQL_VERSION_3_0);
		EntityManagerFactory emf = Persistence.createEntityManagerFactory(persistenceUnit, props);
		EntityManager em = emf.createEntityManager();

		em.persist(q);

		em.close();
		emf.close();
	}

	private static void testInsert(EntityManager em) {
		Person p = new Person();
		p.setPersonId("102");
		p.setPersonName("dev");
		p.setAge(24);
		em.persist(p);
	}

	private static void testMerge(EntityManager em) {
		Person person = em.find(Person.class, "102");
		person.setPersonName("devender");
		em.merge(person);
	}

	private static void testRemove(EntityManager em) {
		Person p = em.find(Person.class, "102");
		// em.remove(p);
	}
}
