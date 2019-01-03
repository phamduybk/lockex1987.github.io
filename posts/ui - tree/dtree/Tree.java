import java.util.*;

public class Tree {
String obj; // Name
LinkedList<Node> aNodes = new LinkedList<Node>; // List of nodes
Stack<Long> aIndent = new Stack<Long>; // Indent
Node root = new Node(-1);
Node? selectedNode = null;
boolean selectedFound = false;
boolean completed = false;

	public void add(Node n) {
		aNodes.addLast(n);
	}

	// Checks if a node has any children and if it is the last sibling
	public void setCS(Node node) {
		int lastId;
		for (int n = 0; n < this.aNodes.size(); n++) {
			if (this.aNodes.get(n).pid == node.id) {
				node._hc = true;
			}
			if (this.aNodes.get(n).pid == node.pid) {
				lastId = this.aNodes[n].id;
			}
		}
		if (lastId == node.id) {
			node._ls = true;
		}
	}
	
	// Outputs the tree to the page
	String toString() {
		String str = '<div class="dtree">\n';
		str += this.addNode(this.root);
		if (!this.selectedFound) {
			this.selectedNode = null;
		}
		this.completed = true;
		return str;
	};
}