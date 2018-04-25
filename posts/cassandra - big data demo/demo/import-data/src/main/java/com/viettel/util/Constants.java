/*
 * VIETTEL.
 */
package com.viettel.util;

/**
 *
 * @author huyennv9
 */
public interface Constants {

	interface Mysql {

		String DRIVER = FileConfig.getConfig("mysql.driver");
		String URL = FileConfig.getConfig("mysql.url");
		String USERNAME = FileConfig.getConfig("mysql.username");
		String PASSWORD = FileConfig.getConfig("mysql.password");
	}
}
