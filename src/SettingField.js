import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useGlobalContext } from "./context";

function SettingField({ type }) {
    const { tempo, barsNum, beatsNum, changeSetting } = useGlobalContext();
    const [ localTempo, setLocalTempo ] = useState(tempo); 

    useEffect(() => {
        const timeout = setTimeout(() => {
            changeSetting("TEMPO", localTempo);
        }, 1000)
        return () => {
            clearTimeout(timeout);
        }
    }, [localTempo])

    useEffect(() => {
        setLocalTempo(tempo);
    }, [tempo])

    if (type === "TEMPO") {
        return <TextField 
            id="tempo-input"
            type="number"
            label="Tempo"
            inputProps={{
                step: 1, 
                min: 0, 
                max: 200, 
                type: "number", 
            }}
            sx={{
                minWidth:150, 
            }}
            value={localTempo}
            onChange={(e) => {setLocalTempo(e.target.value)}}
        />
    }
    if (type === "BAR") {
        return <TextField 
            id="bars-input"
            select
            label="No. of Bars"
            sx={{
                minWidth:150, 
            }}
            align="left"
            value={barsNum}
            onChange={(e)=>{changeSetting("BAR", e.target.value)}}
        >
            {[1, 2, 3, 4].map((num) => (
                <MenuItem key={`bars-option-${num}`} value={num}>
                    {num}
                </MenuItem>
            ))}
        </TextField>
    }
    if (type === "BEAT") {
        return <TextField 
            id="beats-input"
            select
            label="Beats per Bar"
            sx={{
                minWidth: 150, 
            }}
            align="left"
            value={beatsNum}
            onChange={(e)=>{changeSetting("BEAT", e.target.value)}}
        >
            {[1, 2, 3, 4].map((num) => (
                <MenuItem key={`beats-option-${num}`} value={num}>
                    {num}
                </MenuItem>
            ))}
        </TextField>
    }
}

export default SettingField;