import { configureStore } from '@reduxjs/toolkit';
import treeReducer from './bynaryTreeSlice';
import graphReducer from './graphSlice';

export const store = configureStore({
	reducer: {
		tree: treeReducer,
		graph: graphReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
