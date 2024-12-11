export interface AdjacencyList {
	[vertex: string]: string[];
}

export interface TarjanResult {
	stepNumber: number;
	currentVertex: string;
	stack: string[];
	inStack: string[];
	ids: { [key: string]: number };
	lowLinks: { [key: string]: number };
	stronglyConnectedComponents: string[][];
	action: string;
}
