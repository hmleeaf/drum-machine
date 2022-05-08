import { Divider, Stack, Paper } from '@mui/material';
import SettingContainer from './SettingContainer';
import Soundboard from './Soundboard';

function MainContainer() {
	return (
		<Paper
			sx={{
				maxWidth: 1500,
				mx: 'auto',
				paddingX: 20,
				paddingY: 4,
			}}
			elevation={4}
		>
			<Stack>
				<SettingContainer />
				<Divider
					sx={{
						marginY: 5,
					}}
				/>
				<Soundboard />
			</Stack>
		</Paper>
	);
}

export default MainContainer;
