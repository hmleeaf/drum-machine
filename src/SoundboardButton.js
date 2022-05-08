import { ToggleButton } from '@mui/material';
import { useGlobalContext } from './context';

const SoundboardButton = ({ channel, bar, beat }) => {
	const { toggleNote, notes, playing, activeBar, activeBeat } =
		useGlobalContext();
	const active = activeBar === bar && activeBeat === beat;

	return (
		<ToggleButton
			value='notes'
			selected={notes[channel][bar][beat] || (active && playing)}
			color={active && playing ? 'secondary' : 'standard'}
			key={`btn-${bar}-${beat}-${channel}`}
			sx={{
				minHeight: 40,
				maxHeight: 40,
				minWidth: 40,
				maxWidth: 40,
				marginBottom: 0.5,
				marginRight: 0.5,
			}}
			onChange={() => {
				toggleNote(channel, bar, beat);
			}}
		></ToggleButton>
	);
};

export default SoundboardButton;
