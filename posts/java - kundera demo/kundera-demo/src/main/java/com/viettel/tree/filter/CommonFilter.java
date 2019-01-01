package com.viettel.tree.filter;


import com.viettel.tree.util.CassandraUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CommonFilter {

	
	private void chainWithDatabase() {
		// Access database
		try {
			// CassandraUtil.openConnection();

			
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			CassandraUtil.closeConnection();
		}
	}

	
}
