import { FC } from 'react';
import styles from './BynaryNodeLine.module.scss';

interface Props {
	x: number;
	y: number;
	width: number;
	angle: number;
}

const BynaryNodeLine: FC<Props> = ({ x, y, width, angle }) => {
	return (
		<div
			className={styles.line}
			style={{
				background: 'red',
				left: `${x}px`,
				top: `${y}px`,
				width: `${width}px`,
				transform: `rotate(${angle}rad)`,
			}}
		></div>
	);
};

export default BynaryNodeLine;
