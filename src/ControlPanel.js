import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import VolumeSlider from './VolumeSlider';
import SettingField from './SettingField';
import SettingButton from './SettingButton';
import { FaVolumeDown, FaVolumeUp } from 'react-icons/fa'; 

function ControlPanel() {
    

    return (
        <Grid 
            container 
            component="form"
            rowSpacing={4}
            alignItems="center"
            justifyContent="center"
            paddingX={10}
        >
            <Grid item xs={4} align="right">
                <SettingButton type="PLAY"/>
            </Grid>
            <Grid item xs={4} align="center">
                <SettingButton type="TABS"/>
            </Grid>
            <Grid item xs={4} align="left">
                <SettingButton type="DEMO"/>
            </Grid>
            
            <Grid item xs={12} sx={{display:"flex"}}>
                <Grid container spacing={2} mx={10} alignItems="center">
                    <Grid item>
                        <Typography>Master Volume: </Typography>
                    </Grid>
                    <Grid item>
                        <FaVolumeDown />
                    </Grid>
                    <Grid item xs>
                        <VolumeSlider type="MASTER"/>
                    </Grid>
                    <Grid item>
                        <FaVolumeUp />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} align="center">
                <SettingField type="TEMPO" />
            </Grid>
            <Grid item xs={4} align="center">
                <SettingField type="BAR" />
            </Grid>
            <Grid item xs={4} align="center">
                <SettingField type="BEAT" />
            </Grid>
        </Grid>
    );
}

export default ControlPanel