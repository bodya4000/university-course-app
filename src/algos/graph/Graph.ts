import Stack from '../stack/Stack';
import { AdjacencyList } from './types';

class Graph {
	private graph: AdjacencyList = {};

	addVertex(vertex: string) {
		this.graph[vertex] = [];
	}

	addEdge(fromVertex: string, toVertex: string): void {
		if (!this.vertexExists(fromVertex)) this.addVertex(fromVertex);
		if (!this.vertexExists(toVertex)) this.addVertex(toVertex);

		if (this.graph[fromVertex].includes(toVertex)) return;
		this.graph[fromVertex].push(toVertex);
	}

	deleteVertex(vertexToDelete: string): void {
		if (!this.vertexExists(vertexToDelete)) throw new Error(`No vertex ${vertexToDelete}`);

		for (const vertex of Object.keys(this.graph)) {
			this.graph[vertex] = this.graph[vertex].filter(v => v !== vertexToDelete);
		}

		delete this.graph[vertexToDelete];
	}

	deleteEdge(fromVertex: string, toVertex: string): void {
		if (!this.vertexExists(fromVertex)) throw new Error(`No vertex ${fromVertex}`);
		if (!this.vertexExists(toVertex)) throw new Error(`No vertex ${toVertex}`);

		this.graph[fromVertex] = this.graph[fromVertex].filter(vertex => vertex != toVertex);
	}

	// tarjan(): string[][] {
	// 	return [[]];
	// }

	private vertexExists(vertex: string): boolean {
		return !!this.graph[`${vertex}`];
	}

	public tarjan(startVertex: string) {
		let idCounter = 0;
		let stack = new Stack();
		let visited = new Set();
		let lowLinks = [];

		let current = this.graph[startVertex];

		for (const vertex in current) {
			if (vertex in visited) continue;
		}
	}
}

export default Graph;
