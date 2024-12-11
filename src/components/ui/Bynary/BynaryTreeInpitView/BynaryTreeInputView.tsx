import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProccessStatuses } from '../../../../algos/bynaryTree/utils/types';
import {
	findTraversePathForNode,
	findTraversePathForParent,
	setProcessingStatus,
} from '../../../../store/bynaryTreeSlice';
import styles from './BynaryTreeInputView.module.scss';

interface Props {}

const BynaryTreeInputView: FC<Props> = ({}) => {
	const dispatch = useDispatch();
	const [find, setFind] = useState<string>('');
	const [add, setAdd] = useState<string>('');
	const [del, setDel] = useState<string>('');

	const onFindClick = () => {
		if (find) {
			dispatch(findTraversePathForNode(Number(find)));
			dispatch(setProcessingStatus(ProccessStatuses.FIND));
			setFind('');
		}
	};

	const onAddClick = () => {
		if (add) {
			dispatch(findTraversePathForParent(Number(add)));
			dispatch(setProcessingStatus(ProccessStatuses.ADD));
			setAdd('');
		}
	};

	const onDeleteClick = () => {
		if (del) {
			dispatch(findTraversePathForNode(Number(del)));
			dispatch(setProcessingStatus(ProccessStatuses.DELETE));
			setDel('');
		}
	};

	const handleFindChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		(Number(value) || value == '') && setFind(value);
	};

	const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		(Number(value) || value == '') && setAdd(value);
	};

	const handleDelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		(Number(value) || value == '') && setDel(value);
	};

	return (
		<div className={styles.input_view}>
			<div className={styles.input_find}>
				<label htmlFor='find'>
					<button onClick={onFindClick}>Find</button>
				</label>
				<input
					type='text'
					name='find'
					id='find'
					value={find}
					onChange={handleFindChange}
				/>
			</div>

			<div className={styles.input_delete}>
				<label htmlFor='delete'>
					<button onClick={onDeleteClick}>Delete</button>
				</label>
				<input
					type='number'
					onChange={handleDelChange}
					value={del}
					name='delete'
					id='delete'
				/>
			</div>

			<div className={styles.input_add}>
				<label htmlFor='add'>
					<button onClick={onAddClick}>Add</button>
				</label>
				<input
					type='number'
					name='add'
					id='add'
					value={add}
					onChange={handleAddChange}
				/>
			</div>
		</div>
	);
};

export default BynaryTreeInputView;
