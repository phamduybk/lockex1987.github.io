/*
 * Copyright (C) 2010 Viettel Telecom. All rights reserved.
 * VIETTEL PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package org.jasig.cas.adaptors.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;

/**
 *
 * @author HuyenNV1
 */
public class DBManager extends BaseDAO {

    private Connection conn = null;

    public DBManager() {
        try {
            this.conn = DBConnect.getInstance().getConnection();
        } catch (Exception e) {
            this.logger.error(e, e);
        }
    }

    public void close() {
        closeResource(this.conn);
    }

    public void insertIntoActionLog(String clientIpAddress, String clientHost, String serviceUrl,
            String username, String description, Timestamp currentTimestamp) {
        PreparedStatement stmt = null;
        try {
            String sql = " INSERT INTO Action_Log( "
                    + "     action_log_id, user_name, action_time, "
                    + "     ip_client_address, host_client_address, server_url, "
                    + "     status, action_type, description "
                    + " ) VALUES (Action_Log_Seq.nextval, ?, ?, "
                    + "     ?, ?, ?, "
                    + "     ?, ?, ? "
                    + " ) ";
            stmt = this.conn.prepareStatement(sql);
            stmt.setString(1, username);
            stmt.setTimestamp(2, currentTimestamp);
            stmt.setString(3, clientIpAddress);
            stmt.setString(4, clientHost);
            stmt.setString(5, serviceUrl);
            stmt.setString(6, "".equals(description) ? "SUCCESS" : "FAILED");
            stmt.setString(7, "LOGIN");
            stmt.setString(8, description);
            stmt.executeUpdate();
        } catch (Exception ex) {
            this.logger.error(ex, ex);
        } finally {
            closeResource(stmt);
        }
    }

    public int getWhiteListServiceCount(String serviceId) {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        try {
            String sql = " SELECT COUNT(1) FROM White_List_Service wls WHERE ? LIKE wls.service || '%' ";
            stmt = this.conn.prepareStatement(sql);
            stmt.setString(1, serviceId);
            rs = stmt.executeQuery();
            if ((rs.next()) && (rs.getLong(1) > 0L)) {
                return 1;
            } else {
                return 0;
            }
        } catch (Exception ex) {
            this.logger.error(ex, ex);
            return -1;
        } finally {
            closeResource(rs);
            closeResource(stmt);
        }
    }
    
    public int getUserCountByUsernameAndPassword(String username, String encyptedPassword) {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        try {
            String sql = " SELECT COUNT('x') FROM Sys_User WHERE LOWER(login_name) LIKE ? AND password = ? ";
            stmt = this.conn.prepareStatement(sql);
            stmt.setString(1, username.toLowerCase());
            stmt.setString(2, encyptedPassword);
            rs = stmt.executeQuery();
            if ((rs.next()) && (rs.getLong(1) > 0L)) {
                return 1;
            } else {
                return 0;
            }
        } catch (Exception ex) {
            this.logger.error(ex, ex);
            return -1;
        } finally {
            closeResource(rs);
            closeResource(stmt);
        }
    }
    
    public int getLockedUserCount(String username) {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        try {
            String sql = " SELECT COUNT('x') FROM Sys_User WHERE LOWER(login_name) LIKE ? AND status = 2 ";
            stmt = this.conn.prepareStatement(sql);
            stmt.setString(1, username.toLowerCase());
            rs = stmt.executeQuery();
            if ((rs.next()) && (rs.getLong(1) > 0L)) {
                return 1;
            } else {
                return 0;
            }
        } catch (Exception ex) {
            this.logger.error(ex, ex);
            return -1;
        } finally {
            closeResource(rs);
            closeResource(stmt);
        }
    }

    public Long getSysUserId(String username) throws Exception {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        try {
            String sql = " SELECT sys_user_id FROM Sys_User WHERE LOWER(login_name) = ? ";
            stmt = this.conn.prepareStatement(sql);
            stmt.setString(1, username.toLowerCase());
            rs = stmt.executeQuery();
            if (rs.next()) {
                return Long.valueOf(rs.getLong(1));
            } else {
                return null;
            }
        } catch (Exception ex) {
            this.logger.error(ex, ex);
            return null;
        } finally {
            closeResource(rs);
            closeResource(stmt);
        }
    }
}
