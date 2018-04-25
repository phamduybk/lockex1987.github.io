/*
 * VIETTEL.
 */

package com.viettel.util;

import com.datastax.driver.core.BoundStatement;
import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.PreparedStatement;
import com.datastax.driver.core.Session;

import lombok.extern.slf4j.Slf4j;

/**
 *
 * @author huyennv9
 */
@Slf4j
public class CassandraUtil {

	// Đối tượng thao tác Cassandra
	private final Cluster cluster;
	private final Session session;
	private final PreparedStatement prepared;

	public CassandraUtil() {
		// Thông số cấu hình Cassandra
		String host = FileConfig.getConfig("cassandra.host");
		String keyspace = FileConfig.getConfig("cassandra.keyspace");
		int port = Integer.parseInt(FileConfig.getConfig("cassandra.port"));

		// Khởi tạo Cassandra
		Cluster.Builder builder = Cluster.builder();
		builder.addContactPoint(host);
		builder.withPort(port);
		cluster = builder.build();
		session = cluster.connect(keyspace);

		String sql = " insert into internet_account(province, isdn, phone_number, marked_number, age, is_parent) "
				+ " VALUES (:province, :isdn, :phone_number, :marked_number, :age, :is_parent) ";
		prepared = session.prepare(sql);
	}

	public Session getSession() {
		return session;
	}

	public void insertIntoCassandra(String province, String isdn, String phoneNumber, String markedNumber,
			Integer age, int isParent) {
		try {
			BoundStatement bound = prepared.bind()
					.setString("province", province)
					.setString("isdn", isdn)
					.setString("phone_number", phoneNumber)
					.setString("marked_number", markedNumber)
					.setInt("age", age)
					.setInt("is_parent", isParent);
			session.execute(bound);
		} catch (Exception ex) {
			log.error("Loi khi day du lieu vao Cassandra", ex);
		}
	}

	public void closeConnection() {
		if (cluster != null) {
			cluster.close();
		}
	}
}
