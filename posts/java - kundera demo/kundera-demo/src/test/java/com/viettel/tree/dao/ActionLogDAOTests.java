package com.viettel.tree.dao;

import java.util.List;
import java.util.UUID;

import org.junit.After;
import org.junit.Ignore;
import org.junit.Test;

import com.viettel.tree.model.ActionLog;
import com.viettel.tree.util.CassandraUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ActionLogDAOTests {

	private ActionLogDAO actionLogDAO = new ActionLogDAO();

	@After
	public void closeConnection() {
		CassandraUtil.closeConnection();
	}

	@Ignore
	@Test
	public void addActionLogTest() {
		UUID userId = UUID.fromString("4d1090c3-e7f6-4b97-abc5-5d47a6268b97");
		String type = "update_doc";
		String description = "Thêm mới trang Mã hóa";
		Integer showToUser = 1;
		actionLogDAO.addActionLog(userId, type, description, showToUser, null);
	}

	//@Ignore
	@Test
	public void getLatestActionLogsTest() {
		UUID userId = UUID.fromString("4d1090c3-e7f6-4b97-abc5-5d47a6268b97");
		List<ActionLog> list = actionLogDAO.getLatestActionLogs(userId);
		for (ActionLog e : list) {
			log.info(e.toString());
		}
	}

	@Ignore
	@Test
	public void getActionLogTest() {
		UUID id = UUID.fromString("b85143e0-8374-410f-81f1-12606f6b7001");
		ActionLog obj = actionLogDAO.getActionLog(id);
		log.info(obj.toString());
	}
	
	@Ignore
	@Test
	public void deleteActionLogTest() {
		UUID id = UUID.fromString("abbf5183-de54-494d-9a3f-5b1f43c97273");
		actionLogDAO.deleteActionLog(id);
	}

	@Test
	public void getSomeColumnsTest() {
		UUID userId = UUID.fromString("4d1090c3-e7f6-4b97-abc5-5d47a6268b97");
		List<ActionLog> list = actionLogDAO.getSomeColumns(userId);
		for (ActionLog e : list) {
			log.info(e.toString());
		}		
	}
}
