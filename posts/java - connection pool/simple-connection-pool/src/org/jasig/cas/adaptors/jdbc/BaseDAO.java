/*
 * Copyright (C) 2010 Viettel Telecom. All rights reserved.
 * VIETTEL PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package org.jasig.cas.adaptors.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 *
 * @author HuyenNV1
 */
public class BaseDAO {

    public void closeResource(ResultSet rs) {
        try {
            if (rs != null) {
                rs.close();
                rs = null;
            }
        } catch (Exception e) {
            System.out.println("Close result set error.");
        } finally {
            rs = null;
        }
    }

    public void closeResource(PreparedStatement stmt) {
        try {
            if (stmt != null) {
                stmt.close();
                stmt = null;
            }
        } catch (Exception e) {
            System.out.println("Close prepare statement error.");
        } finally {
            stmt = null;
        }
    }

    public void closeResource(Connection conn) {
        try {
            if (conn != null) {
                conn.close();
                conn = null;
            }
        } catch (Exception e) {
            System.out.println("Close connection error.");
        } finally {
            conn = null;
        }
    }
}
