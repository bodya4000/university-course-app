import TreeNode from '../TreeNode';

class TreeNodeFactory {
	static _id: number = 0;
	static create(newNodevalue: number) {
		return TreeNode.builder()
			.value(newNodevalue)
			.id(++TreeNodeFactory._id)
			.build();
	}
}

export default TreeNodeFactory;
