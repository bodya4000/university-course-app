import StackNode from '../StackNode';

class StackNodeFactory {
	static idIncrementor = 0;

	static create(nodeId: number, nodeValue: number) {
		return StackNode.builder()
			.value(nodeValue)
			.nodeId(nodeId)
			.id(++this.idIncrementor)
			.build();
	}
}

export default StackNodeFactory;
