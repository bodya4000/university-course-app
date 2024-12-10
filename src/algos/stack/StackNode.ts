import StackNodeBuilder from './utills/StackNodeBuilder';

class StackNode {
	private id: number;
	private nodeId: number;
	private value: number;
	private next: StackNode | undefined;

	constructor(id: number, nodeId: number, value: number) {
		this.id = id;
		this.nodeId = nodeId;
		this.value = value;
	}

	getId() {
		return this.id;
	}
	getValue() {
		return this.value;
	}

	getNodeId() {
		return this.nodeId;
	}

	getNext() {
		return this.next;
	}

	setNext(next: StackNode) {
		return (this.next = next);
	}

	static builder() {
		return new StackNodeBuilder();
	}
}

export default StackNode;
