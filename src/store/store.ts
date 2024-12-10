import { configureStore } from '@reduxjs/toolkit';
import treeReducer from './bynaryTreeSlice';

export const store = configureStore({
	reducer: {
		tree: treeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
