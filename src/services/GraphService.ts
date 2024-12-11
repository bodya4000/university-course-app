import { AdjacencyList } from '../algos/graph/types';

interface GraphNode {
	id: string;
	color?: string;
	size?: number;
	x?: number;
	y?: number;
}

interface GraphLink {
	source: string;
	target: string;
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

interface GraphLibrary {
	node: GraphNode[];
	links: GraphLink[];
}

class GraphService {
	private static xBase = 10;
	private static yBase = 0;
	private static xCount = 1;
	private static yCount = 1;

	private generateNodeCoordinates(): { x: number; y: number } {
		GraphService.xCount++;
		GraphService.yCount++;

		return {
			x: 100 * (GraphService.xCount % 2 === 0 ? GraphService.xCount + 1 : GraphService.xCount) - 100,
			y: (GraphService.yCount % 2 === 0 ? 100 : 200) + GraphService.yBase,
		};
	}

	public transform(graph: AdjacencyList): GraphLibrary {
		GraphService.xCount = 1;
		GraphService.yCount = 1;
		const data: GraphLibrary = {
			node: [],
			links: [],
		};

		const nodeCoordinates: Record<string, { x: number; y: number }> = {};
		const totalNodes = Object.keys(graph).length;

		let index = 0;
		for (const source of Object.keys(graph)) {
			const coordinates = this.generateNodeCoordinates();
			nodeCoordinates[source] = coordinates;
			data.node.push({
				id: source,
				...coordinates,
			});
			index++;
		}

		for (const [source, targets] of Object.entries(graph)) {
			for (const target of targets) {
				if (nodeCoordinates[source] && nodeCoordinates[target]) {
					data.links.push({
						source,
						target,
						x1: nodeCoordinates[source].x,
						y1: nodeCoordinates[source].y,
						x2: nodeCoordinates[target].x,
						y2: nodeCoordinates[target].y,
					});
				}
			}
		}

		return data;
	}
}

export default new GraphService();
