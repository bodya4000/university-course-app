import TreeNode from './TreeNode';
import Branch from './utils/Branch';
import TreeNodeFactory from './utils/TreeNodeFactory';
import { ParentInfo } from './utils/types';

class Tree {
	static idIncrementor = 0;
	private root: TreeNode | null;

	constructor() {
		this.root = TreeNodeFactory.create(500);
		this.add(200);
		this.add(700);
	}

	public add(newNodeValue: number): boolean {
		const parentInfo: ParentInfo | null = this.findParent(newNodeValue);
		const newNode = TreeNodeFactory.create(newNodeValue);

		if (!parentInfo) {
			this.root = newNode;
			return true;
		}

		const { parent, branch } = parentInfo;
		if (branch === Branch.LEFT) {
			parent.setLeftChild(newNode);
		} else if (branch === Branch.RIGHT) {
			parent.setRightChild(newNode);
		}
		newNode.setParent(parent);
		return true;
	}

	private traverse(current: TreeNode | null = this.root, nodeValue: number, traverseTill: ((current: TreeNode) => void) | Function): TreeNode | null {
		if (!current) return null;
		if (traverseTill(current)) return current;
		if (nodeValue > current.getValue()) {
			return this.traverse(current.getRight(), nodeValue, traverseTill);
		} else {
			return this.traverse(current.getLeft(), nodeValue, traverseTill);
		}
	}

	public findParent(nodeValue: number) {
		const parent = this.traverse(this.root, nodeValue, current => {
			return (nodeValue > current.getValue() && !current.getRight()) || (nodeValue <= current.getValue() && !current.getLeft());
		});

		if (parent instanceof TreeNode) {
			return nodeValue > parent.getValue() ? { parent, branch: Branch.RIGHT } : { parent, branch: Branch.LEFT };
		}
		throw new Error('Cant find new parent');
	}

	public findNode(nodeValue: number) {
		const foundNode = this.traverse(this.root, nodeValue, currentNode => currentNode.getValue() == nodeValue);

		if (!foundNode) {
			throw new Error('Node doesnt exists');
		}
		console.log(foundNode);

		return foundNode;
	}

	public getRoot(): TreeNode | null {
		return this.root;
	}

	public delete(value: number): boolean {
		const current = this.findNode(value);
		if (!current) {
			return false;
		}

		const parent = current.getParent();

		// Випадок 1: Вузол не має нащадків
		if (current.hasNoKids()) {
			if (parent) {
				if (current.isLeftChild()) {
					parent.setLeftChild(null);
				} else {
					parent.setRightChild(null);
				}
			} else {
				this.root = null;
			}
			current.setParent(null);
			return true;
		}

		// Випадок 2: Вузол має одного нащадка
		if (current.hasOneKid()) {
			const child = current.getLeft() || current.getRight();
			if (parent) {
				if (current.isLeftChild()) {
					parent.setLeftChild(child);
				} else {
					parent.setRightChild(child);
				}
			} else {
				this.root = child;
			}
			child?.setParent(parent);
			current.setParent(null);
			return true;
		}

		// Випадок 3: Вузол має двох нащадків
		if (current.hasTwoKids()) {
			const successor = current.getRight()?.findTheMostLeftChild();
			if (!successor) {
				console.error('Помилка: successor не знайдено');
				return false;
			}

			current.setValue(successor.getValue());

			const successorParent = successor.getParent();
			const successorChild = successor.getRight();

			if (successor.isLeftChild()) {
				successorParent?.setLeftChild(successorChild);
			} else {
				successorParent?.setRightChild(successorChild);
			}

			successorChild?.setParent(successorParent);

			successor.setParent(null);
			return true;
		}

		return false;
	}
}

export default Tree;
