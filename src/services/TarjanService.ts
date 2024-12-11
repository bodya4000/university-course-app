import { AdjacencyList, TarjanResult } from '../algos/graph/types';
import Stack from '../algos/stack/Stack';

class TarjanService {
	private stack = new Stack<string>();
	private inStack = new Set<string>();
	private lowLinks: { [key: string]: number } = {};
	private ids: { [key: string]: number } = {};
	private result: string[][] = [];
	private idCounter = 0;
	private steps: TarjanResult[] = [];
	private stepNumber = 0;

	public doTarjan(startVertex: string, graph: AdjacencyList): TarjanResult[] {
		this.cleanup();
		this.findSccByDfs(startVertex, graph);

		for (const vertex in graph) {
			if (!(vertex in this.ids)) {
				this.findSccByDfs(vertex, graph);
			}
		}

		return this.steps;
	}

	private findSccByDfs(vertex: string, graph: AdjacencyList) {
		this.stack.push(vertex);
		this.inStack.add(vertex);
		this.ids[vertex] = this.lowLinks[vertex] = this.idCounter++;

		this.recordStep(vertex, 'visit');

		for (const neighbour of graph[vertex]) {
			if (!(neighbour in this.ids)) {
				this.findSccByDfs(neighbour, graph);
				this.lowLinks[vertex] = Math.min(this.lowLinks[vertex], this.lowLinks[neighbour]);
			} else if (this.inStack.has(neighbour)) {
				this.lowLinks[vertex] = Math.min(this.lowLinks[vertex], this.lowLinks[neighbour]);
			}

			this.recordStep(vertex, `process neighbour ${neighbour}`);
		}

		if (this.ids[vertex] === this.lowLinks[vertex]) {
			const scc: string[] = [];
			while (true) {
				const node = this.stack.pop()?.getData();
				if (!node) break;
				this.inStack.delete(node);
				scc.push(node);
				if (node === vertex) break;
			}
			this.result.push(scc);
			this.recordStep(vertex, 'found strongly connected component');
		}
	}

	private recordStep(currentVertex: string, action: string) {
		this.steps.push({
			stepNumber: this.stepNumber++,
			currentVertex,
			stack: [...this.stack.list()],
			inStack: [...this.inStack],
			ids: { ...this.ids },
			lowLinks: { ...this.lowLinks },
			stronglyConnectedComponents: [...this.result],
			action,
		});
	}

	private cleanup() {
		this.stack = new Stack<string>();
		this.inStack.clear();
		this.lowLinks = {};
		this.ids = {};
		this.result = [];
		this.idCounter = 0;
		this.steps = [];
		this.stepNumber = 0;
	}
}

export default TarjanService;
