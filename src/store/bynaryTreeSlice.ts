import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Tree from '../algos/bynaryTree/Tree';
import TreeNode from '../algos/bynaryTree/TreeNode';
import Branch from '../algos/bynaryTree/utils/Branch';
import { ParentInfo, ProccessStatuses } from '../algos/bynaryTree/utils/types';
import Stack from '../algos/stack/Stack';
import StackNode from '../algos/stack/StackNode';

export interface AddOptions {
	value: number;
	branch: Branch;
}

interface BynaryTreeState {
	tree: Tree;
	traversePath: Stack<{ nodeId: number; value: number }> | undefined;
	current: StackNode<{ nodeId: number; value: number }> | undefined;
	isTraversing: boolean;
	processingStatus: ProccessStatuses | undefined;
	addOptions: AddOptions | undefined;
}

function calculateTraversePath(node: TreeNode): Stack<{ nodeId: number; value: number }> {
	return node.getPath();
}

function updateCurrentFromPath(state: BynaryTreeState): void {
	if (state.traversePath && state.traversePath.length() >= 1) {
		state.current = state.traversePath.pop();
	} else {
		state.isTraversing = false;
	}
}

function cleanup(state: BynaryTreeState): void {
	state.isTraversing = false;
	state.current = undefined;
	state.addOptions = undefined;
	state.processingStatus = undefined;
}

const initialState: BynaryTreeState = {
	tree: new Tree(),
	traversePath: undefined,
	current: undefined,
	processingStatus: undefined,
	addOptions: undefined,
	isTraversing: false,
};

export const treeSlice = createSlice({
	name: 'tree',
	initialState,
	reducers: {
		addNodeToTree(state, action: PayloadAction<number>) {
			state.tree.add(action.payload);
			cleanup(state as BynaryTreeState);
		},

		deletNodeFromTree(state, action: PayloadAction<number>) {
			state.tree.delete(action.payload);
			console.log(state.tree);

			cleanup(state as BynaryTreeState);
		},

		findTraversePathForNode(state, action: PayloadAction<number>) {
			try {
				state.isTraversing = true;
				const foundNode: TreeNode = state.tree.findNode(action.payload);
				state.traversePath = calculateTraversePath(foundNode);

				updateCurrentFromPath(state as BynaryTreeState);
			} catch (e) {
				state.isTraversing = false;
				console.error('Error finding node:', e);
			}
		},
		findTraversePathForParent(state, action: PayloadAction<number>) {
			try {
				state.isTraversing = true;
				const foundParent: ParentInfo = state.tree.findParent(action.payload);
				console.log(foundParent);
				const { parent, branch }: ParentInfo = foundParent;
				state.traversePath = calculateTraversePath(parent);
				updateCurrentFromPath(state as BynaryTreeState);
				state.addOptions = { value: action.payload, branch };
			} catch (e) {
				state.isTraversing = false;
				console.error('Error finding parent:', e);
			}
		},
		updateCurrent(state) {
			updateCurrentFromPath(state as BynaryTreeState);
		},
		clearCurrent(state) {
			state.current = undefined;
		},

		setProcessingStatus(state, action: PayloadAction<ProccessStatuses>) {
			state.processingStatus = action.payload;
		},
	},
});

export const { addNodeToTree, findTraversePathForNode, findTraversePathForParent, updateCurrent, clearCurrent, setProcessingStatus, deletNodeFromTree } = treeSlice.actions;

export default treeSlice.reducer;
