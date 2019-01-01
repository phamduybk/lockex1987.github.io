package cttd.hibernate.bo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "User_Role")
public class UserRoleBo {

	private Long sysUserId;
	private Long sysRoleId;

	public UserRoleBo() {
	}

	@Id
	@Column(name = "sys_user_id")
	public Long getSysUserId() {
		return sysUserId;
	}

	public void setSysUserId(Long sysUserId) {
		this.sysUserId = sysUserId;
	}

	@Id
	@Column(name = "sys_role_id")
	public Long getSysRoleId() {
		return sysRoleId;
	}

	public void setSysRoleId(Long sysRoleId) {
		this.sysRoleId = sysRoleId;
	}
}
