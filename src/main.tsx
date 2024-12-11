import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Layout from './components/screens/Layout';
import { store } from './store/store';

ReactDOM.render(
	<Provider store={store}>
		<Layout />
	</Provider>,
	document.getElementById('root')
);
