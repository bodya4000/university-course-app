import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Graph from './Graph';
import Home from './Home';
import Tree from './Tree';

const Layout = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/tree' component={Tree} />
				<Route path='/graph' component={Graph} />
				<Route render={() => <>error</>} />
			</Switch>
		</Router>
	);
};

export default Layout;
