import Container from '../ui/Container/Container';
import ContentView from '../ui/ContenView/ContentView';
import Wrapper from '../ui/Wrapper/Wrapper';

function Home() {
	return (
		<Container>
			<Wrapper>
				<ContentView to='/tree' text='Бінарне дерево' />
				<ContentView to='/graph' text='Граф' />
			</Wrapper>
		</Container>
	);
}

export default Home;
