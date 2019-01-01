package com.viettel.safenet.processlog.util;

import com.datastax.driver.core.BoundStatement;
import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.PreparedStatement;
import com.datastax.driver.core.Session;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;

/**
 * Kết nối và thao tác đến Cassandra.
 */
@Slf4j
public class CassandraUtil {

    // Đối tượng thao tác Cassandra
    private final Cluster cluster;
    private final Session session;
    private final PreparedStatement prepared;
    
    public CassandraUtil() {
        // Thông số cấu hình Cassandra
        String host = "127.0.0.1";
        String keyspace = "safenet";
        int port = 9042;

        // Khởi tạo Cassandra
        Cluster.Builder builder = Cluster.builder();
        builder.addContactPoint(host);
        builder.withPort(port);
        cluster = builder.build();
        session = cluster.connect(keyspace);
        String sql = " INSERT INTO log_detail(customer_id, domain, blocked_time, url, refer_url, user_agent, profile_id) "
                + " VALUES (:customer_id, :domain, :blocked_time, :url, :refer_url, :user_agent, :profile_id) "
                + " USING TTL 2678400 "; // 31 ngày
        prepared = session.prepare(sql);
    }
    
    public void insertIntoCassandra(String url, String referurl, Integer profile_id, String user_agent,
            int customerId, String domain, Date blockedTime) {
        try {
            BoundStatement bound = prepared.bind()
                    .setInt("customer_id", customerId)
                    .setString("domain", domain)
                    .setTimestamp("blocked_time", blockedTime);

            if (url != null) {
                bound.setString("url", url);
            } else {
                bound.setToNull("url");
            }
            if (referurl != null) {
                bound.setString("refer_url", referurl);
            } else {
                bound.setToNull("refer_url");
            }
            if (user_agent != null) {
                bound.setString("user_agent", user_agent);
            } else {
                bound.setToNull("user_agent");
            }
            if (profile_id != null) {
                bound.setInt("profile_id", profile_id);
            } else {
                bound.setToNull("profile_id");
            }

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
