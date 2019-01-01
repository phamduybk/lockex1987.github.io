package cttd.hibernate.bo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "Timekeeping")
public class TimekeepingBo {

	private Long timekeepingId;
	private Date checkTime;
	private String inOut;
	private Long employeeId;

	public TimekeepingBo() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "timekeeping_id")
	public Long getTimekeepingId() {
		return timekeepingId;
	}

	public void setTimekeepingId(Long timekeepingId) {
		this.timekeepingId = timekeepingId;
	}

	@Column(name = "check_time")
	@Temporal(TemporalType.TIMESTAMP)
	public Date getCheckTime() {
		return checkTime;
	}

	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}

	@Column(name = "in_out")
	public String getInOut() {
		return inOut;
	}

	public void setInOut(String inOut) {
		this.inOut = inOut;
	}

	@Column(name = "employee_id")
	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}
}
