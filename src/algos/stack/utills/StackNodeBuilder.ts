import StackNode from '../StackNode';

class StackNodeBuilder {
	private _nodeId: number = 0;
	private _value: number = 0;
	private _id: number = 0;

	id(id: number) {
		this._id = id;
		return this;
	}

	value(value: number) {
		this._value = value;
		return this;
	}

	nodeId(nodeId: number) {
		this._nodeId = nodeId;
		return this;
	}

	build() {
		return new StackNode(this._id, this._nodeId, this._value);
	}
}

export default StackNodeBuilder;
