import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Graph from '../algos/graph/Graph';
import { TarjanResult } from '../algos/graph/types';

interface GraphState {
	graph: Graph;
	steps: TarjanResult[];
	currentStep: number;
	isPaused: boolean;
}

const initialState: GraphState = {
	graph: new Graph(),
	steps: [],
	currentStep: 0,
	isPaused: false,
};

export const treeSlice = createSlice({
	name: 'graph',
	initialState,
	reducers: {
		addEdge(state, action: PayloadAction<[string, string]>) {
			const newGraph = new Graph();
			newGraph.setGraph(state.graph.getGraph());
			newGraph.addEdge(action.payload[0], action.payload[1]);
			state.graph = newGraph;
		},
		deleteEdge(state, action: PayloadAction<[string, string]>) {
			const newGraph = new Graph();
			newGraph.setGraph(state.graph.getGraph());
			newGraph.deleteEdge(action.payload[0], action.payload[1]);
			state.graph = newGraph;
		},
		deleteVertex(state, action: PayloadAction<[string]>) {
			const newGraph = new Graph();
			newGraph.setGraph(state.graph.getGraph());
			newGraph.deleteVertex(action.payload[0]);
			state.graph = newGraph;
		},
		startSearchingScc(state, action: PayloadAction<string>) {
			state.steps = state.graph.findStronglyConnectedComponents(action.payload);
			state.currentStep = 0;
			state.isPaused = false;
		},
		moveNext(state) {
			if (!state.isPaused && state.currentStep < state.steps.length - 1) {
				state.currentStep++;
			}
		},
		moveBack(state) {
			if (state.currentStep > 0) {
				state.currentStep--;
			}
		},
		pause(state) {
			state.isPaused = true;
		},
		resume(state) {
			state.isPaused = false;
		},
	},
});

export const { addEdge, deleteEdge, deleteVertex, startSearchingScc, moveNext, moveBack, pause, resume } = treeSlice.actions;

export default treeSlice.reducer;
