import React from 'react';
import MainContainer from './MainContainer';
import { MIDIProvider } from './contextMIDI';
import { Stack, Typography } from '@mui/material';
import { FaDrum } from 'react-icons/fa';
import { useGlobalContext } from './context';

function App() {
  const { loading } = useGlobalContext();
  if (loading) {
    return (
      <Typography
        variant="h1"
        align="center"
        sx={{
          margin: 10, 
        }}
      >
        Initializing...
      </Typography>
    )
  }
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
