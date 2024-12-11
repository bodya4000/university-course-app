import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEdge, deleteEdge, deleteVertex as removeVertex } from '../../../../store/graphSlice';
import OptionButton from '../../OptionButon/OptionButton';
import OptionInput from '../../OptionInput/OptionInput';
import styles from './GraphOptions.module.scss';

interface Props {}

const GraphOptions: FC<Props> = ({}) => {
	const dispatch = useDispatch();

	const [addFirstVertex, setAddFirstVertex] = useState<string>('');
	const [addSecondVertex, setAddSecondVertex] = useState<string>('');

	const onAddEdgeClick = () => {
		dispatch(addEdge([addFirstVertex, addSecondVertex]));
		setAddFirstVertex('');
		setAddSecondVertex('');
	};

	const [deleteFirstVertex, setDeleteFirstVertex] = useState<string>('');
	const [deleteSecondVertex, setDeleteSecondVertex] = useState<string>('');

	const onDeleteEdgeClick = () => {
		dispatch(deleteEdge([deleteFirstVertex, deleteSecondVertex]));
		setDeleteFirstVertex('');
		setDeleteSecondVertex('');
	};

	const [deleteVertex, setDeleteVertex] = useState<string>('');
	const onDeleteVertexClick = () => {
		dispatch(removeVertex([deleteVertex]));
		setDeleteVertex('');
	};
	return (
		<div className={styles.options}>
			<div className={styles.option}>
				<OptionInput value={addFirstVertex} onChange={setAddFirstVertex} />
				<OptionInput value={addSecondVertex} onChange={setAddSecondVertex} />
				<OptionButton disabled={false} onclick={onAddEdgeClick} text='Add edge' />
			</div>

			<div className={styles.option}>
				<OptionInput value={deleteFirstVertex} onChange={setDeleteFirstVertex} />
				<OptionInput value={deleteSecondVertex} onChange={setDeleteSecondVertex} />
				<OptionButton disabled={false} onclick={onDeleteEdgeClick} text='Delete edge' />
			</div>

			<div className={styles.option}>
				<OptionInput value={deleteVertex} onChange={setDeleteVertex} />
				<OptionButton disabled={false} onclick={onDeleteVertexClick} text='Delete vertex' />
			</div>
		</div>
	);
};

export default GraphOptions;
