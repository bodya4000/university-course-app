import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const useTree = () => {
	return useSelector((state: RootState) => state.tree);
};

export default useTree;
