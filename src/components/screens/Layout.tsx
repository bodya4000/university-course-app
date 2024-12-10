import { Outlet } from 'react-router-dom';

const Layout = ({}) => {
	return (
		<>
			<header>header</header>
			<main id='detail'>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
