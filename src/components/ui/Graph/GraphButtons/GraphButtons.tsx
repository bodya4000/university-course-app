import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { moveBack, pause, resume, startSearchingScc } from '../../../../store/graphSlice';
import BaseButton from '../../BaseButton/BaseButton';
import BaseInput from '../../BaseInput/BaseInput';
import styles from './GraphButtons.module.scss';

interface Props {}

const GraphButtons: FC<Props> = ({}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { isPaused, currentStep, steps } = useSelector((state: any) => state.graph);
	const [startVertex, setStartVertex] = useState<string>('');

	const onStart = () => {
		if (startVertex.trim() === '') {
			alert('Please choose a start vertex.');
			return;
		}
		dispatch(startSearchingScc(startVertex));
	};

	const onPause = () => {
		dispatch(pause());
	};

	const onResume = () => {
		dispatch(resume());
	};

	const onStepBack = () => {
		dispatch(moveBack());
	};

	const onGoBack = () => {
		history.push('/');
	};

	return (
		<div className={styles.btns}>
			<div style={{ display: 'flex', gap: 10 }}>
				<BaseInput value={startVertex} onChange={setStartVertex} />
				<BaseButton text='Start' disabled={false} onclick={onStart} />
			</div>
			<BaseButton text='Pause' disabled={isPaused || steps.length === 0} onclick={onPause} />
			<BaseButton text='Resume' disabled={!isPaused} onclick={onResume} />
			<BaseButton text='Step Back' disabled={currentStep === 0} onclick={onStepBack} />
			<BaseButton text='Go Back' disabled={false} onclick={onGoBack} />
		</div>
	);
};

export default GraphButtons;
