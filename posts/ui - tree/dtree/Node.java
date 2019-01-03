public class Node {
	int id;
	int pid;
	String name;
	String url;
	String title;
	String target;
	String icon;
	String iconOpen;
	boolean _io; // is open
	boolean _is = false; // is selected
	boolean _ls = false; // Last sibling
	boolean _hc = false; // Has children
	int _ai = 0; // ?
	_p; // Parent

	public Node() {
	}
}
