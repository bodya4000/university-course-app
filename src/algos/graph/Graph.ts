import TarjanService from '../../services/TarjanService';
import { AdjacencyList } from './types';

class Graph {
	private graph: AdjacencyList = {};
	private tarjanService: TarjanService;

	constructor() {
		this.tarjanService = new TarjanService();

		this.addEdge('A', 'B');
		this.addEdge('B', 'A');
		this.addEdge('B', 'C');
		this.addEdge('A', 'D');
		this.addEdge('C', 'D');
		this.addEdge('D', 'E');
		this.addEdge('E', 'C');
		this.addEdge('D', 'F');
		this.addEdge('F', 'G');
		this.addEdge('G', 'H');
		this.addEdge('E', 'H');
		this.addEdge('H', 'F');

		console.log(this.tarjanService.doTarjan('D', this.graph));
	}

	setGraph(graph: AdjacencyList) {
		this.graph = graph;
	}

	getGraph() {
		return this.graph;
	}

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

	private vertexExists(vertex: string): boolean {
		return !!this.graph[`${vertex}`];
	}

	public findStronglyConnectedComponents(startVertex: string) {
		return this.tarjanService.doTarjan(startVertex, this.graph);
	}
}

export default Graph;
