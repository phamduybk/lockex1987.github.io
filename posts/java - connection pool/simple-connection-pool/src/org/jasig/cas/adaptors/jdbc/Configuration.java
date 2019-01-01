/*
 * Copyright (C) 2011 Viettel Telecom. All rights reserved.
 * VIETTEL PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package org.jasig.cas.adaptors.jdbc;

/**
 * Passport configuration class
 * @author congdh1@viettel.com.vn
 * @version 1.0
 * @since 3.3
 */
public class Configuration {

    /** Configuration instance.*/
    private static Configuration instance;
    /** balancer used.*/
    /** ip filter.*/
    /** ip lan filter.*/
    /** modify header version array.*/
    /** max idle connection.*/
    /** min idle connection.*/
    /** max active connection.*/
    /** JDBC driver.*/
    private String jdbcDriver = null;

    /** strong password.*/
    public String getJdbcDriver() {
        return jdbcDriver;
    }

    public void setJdbcDriver(String JdbcDriver) {
        this.jdbcDriver = JdbcDriver;
    }

    /**
     * Get the instance
     * @return the class unique instance
     */
    public static Configuration getInstance() {
        if (instance == null) {
            instance = new Configuration();
        }
        return instance;
    }

    /**
     * Constructor
     */
    public Configuration() {
        jdbcDriver = ResourceBundleUtils.getResource("DRIVER");
    }
}
