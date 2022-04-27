import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import { useGlobalContext } from './context';

function VolumeSlider( { type, channel } ) {
    const { masterVolume, channels, changeVolume } = useGlobalContext();
    const [ localVolume, setLocalVolume ] = useState(type === "MASTER" ? masterVolume : channels[channel].volume);

    useEffect(() => {
        const timeout = setTimeout(() => {
            changeVolume(type === "MASTER" ? "MASTER" : channel, localVolume);
        }, 200)
        return () => {
            clearTimeout(timeout);
        }
    }, [localVolume])

    useEffect(() => {
        if (type === "MASTER") {
            setLocalVolume(masterVolume);
        }
    }, [masterVolume])

    useEffect(() => {
        if (type !== "MASTER") {
            setLocalVolume(channels[channel].volume);
        }
    }, [channels])

    if (type === "MASTER") {
        return (
            <Slider 
                defaultValue={100} 
                sx={{}}
                min={0}
                max={100}
                step={1}
                value={localVolume}
                onChange={(e) => {setLocalVolume(e.target.value)}}
            />
        );
    }
    if (type === "CHANNEL") {
        return (
            <Slider 
                sx={{
                    minWidth: 60, 
                }}
                size="small"
                min={0}
                max={100}
                step={1}
                value={localVolume}
                onChange={(e) => {setLocalVolume(e.target.value)}}
            />
        );
    }
}

export default VolumeSlider; 