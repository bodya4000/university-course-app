import { FC } from 'react';
import styles from './BynaryTreeNode.module.scss';

interface Props {
	x: number;
	y: number;
	value: string | number;
	isCurrent: boolean;
}

const BynaryTreeNode: FC<Props> = ({ x, y, value, isCurrent }) => {
	return (
		<div
			className={`${styles.node} ${isCurrent ? styles.node__current : ''}`}
			style={{
				left: x,
				top: y,
			}}
		>
			<div>{value}</div>
		</div>
	);
};

export default BynaryTreeNode;
