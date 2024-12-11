class QueueNode<T> {
	private value: T;
	private next: QueueNode<T> | null;

	constructor(value: T) {
		this.value = value;
		this.next = null;
	}

	getValue() {
		return this.value;
	}

	getNext() {
		return this.next;
	}

	setNext(next: QueueNode<T>) {
		this.next = next;
	}
}

export default QueueNode;
