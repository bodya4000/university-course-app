import { FC } from 'react';
import { AdjacencyList } from '../../../../algos/graph/types';
import styles from './GraphAdjencyList.module.scss';

interface Props {
	graph: AdjacencyList;
}

const GraphAdjencyList: FC<Props> = ({ graph }) => {
	const isEmpty = (obj: object): boolean => Object.keys(obj).length === 0;

	return (
		<div className={styles.container}>
			{!isEmpty(graph) && <h2 style={{ textAlign: 'center' }}>Adjency List</h2>}

			{Object.entries(graph).map(([source, targets]) => {
				return (
					<div className={styles.row}>
						<div className={`${styles.source} ${styles.block}`}>{source}:</div>
						<div className={styles.targets}>
							{targets.map(target => {
								return <div className={`${styles.target} ${styles.block}`}>{target}</div>;
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default GraphAdjencyList;
