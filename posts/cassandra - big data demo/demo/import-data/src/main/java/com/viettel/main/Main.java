package com.viettel.main;

import com.viettel.service.ExportData;
import com.viettel.service.ImportData;

public class Main {

	public static void main(String[] args) throws Exception {
		exportData();
	}
	
	private static void importData() throws Exception {
		//int format = 1;
		//String filePath = "D:\\project\\safenet\\PYC_72558_bm2_0510\\20171005_1_part_0.txt\\part-00000";
		//String filePath = "D:\\project\\safenet\\PYC_72558_bm2_0510\\20171005_1_part_1.txt\\part-00000";
		//String filePath = "D:\\project\\safenet\\PYC_72558_bm2_0510\\20171005_1_part_2.txt\\part-00000";
		//String filePath = "D:\\project\\safenet\\PYC_72558_bm2_0510\\20171005_1_part_3.txt\\part-00000";
				
		int format = 2;
		//String filePath = "D:\\project\\safenet\\PYC_luonglt4_bm1\\file1.txt\\part-00000";
		//String filePath = "D:\\project\\safenet\\PYC_luonglt4_bm1\\file2.txt\\part-00000";
		String filePath = "D:\\project\\safenet\\PYC_luonglt4_bm1\\file3.txt\\part-00000";
		
		ImportData importData = new ImportData();
		importData.processDataFile(filePath, format);
		System.out.println("Finish");
	}
	
	private static void exportData() throws Exception {
		ExportData exportData = new ExportData();
		exportData.getProvinceList();
		//exportData.countByProvince();
		//String province = "a076";
		//exportData.exportListByProvince(province);
		exportData.exportAllProvinces();
	}
}
