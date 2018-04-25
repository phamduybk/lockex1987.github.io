package com.viettel.service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.datastax.driver.core.Row;
import com.viettel.util.CassandraUtil;
import com.viettel.util.Constants.Mysql;
import com.viettel.util.DatabaseConnector;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ExportData {

	private List<String[]> provinceList;
	private CassandraUtil cassandraUtil;

	public ExportData() {
	}

	public void getProvinceList() throws SQLException {
		DatabaseConnector dc = new DatabaseConnector(Mysql.DRIVER, Mysql.URL, Mysql.USERNAME, Mysql.PASSWORD);

		String sql = " select name, prefix "
				+ " from province "
				+ " order by internet_account_code ";
		Statement stmt = dc.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery(sql);

		provinceList = new ArrayList<>();
		while (rs.next()) {
			String name = rs.getString("name");
			String prefix = rs.getString("prefix");
			// log.info(name + ", " + prefix);

			String[] a = new String[2];
			a[0] = name;
			a[1] = prefix;
			provinceList.add(a);
		}

		rs.close();
		stmt.close();
		dc.closeConnection();
	}

	public void countByProvince() {
		try {
			cassandraUtil = new CassandraUtil();
			for (String[] a : provinceList) {
				String name = a[0];
				String prefix = a[1];

				Row row = cassandraUtil.getSession()
						.execute(" select count(*) as total_account from internet_account where province = ? ",
								prefix)
						.one();
				long totalAccount = row.getLong("total_account");

				// log.info(name + ";" + prefix + ";" + totalAccount);
				System.out.println(name + "; " + prefix + "; " + totalAccount);
			}
		} catch (Exception ex) {
			log.error("Loi", ex);
		} finally {
			cassandraUtil.closeConnection();
		}
	}

	public void exportAllProvinces() {
		cassandraUtil = new CassandraUtil();
		for (String[] a : provinceList) {
			String name = a[0];
			String prefix = a[1];

			log.info(prefix + ". " + name);

			exportListByProvince(prefix.toLowerCase());
		}
		cassandraUtil.closeConnection();
	}

	public void exportListByProvince(String province) {
		try (BufferedWriter bw0 = new BufferedWriter(new FileWriter("output/" + province + "_0.csv"));
				BufferedWriter bw1 = new BufferedWriter(new FileWriter("output/" + province + "_1.csv"))) {

			int count = 0;
			com.datastax.driver.core.ResultSet rs = cassandraUtil.getSession()
					.execute(" select isdn, phone_number, is_parent from internet_account where province = ? ",
							province.toUpperCase());
			for (Row row : rs) {
				count++;
				if (count % 1000 == 0) {
					log.info("count: " + count);
				}
				String isdn = row.getString("isdn");
				String phoneNumber = row.getString("phone_number");
				int isParent = row.getInt("is_parent");

				if (isdn.startsWith(province)) {
					String content = phoneNumber + "," + isParent + "\n";
					if (isParent == 0) {
						bw0.write(content);
					} else if (isParent == 1) {
						bw1.write(content);
					}
				}
			}

			System.out.println("Done");
		} catch (IOException ex) {
			log.error("Error when writing file", ex);
		}
	}
}
