using System;
using System.Management;
using Microsoft.Win32;
using System.IO;

public class VistaDrives
{
	public static void Main(string[] argv)
	{
		//File.Delete("C:\\Documents and Settings\\NVH\\Local Settings\\Application Data\\IconCache.db");
		Change("C");
		Change("D");
		Change("E");
		Change("F");
	}

	private static void Change(String driveletter)
	{
		ManagementObject disk = new ManagementObject("win32_logicaldisk.deviceid=\"" + driveletter + ":\"");
		disk.Get();
		double percent = 100 - 100 * Double.Parse(disk["FreeSpace"].ToString()) / Double.Parse(disk["Size"].ToString());
		int n = (int)(percent + 2.5) / 5;
		n = n * 5;
		Registry.SetValue("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\DriveIcons\\"
			+ driveletter + "\\DefaultIcon", "", "E:\\project\\vista drives\\" + n + ".ico");
	}
}