import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TreeNode from '../algos/bynaryTree/TreeNode';
import Branch from '../algos/bynaryTree/utils/Branch';
import TreeNodeFactory from '../algos/bynaryTree/utils/TreeNodeFactory';
import {
	addNodeToTree,
	AddOptions,
	clearCurrent,
} from '../store/bynaryTreeSlice';

export interface NewChild {
	node?: TreeNode;
	x?: number;
	y?: number;
}

const useAddChild = (
	isCurrent: boolean,
	isTraversing: boolean,
	addOptions: AddOptions | undefined,
	leftX: number,
	rightX: number,
	childY: number
) => {
	const [newLeftChild, setNewLeftChild] = useState<NewChild | undefined>(
		undefined
	);
	const [newRightChild, setNewRightChild] = useState<NewChild | undefined>(
		undefined
	);

	const [renderingNewChild, setRenderingNewChild] = useState<boolean>(false);

	const dispatch = useDispatch();
	if (isCurrent && !isTraversing && addOptions && !renderingNewChild) {
		console.log('hello');

		dispatch(clearCurrent());
		setRenderingNewChild(true);
		const { value, branch } = addOptions;
		if (branch === Branch.LEFT) {
			setNewLeftChild({
				node: TreeNodeFactory.create(value),
				x: 100,
				y: 100,
			});

			setTimeout(() => {
				setNewLeftChild(prev => ({
					...prev,
					x: leftX,
					y: childY,
				}));

				setTimeout(() => {
					dispatch(addNodeToTree(value));
					setNewLeftChild(undefined);
					setRenderingNewChild(false);
				}, 500);
			}, 500);
		} else if (branch === Branch.RIGHT) {
			setNewRightChild({
				node: TreeNodeFactory.create(value),
				y: 100,
				x: 100,
			});

			setTimeout(() => {
				setNewRightChild(prev => ({
					...prev,
					x: rightX,
					y: childY,
				}));

				setTimeout(() => {
					dispatch(addNodeToTree(value));
					setNewRightChild(undefined);
					setRenderingNewChild(false);
				}, 500);
			}, 500);
		}
	}

	return { newLeftChild, newRightChild };
};

export default useAddChild;
