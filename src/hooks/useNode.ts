import TreeNode from '../algos/bynaryTree/TreeNode';

interface UseBynaryTreeProps {
	data: TreeNode;
	x: number;
	y: number;
	levelDistance: number;
	siblingDistance: number;
}

interface UseBynaryTreeResult {
	leftChild: TreeNode | null;
	rightChild: TreeNode | null;
	leftX: number;
	rightX: number;
	childY: number;
	leftLine: {
		x: number;
		y: number;
		width: number;
		angle: number;
	} | null;
	rightLine: {
		x: number;
		y: number;
		width: number;
		angle: number;
	} | null;
}

const useNode = ({
	data,
	x,
	y,
	levelDistance,
	siblingDistance,
}: UseBynaryTreeProps): UseBynaryTreeResult => {
	const leftChild = data.getLeft();
	const rightChild = data.getRight();

	const leftDepth = leftChild
		? leftChild.calculateRightGeneretionForLeftChild()
		: 0;
	const rightDepth = rightChild
		? rightChild.calculateLeftGeneretionForRightChild()
		: 0;

	const maxDepth = Math.max(leftDepth, rightDepth);

	const leftStretchFactor = leftDepth > 0 ? leftDepth / maxDepth : 0;
	const rightStretchFactor = rightDepth > 0 ? rightDepth / maxDepth : 0;

	const adjustedLevelDistance = levelDistance * (1 + maxDepth * 0.01);
	const adjustedLeftSiblingDistance = siblingDistance * (1 + leftStretchFactor);
	const adjustedRightSiblingDistance =
		siblingDistance * (1 + rightStretchFactor);

	const leftX = x - adjustedLeftSiblingDistance * (leftDepth + 1) * 0.5;
	const rightX = x + adjustedRightSiblingDistance * (rightDepth + 1) * 0.5;

	const childY = y + adjustedLevelDistance;

	const leftLine = leftChild
		? {
				x: x,
				y: y,
				width: Math.sqrt(
					Math.pow(leftX - x, 2) + Math.pow(adjustedLevelDistance, 2)
				),
				angle: Math.atan2(adjustedLevelDistance, leftX - x),
		  }
		: null;

	const rightLine = rightChild
		? {
				x: x,
				y: y,
				width: Math.sqrt(
					Math.pow(rightX - x, 2) + Math.pow(adjustedLevelDistance, 2)
				),
				angle: Math.atan2(adjustedLevelDistance, rightX - x),
		  }
		: null;

	return {
		leftChild,
		rightChild,
		leftX,
		rightX,
		childY,
		leftLine,
		rightLine,
	};
};

export default useNode;
