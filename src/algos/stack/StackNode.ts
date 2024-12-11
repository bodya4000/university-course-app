class StackNode<T> {
	private id: number;
	private data: T;
	private next: StackNode<T> | undefined;

	constructor(id: number, data: T) {
		this.id = id;
		this.data = data;
	}

	getId(): number {
		return this.id;
	}

	getData(): T {
		return this.data;
	}

	getNext(): StackNode<T> | undefined {
		return this.next;
	}

	setNext(next: StackNode<T>): void {
		this.next = next;
	}
}

export default StackNode;
