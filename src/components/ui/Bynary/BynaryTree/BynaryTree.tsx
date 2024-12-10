import { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import TreeNode from '../../../../algos/bynaryTree/TreeNode';
import { ProccessStatuses } from '../../../../algos/bynaryTree/utils/types';
import useAddChild, { NewChild } from '../../../../hooks/useAddChild';
import useNode from '../../../../hooks/useNode';
import useTree from '../../../../hooks/useTree';
import useUpdateCurrent from '../../../../hooks/useUpdateCurrent';
import { deletNodeFromTree } from '../../../../store/bynaryTreeSlice';
import BynaryNodeLine from '../BynaryNodeLine/BynaryNodeLine';
import BynaryTreeNode from '../BynaryTreeNode/BynaryTreeNode';
import styles from './BynaryTree.module.scss';

interface Props {
	data: TreeNode;
	x: number;
	y: number;
	levelDistance?: number;
	siblingDistance?: number;
}

const BynaryTree: FC<Props> = ({ data, x, y, levelDistance = 60, siblingDistance = 40 }) => {
	const { leftChild, rightChild, leftX, rightX, childY, leftLine, rightLine } = useNode({ data, x, y, levelDistance, siblingDistance });
	const { current, isTraversing, addOptions, processingStatus } = useTree();
	const isCurrent = useMemo(() => current?.getData().nodeId === data.getId(), [current, data]);
	useUpdateCurrent(isCurrent);
	const { newLeftChild, newRightChild } = useAddChild(isCurrent, isTraversing, addOptions, leftX, rightX, childY);

	const renderNewChild = (child: NewChild | undefined) => child?.node && <BynaryTree data={child.node} x={child.x ?? 0} y={child.y ?? 0} />;

	const renderTreeNodeChild = (child: TreeNode | null, childX: number, childY: number) => child && <BynaryTree data={child} x={childX} y={childY} />;

	const dispatch = useDispatch();
	if (isCurrent && !isTraversing && processingStatus == ProccessStatuses.DELETE) {
		setTimeout(() => dispatch(deletNodeFromTree(data.getValue())), 500);
	}

	return (
		<div>
			<BynaryTreeNode isCurrent={isCurrent} x={x - 20} y={y - 15} value={data.getValue()} />

			<div className={styles.lines}>
				{leftLine && <BynaryNodeLine x={leftLine.x} y={leftLine.y} width={leftLine.width} angle={leftLine.angle} />}
				{rightLine && <BynaryNodeLine x={rightLine.x} y={rightLine.y} width={rightLine.width} angle={rightLine.angle} />}
			</div>

			<div className={styles.children}>
				{renderTreeNodeChild(leftChild, leftX, childY)}
				{renderTreeNodeChild(rightChild, rightX, childY)}

				{renderNewChild(newLeftChild)}
				{renderNewChild(newRightChild)}
			</div>
		</div>
	);
};

export default BynaryTree;
