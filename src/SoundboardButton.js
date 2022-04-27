import { ToggleButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './context';
import { useMIDIContext } from './contextMIDI';

const SoundboardButton = ({channel, bar, beat}) => {
    const { toggleNote, notes, playing, display } = useGlobalContext(); 
    const { activeBar, activeBeat } = useMIDIContext();
    const active = (activeBar === bar) && (activeBeat === beat); 

    return (
        <ToggleButton 
            value="notes"
            selected={notes[channel][bar][beat] || (active && playing)}
            color={active && playing ? 'success' : 'standard'}
            key={`btn-${bar}-${beat}-${channel}`}
            sx={{
                minHeight: 40,  
                maxHeight: 40, 
                minWidth: 40, 
                maxWidth: 40, 
                marginBottom: 0.5, 
                marginRight: 0.5,
            }}
            onChange={()=>{toggleNote(channel, bar, beat)}}
        >
        </ToggleButton>
    )
}

export default SoundboardButton;