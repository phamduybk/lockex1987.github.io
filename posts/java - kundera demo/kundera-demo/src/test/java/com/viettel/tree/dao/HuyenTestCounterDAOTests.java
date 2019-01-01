package com.viettel.tree.dao;

import org.junit.After;
import org.junit.Ignore;
import org.junit.Test;

import com.viettel.tree.model.HuyenTestCounter;
import com.viettel.tree.util.CassandraUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class HuyenTestCounterDAOTests {

	private HuyenTestCounterDAO huyenTestCounterDAO = new HuyenTestCounterDAO();

	@After
	public void closeConnection() {
		CassandraUtil.closeConnection();
	}

	@Ignore
	@Test
	public void increasePointNativeTest() {
		String name = "Huyen";
		huyenTestCounterDAO.increasePointNative(name);
	}
	
	//@Ignore
	@Test
	public void increasePointParamTest() {
		String name = "Duong";
		huyenTestCounterDAO.increasePointParam(name);
	}
	
	@Ignore
	@Test
	public void getTest() {
		String name = "Huyen";
		HuyenTestCounter obj = huyenTestCounterDAO.get(name);
		log.debug(obj.toString());
	}
}
