import { FC, useEffect } from 'react';
import { Graph as LibraryGraph } from 'react-d3-graph';
import { useDispatch } from 'react-redux';
import useGraph from '../../../../hooks/useGraph';
import GraphService from '../../../../services/GraphService';
import { moveNext } from '../../../../store/graphSlice';
import styles from './GraphView.module.scss';

interface Props {}

const GraphView: FC<Props> = ({}) => {
	const { graph, steps, currentStep, isPaused } = useGraph();

	const data = GraphService.transform(graph.getGraph());
	const dispatch = useDispatch();
	useEffect(() => {
		if (!isPaused && steps.length > 0) {
			const timer = setTimeout(() => {
				dispatch(moveNext());
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [currentStep, isPaused, steps.length, dispatch]);

	const graphData = {
		nodes: data.node.map(node => {
			const isVisited = steps[currentStep]?.ids[node.id] !== undefined;
			const isInScc = steps[currentStep]?.stronglyConnectedComponents.some((scc: string[]) => scc.includes(node.id));
			return {
				...node,
				color: isInScc ? 'green' : isVisited ? 'blue' : 'red',
			};
		}),
		links: data.links.map(link => {
			const isVisited = steps.slice(0, currentStep + 1).some(step => step.ids[link.source] !== undefined && step.ids[link.target] !== undefined);
			const isInScc = steps[currentStep]?.stronglyConnectedComponents.some((scc: string[]) => scc.includes(link.source) && scc.includes(link.target));
			return {
				...link,
				color: isInScc ? 'green' : isVisited ? 'blue' : 'black',
			};
		}),
	};

	const myConfig = {
		height: 500,
		width: 1500,
		directed: true,
		nodeHighlightBehavior: true,
		staticGraph: true,
		node: {
			highlightStrokeColor: 'blue',
			labelPosition: 'center',
			size: 500,
			fontColor: 'white',
			fontSize: 16,
		},
		link: {
			highlightColor: 'blue',
			color: 'black',
		},
	};

	return (
		<div className={styles.view}>
			<LibraryGraph id='graph-id' data={graphData} config={myConfig} />;
		</div>
	);
};

export default GraphView;
