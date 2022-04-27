import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { FaPlay, FaStop } from 'react-icons/fa';
import { useGlobalContext } from './context';

function SettingButton({ type }) {
    const { playing, togglePlaying, activeTab, tabNotEmpty, switchTab, startDemo } = useGlobalContext();

    if (type === "PLAY") {
        return ( 
            <Button variant="outlined" sx={{paddingY: 3, paddingX: 5, fontSize: 18}} onClick={ togglePlaying }>
                { playing ? <FaStop /> : <FaPlay />}
            </Button>
        ); 
    }
    if (type === "TABS") {
        return (
            <ButtonGroup variant="outlined">
                {tabNotEmpty.map((tabNotEmpty, tabIdx) => 
                    <Button
                        color={tabIdx === activeTab ? "secondary" : "primary"}
                        variant={tabIdx === activeTab || tabNotEmpty ? "contained" : "outlined"}
                        onClick={() => {switchTab(tabIdx)}}
                        key={`btn-tab-${tabIdx}`}
                    >
                        {tabIdx + 1}
                    </Button>
                )}
            </ButtonGroup>
        );
    }
    if (type === "DEMO") {
        return (
            <Button 
                variant="outlined"
                onClick={startDemo}
            >
                demo
            </Button>
        );
    }
}

export default SettingButton; 