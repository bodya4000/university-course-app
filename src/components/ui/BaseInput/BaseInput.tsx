import React, { FC } from 'react';
import styles from './BaseInput.module.scss';

interface Props {
	value: string;
	onChange: (str: string) => void;
}

const BaseInput: FC<Props> = ({ value, onChange }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value.toUpperCase();
		onChange(newValue);
	};

	return (
		<div className={styles.box}>
			<input className={styles.input} type='text' value={value} onChange={handleChange} />
		</div>
	);
};

export default BaseInput;
