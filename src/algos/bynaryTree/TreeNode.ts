import Stack from '../stack/Stack';
import TreeNodeBuilder from './utils/TreeNodeBuilder';

class TreeNode {
	private id: number;
	private value: any;
	private parent: TreeNode | null;
	private leftChild: TreeNode | null;
	private rightChild: TreeNode | null;

	constructor(id: number, value: number | null = null, parent: TreeNode | null = null, leftChild: TreeNode | null = null, rightChild: TreeNode | null = null) {
		this.id = id;
		this.value = value;
		this.parent = parent;
		this.leftChild = leftChild;
		this.rightChild = rightChild;
	}

	getId() {
		return this.id;
	}
	getLeft() {
		return this.leftChild;
	}
	getRight() {
		return this.rightChild;
	}
	getParent() {
		return this.parent;
	}
	getValue() {
		return this.value;
	}

	setLeftChild(node: TreeNode | null) {
		this.leftChild = node;
	}
	setRightChild(node: TreeNode | null) {
		this.rightChild = node;
	}
	setParent(node: TreeNode) {
		this.parent = node;
	}

	static builder() {
		return new TreeNodeBuilder();
	}

	calculateLeftGeneretionForRightChild(current: TreeNode | null = this, count: number = 0): number {
		if (!current) return count;
		const leftChild = current.getLeft ? current.getLeft() : null;
		if (!leftChild) return count;
		const leftGenerations = this.calculateLeftGeneretionForRightChild(leftChild, count + 1);
		const rightGenerations = this.calculateRightGeneretionForLeftChild(leftChild);

		return Math.max(leftGenerations, count + rightGenerations + 1);
	}

	calculateRightGeneretionForLeftChild(current: TreeNode | null = this, count: number = 0): number {
		if (!current) return count;
		const rightChild = current.getRight ? current.getRight() : null;
		if (!rightChild) return count;
		const rightGenerations = this.calculateRightGeneretionForLeftChild(rightChild, count + 1);
		const leftGenerations = this.calculateLeftGeneretionForRightChild(rightChild);

		return Math.max(rightGenerations, count + leftGenerations + 1);
	}

	getPath() {
		let stack = new Stack<{ nodeId: number; value: number }>();
		let current: TreeNode | null = this;

		while (current) {
			stack.push({
				nodeId: current.getId(),
				value: current.getValue(),
			});
			current = current.getParent();
		}

		return stack;
	}

	findTheMostLeftChild(current: TreeNode = this): TreeNode {
		const leftChild = current.getLeft();
		if (leftChild) {
			return this.findTheMostLeftChild(leftChild);
		}
		return current;
	}

	isLeftChild() {
		return this.parent?.getLeft() === this;
	}

	hasNoKids(): boolean {
		return !(this.getRight() || this.getLeft());
	}
	hasOneKid(): boolean {
		return (this.getRight() !== null && this.getLeft() === null) || (this.getRight() === null && this.getLeft() !== null);
	}
	hasTwoKids(): boolean {
		return !!(this.getRight() && this.getLeft());
	}

	setValue(value: number) {
		this.value = value;
	}
}

export default TreeNode;
