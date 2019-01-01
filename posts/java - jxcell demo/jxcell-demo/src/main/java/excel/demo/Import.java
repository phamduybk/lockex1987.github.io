package excel.demo;

import com.jxcell.View;
import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import oracle.jdbc.pool.OracleDataSource;

/**
 *
 * @author NVH
 */
public class Import {

	private Connection conn; // connection object
	private PreparedStatement insertDriverStmt; // thuc hien lenh insert lai xe
	private PreparedStatement insertDriverLicenseHistoryStmt; // thuc hien lenh insert lich su bang lai
	private PreparedStatement insertCarStmt; // thuc hien lenh insert xe

	public Import(String fileName) {
		if (connectDatabase()) {
			boolean hasError = false;
			long deptId = Long.parseLong(fileName.substring(0, fileName.indexOf("_")));
			System.out.println(deptId);
			View view = new View();

			try {
				view.read(fileName);
				view.setSheet(1);
			} catch (Exception ex) {
				ex.printStackTrace();
			}

			// <editor-fold defaultstate="collapsed" desc="Driver sheet">
			int row = 4;
			while (true) {
				try {
					String fullname = view.getEntry(row, 1).trim();
					if (fullname.length() == 0) {
						break;
					}
					String code = view.getEntry(row, 2).trim();
					if (code.length() == 0) {
						code = "NA";
					}
					String position = view.getEntry(row, 3).trim();
					// String salaryLevel = view.getEntry(row, 4).trim();
					String birthday = view.getEntry(row, 5).trim();
					String startWorkDate = view.getEntry(row, 6).trim();
					if (startWorkDate.length() == 0) {
						startWorkDate = "1/1/2030";
					}
					// String deptName = view.getEntry(row, 7).trim();
					String licenseNumber = view.getEntry(row, 8).trim();
					if (licenseNumber.length() == 0) {
						licenseNumber = "NA";
					}
					String dateOfIssue = view.getEntry(row, 9).trim();
					if (dateOfIssue.length() == 0) {
						dateOfIssue = "1/1/2030";
					}
					String expiredDate = view.getEntry(row, 10).trim();
					if (expiredDate.length() == 0) {
						expiredDate = "1/1/2030";
					}
					String licenseType = view.getEntry(row, 11).trim();
					String phoneNumber = view.getEntry(row, 12).trim();

					long status = 1L;
					String statusName = view.getEntry(row, 13).trim();
					if ((statusName.length() == 0) || statusName.equals("Thá»­ viá»‡c")
							|| statusName.equals("Ä�ang thá»­ viá»‡c")) {
						status = 0L;
					}
					String description = view.getEntry(row, 14).trim();
					System.out.println(fullname);

					insertDriverStmt.setString(1, code);
					insertDriverStmt.setString(2, fullname);
					insertDriverStmt.setString(3, "1"); // co the lay cap luong
					insertDriverStmt.setString(4, position);
					insertDriverStmt.setString(5, standardizeYear(startWorkDate));
					insertDriverStmt.setString(6, standardizeYear(birthday));
					insertDriverStmt.setString(7, licenseNumber);
					insertDriverStmt.setString(8, licenseType);
					insertDriverStmt.setString(9, standardizeYear(dateOfIssue));
					insertDriverStmt.setString(10, standardizeYear(expiredDate));
					insertDriverStmt.setString(11, phoneNumber);
					insertDriverStmt.setString(12, description);
					insertDriverStmt.setLong(13, status);
					insertDriverStmt.setLong(14, deptId);
					insertDriverStmt.executeUpdate();

					insertDriverLicenseHistoryStmt.setString(1, licenseNumber);
					insertDriverLicenseHistoryStmt.setString(2, licenseType);
					insertDriverLicenseHistoryStmt.setString(3, dateOfIssue);
					insertDriverLicenseHistoryStmt.setString(4, expiredDate);
					insertDriverLicenseHistoryStmt.executeUpdate();
				} catch (Exception ex) {
					ex.printStackTrace();
					hasError = true;
				}

				row++;
			}
			// </editor-fold>

			try {
				view.setSheet(0);
			} catch (Exception ex) {
				ex.printStackTrace();
			}

			// <editor-fold defaultstate="collapsed" desc="Car sheet">
			row = 2;
			while (true) {
				try {
					String licensePlate = view.getEntry(row, 2).trim();
					if (licensePlate.length() == 0) {
						break;
					}
					String subLicense = view.getEntry(row, 3).trim();
					String carBrandName = view.getEntry(row, 4).trim();
					String carTypeName = view.getEntry(row, 5).trim();
					String frameNumber = view.getEntry(row, 6).trim();
					if (frameNumber.length() == 0) {
						frameNumber = "NA";
					}
					String engineNumber = view.getEntry(row, 7).trim();
					if (engineNumber.length() == 0) {
						engineNumber = "NA";
					}
					String fuelName = view.getEntry(row, 8).trim();
					double fuelNorm = 0D;
					String fuelString = view.getEntry(row, 9).trim();
					if (fuelString.length() > 0) {
						int n = fuelString.indexOf("lÃ­t");
						if (n < 0) {
							n = fuelString.indexOf("l/");
						}
						if (n < 0) {
							n = fuelString.indexOf("/");
						}
						if (n > 0) {
							fuelString = fuelString.substring(0, n);
						}
						fuelNorm = Double.parseDouble(fuelString);
					}
					String determineNumber = view.getEntry(row, 10).trim();
					String determineDate = view.getEntry(row, 11).trim();
					String registerNumber = view.getEntry(row, 12).trim();
					// String gpsDevice = view.getEntry(row, 13).trim();
					// String driverFullname = view.getEntry(row, 14).trim();
					String description = view.getEntry(row, 15).trim();
					System.out.println(licensePlate);

					insertCarStmt.setString(1, frameNumber);
					insertCarStmt.setString(2, engineNumber);
					insertCarStmt.setString(3, licensePlate);
					insertCarStmt.setString(4, subLicense);
					insertCarStmt.setDouble(5, fuelNorm);
					insertCarStmt.setString(6, standardizeYear(determineDate));
					insertCarStmt.setString(7, registerNumber);
					insertCarStmt.setString(8, description);
					insertCarStmt.setString(9, fuelName.toLowerCase());
					insertCarStmt.setString(10, carBrandName.toLowerCase());
					insertCarStmt.setString(11, carTypeName.toLowerCase());
					insertCarStmt.setLong(12, deptId);
					insertCarStmt.setString(13, determineNumber);
					insertCarStmt.executeUpdate();
				} catch (Exception ex) {
					ex.printStackTrace();
					hasError = true;
				}

				row++;
			}
			// </editor-fold>

			try {
				if (hasError) {
					conn.rollback();
				} else {
					conn.commit();
				}
			} catch (SQLException ex) {
				ex.printStackTrace();
			}

			closeDatabase();
		}

	}

