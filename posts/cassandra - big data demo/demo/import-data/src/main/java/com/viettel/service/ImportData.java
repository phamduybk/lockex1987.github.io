package com.viettel.service;

import java.io.BufferedReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import com.viettel.util.CassandraUtil;
import com.viettel.util.Constants.Mysql;
import com.viettel.util.DatabaseConnector;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ImportData extends DatabaseConnector {

	private PreparedStatement ps;
	private int count = 0;
	private CassandraUtil cassandraUtil;

	public ImportData() throws SQLException {
		super(Mysql.DRIVER, Mysql.URL, Mysql.USERNAME, Mysql.PASSWORD);

		String sql = " insert into internet_account( "
				+ " isdn, "
				+ " tinh, "
				// + " huyen, "
				// + " xa, "
				+ " sdt_lien_he, "
				// + " loai_tb_cung_giay_to, "
				// + " loai, "
				// + " ngay_kh, "
				// + " td_t8, "
				+ " marked_number, "
				+ " age, "
				// + " has_bank_account, "
				+ " is_parent "
				+ " ) "
				+ " VALUES(?, ?, ?, ?, ?, ?) ";
		// ps = getConnection().prepareStatement(sql);

		cassandraUtil = new CassandraUtil();
	}

	public void processDataFile(String filePath, int format) throws Exception {
		try (BufferedReader br = Files.newBufferedReader(Paths.get(filePath), StandardCharsets.UTF_8)) {
			for (String line = null; (line = br.readLine()) != null;) {
				if (!line.isEmpty()) {
					// System.out.println(line);
					String[] a = line.split("\\|");
					if (format == 1) {
						processLineFormat1(a);
					} else if (format == 2) {
						processLineFormat2(a);
					}

					count++;
					if (count % 1000 == 0) {
						log.info(String.valueOf(count));
					}
				}
			}
		}

		// ps.executeBatch();
		// ps.close();

		cassandraUtil.closeConnection();
	}

	// isdn
	// tinh
	// huyen
	// xa
	// ngay_nghiem_thu
	// dia_chi_ldat
	// sdt_lien_he (số điện thoại liên hệ)
	// loai_tb_cung_giay_to
	// loai (trả trước hay loại khác)
	// ngay_kh
	// td_t8
	// đánh dấu số điện thoại liên hệ
	// tuổi
	// hasBankAccount
	// isParent
	// đánh dấu số điện thoại liên quan _ tuổi
	// hasBankAccount
	// isParent
	private void processLineFormat1(String[] a) {
		int i = 0;
		String isdn = a[i++];
		String tinh = a[i++];
		String huyen = a[i++];
		String xa = a[i++];

		Date ngay_nghiem_thu = null;
		i++;

		String dia_chi_ldat = a[i++];
		String sdt_lien_he = a[i++];
		String loai_tb_cung_giay_to = a[i++];
		String loai = a[i++];
		String ngay_kh = a[i++];
		String td_t8 = a[i++];
		String marked_number = a[i++];
		int age = Integer.parseInt(a[i++]);
		int has_bank_account = Integer.parseInt(a[i++]);
		int is_parent = Integer.parseInt(a[i++]);

		// insertInternetAccount(isdn, tinh, huyen, xa, ngay_nghiem_thu, dia_chi_ldat,
		// sdt_lien_he, loai_tb_cung_giay_to, loai, ngay_kh, td_t8, marked_number, age,
		// has_bank_account, is_parent);

		cassandraUtil.insertIntoCassandra(tinh, isdn, sdt_lien_he, marked_number, age, is_parent);
	}

	// isdn
	// tinh
	// huyen
	// xa
	// ngay_nghiem_thu
	// dia_chi_ldat
	// sdt_lien_he (số điện thoại liên hệ)
	// tuổi
	// hasBankAccount
	// isParent
	private void processLineFormat2(String[] a) {
		if (a.length < 10) {
			return;
		}

		try {
			int i = 0;
			String isdn = a[i++];
			String tinh = a[i++];
			String huyen = a[i++];
			String xa = a[i++];
			Date ngay_nghiem_thu = null;
			i++;
			String dia_chi_ldat = a[i++];
			String sdt_lien_he = a[i++];
			int age = Integer.parseInt(a[i++]);
			int has_bank_account = Integer.parseInt(a[i++]);
			int is_parent = Integer.parseInt(a[i++]);

			String marked_number = "";

			cassandraUtil.insertIntoCassandra(tinh, isdn, sdt_lien_he, marked_number, age, is_parent);
		} catch (Exception ex) {
			log.error("Loi roi ", ex);
		}
	}

	private void insertInternetAccount(String isdn, String tinh, String huyen, String xa, Date ngay_nghiem_thu,
			String dia_chi_ldat, String sdt_lien_he, String loai_tb_cung_giay_to, String loai, String ngay_kh,
			String td_t8, String marked_number,
			int age, int has_bank_account, int is_parent) {
		if (is_parent == 0) {
			return;
		}

		// Date currentTime = new Date();
		// Timestamp createdTime = new Timestamp(currentTime.getTime());
		int batchSize = 1000;
		try {
			int col = 1;
			ps.setString(col++, isdn);
			ps.setString(col++, tinh);
			// ps.setString(col++, huyen);
			// ps.setString(col++, xa);
			// ps.setTimestamp(col++, new Timestamp(ts));
			// ps.setString(col++, dia_chi_ldat);
			ps.setString(col++, sdt_lien_he);
			// ps.setString(col++, loai_tb_cung_giay_to);
			// ps.setString(col++, loai);
			// ps.setString(col++, ngay_kh);
			// ps.setString(col++, td_t8);
			ps.setString(col++, marked_number);

			ps.setInt(col++, age);
			// ps.setInt(col++, has_bank_account);
			ps.setInt(col++, is_parent);

			// ps.executeUpdate();
			ps.addBatch();

			if (count % batchSize == 0) {
				log.info(String.valueOf(count));
				ps.executeBatch();
			}
		} catch (Exception ex) {
			log.error(ex.getMessage());
			// log.error("Loi khi day vao bang internet_account", ex);
		}
	}
}
