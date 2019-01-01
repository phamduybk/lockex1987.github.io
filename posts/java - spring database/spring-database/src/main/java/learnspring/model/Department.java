package learnspring.model;

public class Department {

	private int departmentId;
	private String code;
	private String name;
	private String location;

	public Department() {
	}

	public Department(int departmentId, String code, String name, String location) {
		this.departmentId = departmentId;
		this.code = code;
		this.name = name;
		this.location = location;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	@Override
	public String toString() {
		return "Department ID: " + departmentId + ", code: " + code
				+ ", name: " + name + ", location: " + location;
	}
}
