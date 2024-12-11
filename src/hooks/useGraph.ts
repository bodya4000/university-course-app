import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const useGraph = () => {
	return useSelector((state: RootState) => state.graph);
};

export default useGraph;
