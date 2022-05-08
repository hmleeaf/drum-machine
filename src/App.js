import { Stack, Typography } from '@mui/material';
import { FaDrum } from 'react-icons/fa';
import { useGlobalContext } from './context';
import MainContainer from './MainContainer';
import DrumsPlayer from './DrumsPlayer';

function App() {
	const { loading } = useGlobalContext();
	if (loading) {
		return (
			<Typography
				variant='h1'
				align='center'
				sx={{
					margin: 10,
				}}
			>
				Initializing...
			</Typography>
		);
	}
	return (
		<>
			<DrumsPlayer></DrumsPlayer>
			<Stack
				direction='row'
				align='center'
				justifyContent='center'
				alignItems='center'
				sx={{
					marginY: 4,
				}}
			>
				<FaDrum />
				<Typography
					variant='h2'
					sx={{
						marginX: 4,
					}}
				>
					Drum Machine
				</Typography>
				<FaDrum />
			</Stack>
			<MainContainer />
		</>
	);
}

export default App;
