import { FC } from 'react';
import styles from './OptionButton.module.scss';

interface Props {
	text: string;
	disabled: boolean;
	onclick: () => void;
}

const OptionButton: FC<Props> = ({ text, onclick, disabled }) => {
	return (
		<button className={styles.btn} disabled={disabled} onClick={onclick}>
			{text}
		</button>
	);
};

export default OptionButton;
