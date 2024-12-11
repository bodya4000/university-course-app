import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import BaseButton from '../BaseButton/BaseButton';
import styles from './ContentView.module.scss';

interface Props {
	to: string;
	text: string;
}

const ContentView: FC<Props> = ({ text, to }) => {
	const history = useHistory();

	const onClick = () => {
		history.push(to);
	};
	return (
		<div onClick={onClick} className={styles.view}>
			<h2>{text}</h2>
			<BaseButton disabled={false} text='start' onclick={onClick} />
		</div>
	);
};

export default ContentView;
