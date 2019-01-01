/*
 * Copyright (C) 2010 Viettel Telecom. All rights reserved.
 * VIETTEL PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package org.jasig.cas.adaptors.jdbc;

import java.net.URL;
import java.net.URLDecoder;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import javax.sql.DataSource;
import org.apache.commons.dbcp.ConnectionFactory;
import org.apache.commons.dbcp.DriverManagerConnectionFactory;
import org.apache.commons.dbcp.PoolableConnectionFactory;
import org.apache.commons.dbcp.PoolingDataSource;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.pool.impl.GenericObjectPool;

/**
 * Database connect
 *
 * @author HuyND6@Viettel.com.vn
 * @author congdh1@viettel.com.vn
 * @version 1.1
 * @since 3.0
 */
public class DBConnect {

    private DataSource dataSource;
    private GenericObjectPool connectionPool = null;
    private static DBConnect instance;
    private final Log logger = LogFactory.getLog(getClass());

    public static DBConnect getInstance() {
        if (instance == null) {
            instance = new DBConnect();
        }
        return instance;
    }

    private DBConnect() {
        this.logger.info("Init DBConnect");
        URL url1 = Thread.currentThread().getContextClassLoader().getResource("database.cfg");
        String filePath = URLDecoder.decode(url1.getPath());
        String decryptString = EncryptDecryptUtils.decryptFile(filePath);
        HashMap<String, String> map = new HashMap<String, String>();
        String[] properties = decryptString.split("\r\n");
        for (String property : properties) {
            String[] temp = property.split("=", 2);
            if (temp.length == 2) {
                map.put(temp[0], temp[1]);
            }
        }
        String userName = map.get("hibernate.connection.username");
        String password = map.get("hibernate.connection.password");
        String url = map.get("hibernate.connection.url");
        this.logger.info("Decrypt database info successfull");

        try {
            Class.forName(Configuration.getInstance().getJdbcDriver());
            connectionPool = new GenericObjectPool(null);
            ConnectionFactory connectionFactory = new DriverManagerConnectionFactory(url, userName, password);
            PoolableConnectionFactory poolableConnectionFactory = new PoolableConnectionFactory(connectionFactory, connectionPool,
                    null, null, false, true);
            poolableConnectionFactory.setValidationQuery("SELECT 1 FROM DUAL");

            //<editor-fold defaultstate="collapsed" desc="HuyenNV1 adds">
            this.connectionPool.setMaxActive(500);
            this.connectionPool.setMaxIdle(10);
            this.connectionPool.setMinIdle(0);
            //</editor-fold>

            dataSource = new PoolingDataSource(connectionPool);
        } catch (ClassNotFoundException e) {
            logger.error("Cannot find jdbc driver: ", e);
        } catch (Exception ex) {
            logger.error("Cannot create connection pool: ", ex);
        }
    }

    public Connection getConnection() {
        try {
            System.out.println("Ngoc Trinh: " + connectionPool.getNumActive() + ", " + connectionPool.getNumIdle());
            return dataSource.getConnection();
        } catch (SQLException ex) {
            logger.error("Cannot get connection", ex);
        }
        return null;
    }
}
