import { FC } from 'react';
import useGraph from '../../hooks/useGraph';
import GraphAdjencyList from '../ui/Graph/GraphAdjencyList/GraphAdjencyList';
import GraphButtons from '../ui/Graph/GraphButtons/GraphButtons';
import GraphOptions from '../ui/Graph/GraphOptions/GraphOptions';
import GraphView from '../ui/Graph/GraphView/GraphView';

interface Props {}

const Graph: FC<Props> = ({}) => {
	const { graph } = useGraph();
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				gap: '20px',
			}}
		>
			<GraphView />
			<GraphButtons />
			<GraphOptions />
			<GraphAdjencyList graph={graph.getGraph()} />
		</div>
	);
};

export default Graph;
