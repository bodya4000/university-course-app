import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContentView.module.scss';

interface Props {
	to: string;
	text: string;
}

const ContentView: FC<Props> = ({ text, to }) => {
	const navigate = useNavigate();
	const onClick = () => {
		navigate(to);
	};
	return (
		<div onClick={onClick} className={styles.view}>
			{text}
		</div>
	);
};

export default ContentView;
