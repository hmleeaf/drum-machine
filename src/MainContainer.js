import React from 'react';
import ControlPanel from './ControlPanel';
import Soundboard from './Soundboard';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper'

function MainContainer() {
    return (

            <Paper 
                sx={{
                    maxWidth: 1500,
                    mx: "auto", 
                    paddingX: 20, 
                    paddingY: 4, 
                }}
                elevation={4}
                
            >
                <Stack>
                    <ControlPanel />
                    <Divider sx={{
                        marginY: 5, 
                    }}/>
                    <Soundboard />
                </Stack>
            </Paper>

    );
}

export default MainContainer;