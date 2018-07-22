package cttd.json.model;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import com.google.gson.annotations.SerializedName;

import cttd.json.GsonDemo;

public class PerfomanceData {

	private Integer id;
	@SerializedName("site_id")
	private Integer siteId;
	@SerializedName("date_time")
	private Date month;
	private Double datakWhMensuel;
	private Double dataDJU;

	@Override
	public String toString() {
		DateFormat dateFormat = new SimpleDateFormat(GsonDemo.DATE_FORMAT);
		return "id = " + id + ", siteId = " + siteId + ", month = " + dateFormat.format(month) + ", datakWhMensuel = " + datakWhMensuel
				+ ", dataDJU = " + dataDJU;
	}
}