	/**
	 * Connect to database.
	 * Return FALSE if cannot connect to database.
	 */
	private boolean connectDatabase() {
		String server;
		String port;
		String service;
		String user;
		String password;

		try {
			BufferedReader br = new BufferedReader(new FileReader("config" + File.separatorChar + "database.txt"));
			br.readLine();
			server = br.readLine();
			br.readLine();
			port = br.readLine();
			br.readLine();
			service = br.readLine();
			br.readLine();
			user = br.readLine();
			br.readLine();
			password = br.readLine();
			br.close();
		} catch (FileNotFoundException ex) {
			System.out.println("Database config file not found");
			return false;
		} catch (IOException ex) {
			System.out.println("Error when reading database config file");
			return false;
		}

		try {
			OracleDataSource ods = new OracleDataSource();
			ods.setURL("jdbc:oracle:thin:" + user + "/" + password + "@" + server + ":" + port + "/" + service);
			conn = ods.getConnection();
			conn.setAutoCommit(false);
			
			String insertDriver = " INSERT INTO Driver ( " +
					"   DRIVER_ID, " +
					"   CODE, " +
					"   FULLNAME, " +
					"   DRIVER_LEVEL, " +
					"   POSITION, " +
					"   START_WORK_DATE, " +
					"   BIRTHDAY, " +
					"   LICENSE_NUMBER, " +
					"   LICENSE_TYPE, " +
					"   DATE_OF_ISSUSE, " +
					"   EXPIRED_DATE, " +
					"   PHONE_NUMBER, " +
					"   DESCRIPTION, " +
					"   STATUS, " +
					"   DEPARTMENT_ID, " +
					"   IS_ACTIVE " +
					" ) VALUES ( " +
					"   DRIVER_SEQ.nextval, " +
					"   ?, " + // 1. code
					"   ?, " + // 2. fullname
					"   ?, " + // 3. level
					"   ?, " + // 4. position
					"   TO_DATE(?, 'dd/MM/yyyy'), " + // 5. start work date
					"   TO_DATE(?, 'dd/MM/yyyy'), " + // 6. birthday
					"   ?, " + // 7. license number
					"   ?, " + // 8. license type
					"   TO_DATE(?, 'dd/MM/yyyy'), " + // 9. date of issue
					"   TO_DATE(?, 'dd/MM/yyyy'), " + // 10. expired date
					"   ?, " + // 11. phone number
					"   ?, " + // 12. description
					"   ?, " + // 13. status
					"   ?, " + // 14. department id
					"   1 " +
					" ) ";
			insertDriverStmt = conn.prepareStatement(insertDriver);
			
			String insertCar = " INSERT INTO Car ( " +
					"   car_id, " +
					"   frame_number, " +
					"   engine_number, " +
					"   license_plate, " +
					"   sub_license_plate, " +
					"   producer_km, " +
					"   fuel_norm, " +
					"   determine_date, " +
					"   register_number, " +
					"   description, " +
					"   is_active, " +
					"   fuel_id, " +
					"   car_brand_id, " +
					"   car_type_id, " +
					"   department_id, " +
					"   determine_number, " +
					"   status " +
					" ) VALUES ( " +
					"   Car_Seq.nextval, " +
					"   ?, " + // 1. frame number
					"   ?, " + // 2. engine number
					"   ?, " + // 3. license plate
					"   ?, " + // 4. sub license plate
					"   13, " +
					"   ?, " + // 5. fuel norm
					"   TO_DATE(?, 'dd/MM/yyyy'), " + // 6. determine date
					"   ?, " + // 7. register number
					"   ?, " + // 8. description
					"   1, " + // is_active
					"   (SELECT f.fuel_id FROM Fuel f WHERE LOWER(f.name) = ? AND ROWNUM < 2), " + // 9. fuel id
					"   (SELECT cb.car_brand_id FROM Car_Brand cb WHERE LOWER(cb.name) = ? AND ROWNUM < 2), " + // 10. car brand
																																																			// id
					"   (SELECT ct.car_type_id FROM Car_Type ct WHERE LOWER(ct.name) = ? AND ROWNUM < 2), " + // 11. car type id
					"   ?, " + // 12. department id
					"   ?, " + // 13. determine number
					"   1 " + // status = 1 (ban giao don vi)
					" ) ";
			insertCarStmt = conn.prepareStatement(insertCar);
			
			String insertDriverLicenseHistory = " INSERT INTO Driver_License_History ( " +
					"   driver_license_history_id, " +
					"   license_number, " +
					"   license_type, " +
					"   date_of_issuse, " +
					"   expired_date, " +
					"   modified_date, " +
					"   driver_id " +
					" ) VALUES (" +
					"   Driver_License_History_Seq.nextval, " +
					"   ?, " + // 1. d.license_number,
					"   ?, " + // 2. d.license_type,
					"   TO_DATE(?, 'dd/MM/yyyy'), " + // 3. d.date_of_issuse,
					"   TO_DATE(?, 'dd/MM/yyyy'), " + // 4. d.expired_date,
					"   TO_DATE('14/04/2010', 'dd/mm/yyyy'), " +
					"   Driver_Seq.currval " + // nextval hay currval?
					" ) ";
			insertDriverLicenseHistoryStmt = conn.prepareStatement(insertDriverLicenseHistory);
		} catch (SQLException ex) {
			System.out.println("Error when accessing database");
			return false;
		}
		return true;
	}

	/**
	 * Dong cac ket noi voi CSDL, giai phong tai nguyen.
	 * Finish.
	 */
	private void closeDatabase() {
		try {
			if (insertDriverStmt != null) {
				insertDriverStmt.close();
			}
			if (insertDriverLicenseHistoryStmt != null) {
				insertDriverLicenseHistoryStmt.close();
			}
			if (insertCarStmt != null) {
				insertCarStmt.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Chuan hoa lai xau thoi gian.
	 * Ngay dd/mm/yy -> dd/mm/yyyy
	 * 
	 * @param year
	 * @return
	 */
	private String standardizeYear(String date) {
		try {
			int n = date.lastIndexOf("/");
			int year = Integer.parseInt(date.substring(n + 1));
			if (year < 1900) {
				return date.substring(0, n + 1) + (year + 1900);
			} else {
				return date;
			}
		} catch (Exception ex) {
			return "";
		}
	}

	public static void main(String[] args) {
		if ((args == null) || (args.length == 0)) {
			System.out.println("Usage: java -jar Import.jar <filename>");
		} else {
			new Import(args[0].trim());
		}
	}
}