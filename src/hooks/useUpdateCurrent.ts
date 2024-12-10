import { useDispatch } from 'react-redux';
import { updateCurrent } from '../store/bynaryTreeSlice';

const useUpdateCurrent = (isCurrent: boolean) => {
	const dispatch = useDispatch();
	if (isCurrent) {
		setTimeout(() => {
			dispatch(updateCurrent());
		}, 500);
	}
};

export default useUpdateCurrent;
