import StackNode from './StackNode';
import StackNodeFactory from './utills/StackNodeFactory';

class Stack<T> {
	private root: StackNode<T> | undefined;

	push(data: T): void {
		const newNode = StackNodeFactory.create(data);
		if (!this.root) {
			this.root = newNode;
		} else {
			newNode.setNext(this.root);
			this.root = newNode;
		}
	}

	pop(): StackNode<T> | undefined {
		if (!this.root) {
			return undefined;
		}
		const poppedNode = this.root;
		this.root = this.root.getNext();
		return poppedNode;
	}

	isEmpty(): boolean {
		return this.root === undefined;
	}

	peek(): StackNode<T> | undefined {
		return this.root;
	}

	length(): number {
		let count = 0;
		let currentNode = this.root;

		while (currentNode) {
			count++;
			currentNode = currentNode.getNext();
		}
		return count;
	}

	list(): T[] {
		const result: T[] = [];
		let currentNode = this.root;

		while (currentNode) {
			result.push(currentNode.getData());
			currentNode = currentNode.getNext();
		}
		return result;
	}
}

export default Stack;
