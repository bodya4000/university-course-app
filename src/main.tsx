import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/screens/Home.tsx';
import Tree from './components/screens/Tree.tsx';
import { store } from './store/store.ts';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <>error</>,
	},
	{
		path: '/tree',
		element: <Tree />,
	},
	{
		path: '/graph',
		element: <Tree />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
