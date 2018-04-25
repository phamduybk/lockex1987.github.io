/*
 * VIETTEL.
 */
package com.viettel.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import lombok.extern.slf4j.Slf4j;

/**
 * Kết nối đến CSDL nói chung (MySQL, Oracle,...) Với các CSDL khác nhau thì
 * chúng tra truyền driver và url khác nhau.
 *
 * @author huyennv9
 */
@Slf4j
public class DatabaseConnector {

    // Database configuration
    private final String driver;
    private final String url;
    private final String username;
    private final String password;

    // Connection object
    private Connection con;

    public DatabaseConnector(String driver, String url, String username, String password) {
        this.driver = driver;
        this.url = url;
        this.username = username;
        this.password = password;
    }
    
    public Connection getConnection() {        
        if (con != null) {
            return con;
        }
        try {
            Class.forName(driver);
            con = DriverManager.getConnection(url, username, password);
        } catch (Exception ex) {
            log.error("Get database connection error", ex);
        }
        return con;
    }

    public void closeConnection() {
        try {
            con.close();
        } catch (SQLException ex) {
            log.error("Error when close connection", ex);
        }
    }
}
