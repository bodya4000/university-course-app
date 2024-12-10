import { FC, ReactNode } from 'react';
import styles from './Wrapper.module.scss';

interface Props {
	children: ReactNode;
}

const Wrapper: FC<Props> = ({ children }) => {
	return <div className={styles.wrapper}>{children}</div>;
};

export default Wrapper;
