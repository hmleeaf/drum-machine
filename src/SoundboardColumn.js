import { Stack, Typography } from '@mui/material';
import SoundboardButton from './SoundboardButton';
import { useGlobalContext } from './context';

function SoundboardColumn({barNum}) {
    const { beatsNum, channels } = useGlobalContext();

    return (
        <Stack>
            <Typography sx={{
                paddingBottom: 1, 
            }}>
                Bar {barNum + 1}
            </Typography>
            {channels.map((instrument, instrumentIndex) => (
                <Stack direction="row" key={`btn-row-${barNum}-${instrumentIndex}`}>
                {Array(beatsNum).fill(0).map((beat, beatIndex) => (
                    <SoundboardButton channel={instrumentIndex} bar={barNum} beat={beatIndex} key={`soundBtn-${instrumentIndex}-${barNum}-${beatIndex}`}/>
                ))}
                </Stack>
            ))}
        </Stack>
    );
}

export default SoundboardColumn;