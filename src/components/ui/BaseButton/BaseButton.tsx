import { FC } from 'react';
import styles from './BaseButton.module.scss';

interface Props {
	text: string;
	disabled: boolean;
	onclick: () => void;
}

const BaseButton: FC<Props> = ({ text, onclick, disabled }) => {
	return (
		<button style={{ opacity: disabled ? 0.3 : 1 }} className={styles.btn} disabled={disabled} onClick={onclick}>
			{text}
		</button>
	);
};

export default BaseButton;
