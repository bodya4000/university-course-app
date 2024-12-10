import StackNode from './StackNode';
import StackNodeFactory from './utills/StackNodeFactory';

class Stack {
	private root: StackNode | undefined;

	push(nodeId: number, value: number): void {
		const newNode = StackNodeFactory.create(nodeId, value);
		if (this.root === undefined) {
			this.root = newNode;
		} else {
			newNode.setNext(this.root);
			this.root = newNode;
		}
	}

	pop(): StackNode | undefined {
		if (this.root === undefined) {
			return undefined;
		}
		const poppedNode = this.root;
		this.root = this.root.getNext();
		return poppedNode;
	}

	isEmpty(): boolean {
		return this.root === undefined;
	}

	peek(): StackNode | undefined {
		return this.root;
	}

	length(): number {
		let result: number = 0;
		let currentNode = this.root;

		while (currentNode) {
			result += 1;
			currentNode = currentNode.getNext();
		}
		return result;
	}

	list(): StackNode[] {
		const result: StackNode[] = [];
		let currentNode = this.root;

		while (currentNode) {
			result.push(currentNode);
			currentNode = currentNode.getNext();
		}
		return result;
	}
}

export default Stack;
