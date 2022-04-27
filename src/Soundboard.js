import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider'; 
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SoundboardColumn from './SoundboardColumn';
import instruments from './instruments';
import { useGlobalContext } from './context';
import VolumeSlider from './VolumeSlider';

function Soundboard() {
    const { barsNum, channels, changeInstrument } = useGlobalContext();

    return (
        <Stack direction="row">
            <Container>
                <Stack>
                    <Typography 
                        sx={{
                            paddingBottom: 1, 
                        }}
                    >
                        Instruments:    
                    </Typography>
                    {channels.map((channel, channelIndex) => (
                        <Stack direction="row" spacing={2} alignItems="center" key={`channel-stack-${channelIndex}`}>
                            <TextField 
                                id={`instrument-input-${channelIndex}`}
                                select
                                size="small"
                                sx={{
                                    minWidth: 200, 
                                    minHeight: 40, 
                                    maxHeight: 40, 
                                    marginBottom: 0.5, 
                                }}
                                align="left"
                                value={channel.instrument}
                                onChange={(event) => {changeInstrument(channelIndex, event.target.value)}}
                            >
                                {instruments.map((instrument, instrumentIndex) => (
                                    <MenuItem 
                                        key={`channel-${channelIndex}-instrument-${instrumentIndex}`} 
                                        value={`${instrument.pitch}`}
                                        sx={{
                                            minHeight: 30, 
                                            maxHeight: 30, 
                                        }}
                                    >
                                        {instrument.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <VolumeSlider type="CHANNEL" channel={channelIndex} />
                        </Stack>
                    ))}
                </Stack>
                
            </Container>
            {Array(barsNum).fill(0).map((dummy, barIdx) => (
                <Container key={`column-${barIdx}`}>
                    <SoundboardColumn barNum={barIdx} />
                </Container>
            ))}
        </Stack>
    );
}

export default Soundboard;