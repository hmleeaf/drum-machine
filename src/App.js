import MainContainer from './MainContainer';
import { MIDIProvider } from './contextMIDI';
import { Stack, Typography } from '@mui/material';
import { FaDrum } from 'react-icons/fa';

function App() {
  return (
    <MIDIProvider>
      <Stack 
        direction="row"
        align="center"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginY: 4, 
        }}
      >
        <FaDrum />
        <Typography 
          variant="h2"
          sx={{
            marginX: 4, 
          }}
        >
          Drum Machine
        </Typography>
        <FaDrum />
      </Stack>
      <MainContainer />
    </MIDIProvider>
  );
}

export default App;
