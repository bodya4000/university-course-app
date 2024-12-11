import TreeNode from '../TreeNode';

class TreeNodeBuilder {
	private _id: number = 0;
	private _value: number | null = null;
	private _parent: TreeNode | null = null;
	private _leftChild: TreeNode | null = null;
	private _rightChild: TreeNode | null = null;

	value(value: number) {
		this._value = value;
		return this;
	}

	parent(value: TreeNode) {
		this._parent = value;
		return this;
	}

	leftChild(value: TreeNode) {
		this._leftChild = value;
		return this;
	}

	rightChild(value: TreeNode) {
		this._rightChild = value;
		return this;
	}

	id(id: number) {
		this._id = id;
		return this;
	}

	build() {
		return new TreeNode(
			this._id,
			this._value,
			this._parent,
			this._leftChild,
			this._rightChild
		);
	}
}

export default TreeNodeBuilder;
