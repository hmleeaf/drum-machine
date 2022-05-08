import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { FaPlay, FaStop } from 'react-icons/fa';
import { useGlobalContext } from './context';

function SettingButton({ type }) {
	const {
		playing,
		togglePlaying,
		activeTab,
		tabNotEmpty,
		switchTab,
		startDemo,
	} = useGlobalContext();
	const [playDisabled, setPlayDisabled] = useState(false);

	useEffect(() => {
		setPlayDisabled(true);
		const timeout = setTimeout(() => {
			setPlayDisabled(false);
		}, 100);
		return () => {
			clearTimeout(timeout);
		};
	}, [playing]);

	if (type === 'PLAY') {
		return (
			<Button
				variant='contained'
				sx={{
					paddingY: 3,
					paddingX: 5,
					fontSize: 18,
				}}
				onClick={togglePlaying}
				disabled={playDisabled}
				color={playing ? 'error' : 'success'}
			>
				{playing ? <FaStop /> : <FaPlay />}
			</Button>
		);
	}
	if (type === 'TABS') {
		return (
			<ButtonGroup variant='outlined'>
				{tabNotEmpty.map((tabNotEmpty, tabIdx) => (
					<Button
						color={tabIdx === activeTab ? 'secondary' : 'primary'}
						variant={
							tabIdx === activeTab || tabNotEmpty ? 'contained' : 'outlined'
						}
						onClick={() => {
							switchTab(tabIdx);
						}}
						key={`btn-tab-${tabIdx}`}
					>
						{tabIdx + 1}
					</Button>
				))}
			</ButtonGroup>
		);
	}
	if (type === 'DEMO') {
		return (
			<Button variant='contained' onClick={startDemo}>
				demo
			</Button>
		);
	}
}

export default SettingButton;
