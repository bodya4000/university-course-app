import { FC } from 'react';
import useTree from '../../hooks/useTree';
import BynaryTree from '../ui/Bynary/BynaryTree/BynaryTree';
import BynaryTreeInputView from '../ui/Bynary/BynaryTreeInpitView/BynaryTreeInputView';

interface Props {}

const Tree: FC<Props> = ({}) => {
	const { tree } = useTree();
	return (
		<>
			<div
				style={{
					position: 'relative',
					width: '100vw',
					minHeight: '60vh',
				}}
			>
				{tree.getRoot() && (
					<BynaryTree data={tree.getRoot()!} x={window.innerWidth / 2} y={50} />
				)}
			</div>

			<BynaryTreeInputView />
		</>
	);
};

export default Tree;
