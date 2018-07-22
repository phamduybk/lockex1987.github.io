/*
 * NVH.
 */
package cttd.jsondemo;

class BagOfPrimitives {

	private final int value1;
	private final String value2;
	private final transient int value3;

	public BagOfPrimitives(int value1, String value2, int value3) {
		this.value1 = value1;
		this.value2 = value2;
		this.value3 = value3;
	}

	public String description() {
		return "value1: " + value1
						+ ", value2: " + value2
						+ ", value3: " + value3;
	}
}
