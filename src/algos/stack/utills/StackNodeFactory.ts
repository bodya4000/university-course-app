import StackNode from '../StackNode';

class StackNodeFactory {
	private static idIncrementor = 0;

	static create<T>(data: T): StackNode<T> {
		return new StackNode(StackNodeFactory.idIncrementor++, data);
	}
}

export default StackNodeFactory;
