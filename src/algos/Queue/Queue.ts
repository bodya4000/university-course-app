import QueueNode from './QueueNode';

class Queue<T> {
	private head: QueueNode<T> | null = null;
	private tail: QueueNode<T> | null = null;
	private length: number = 0;

	enqueue(value: T) {
		const node = new QueueNode<T>(value);

		if (this.head && this.tail) {
			this.tail.setNext(node);
			this.tail = node;
		} else {
			this.head = node;
			this.tail = node;

			this.length++;
		}
	}

	dequeue() {
		if (this.head && this.tail) {
			const current = this.head;
			this.head = this.head.getNext();
			this.length--;

			return current.getValue();
		}
		return null;
	}

	getLength() {
		return this.length;
	}

	isEmpty() {
		return this.length == 0;
	}

	list() {
		let result = [];
		let current = this.head;

		while (current) {
			result.push(current.getValue());
			current = current.getNext();
		}
		return result;
	}
}

export default Queue;
