package cleanjavacode;

import lombok.Data;

@Data
public class SysCatBO {

	private Long sysCatId;
	private String code;
	private String name;
	private String type;
	private Long isActive;
}
