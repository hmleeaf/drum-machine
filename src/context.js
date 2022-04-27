import React, { useContext, useReducer, useEffect, useState } from "react";
import reducer from "./reducer";
import { demo } from "./demo";

const AppContext = React.createContext(); 

const initialChannels = [
    {
        instrument: 49, 
        volume: 100
    }, 
    {
        instrument: 51, 
        volume: 100
    }, 
    {
        instrument: 48, 
        volume: 100
    }, 
    {
        instrument: 43, 
        volume: 100
    }, 
    {
        instrument: 46, 
        volume: 100
    }, 
    {
        instrument: 42, 
        volume: 100
    }, 
    {
        instrument: 38, 
        volume: 100
    }, 
    {
        instrument: 35, 
        volume: 100
    }
]

const initialNotes = [
    [
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false]
    ], 
    [
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false]
    ], 
    [
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false]
    ], 
    [
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false]
    ], 
    [
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false]
    ], 
    [
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false]
    ], 
    [
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false]
    ], 
    [
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false], 
        [false, false, false, false]
    ], 
]

const initialNotesStorage = [
    JSON.parse(JSON.stringify(initialNotes)), 
    JSON.parse(JSON.stringify(initialNotes)), 
    JSON.parse(JSON.stringify(initialNotes)), 
    JSON.parse(JSON.stringify(initialNotes))
]

const initialState = {
    masterVolume: 50, 
    tempo: 160, 
    barsNum: 4, 
    beatsNum: 4, 
    channels: initialChannels, 
    noteStorage: initialNotesStorage, 
    activeTab: 0, 
    playing: false, 
    tabNotEmpty: [false, false, false, false], 
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [notes, setNotes] = useState(state.noteStorage[state.activeTab]); 
    const [loading, setLoading] = useState(true);
    const MIDI = window.MIDI;
    //console.log(state);

    useEffect(() => {
        setNotes(state.noteStorage[state.activeTab]); 
    }, [state.activeTab, state.noteStorage])

    useEffect(() => {
        MIDI.loadPlugin({
            soundfontUrl: process.env.PUBLIC_URL + "/midi-js/soundfont/", 
            instruments: [
                "drum"
            ], 
            onprogress: (state, progress) => {
                console.log(state, progress);
            }, 
            onsuccess: () => {
                
                document.body.click(() => {
                    if (MIDI.getContext().state !== "running") {
                        MIDI.getContext().resume().then(() => {
                            console.log("Audio Context is resumed!");
                        })
                    }
                }); 

                MIDI.setVolume(0, 127); 
                MIDI.programChange(9, 0);

                setLoading(false);
            }
        })
    }, [])

    const toggleNote = (channel, bar, beat) => {
        if (!notes[channel][bar][beat])
            MIDI.noteOn(9, state.channels[channel].instrument, parseInt((state.masterVolume / 100) * (state.channels[channel].volume / 100) * 127)); 
        dispatch({type: "TOGGLE_NOTE", payload: {channel, bar, beat}}); 
    }

    const togglePlaying = () => {
        dispatch({type: "TOGGLE_PLAYING"}); 
    }

    const changeInstrument = (channel, instrument) => {
        dispatch({type: "CHANGE_INSTRUMENT", payload: {channel, instrument}});
    }

    const changeSetting = (setting, param) => {
        dispatch({type: "CHANGE_SETTING", payload: {setting, param}});
    }

    const changeVolume = (channel, volume) => {
        dispatch({type: "CHANGE_VOLUME", payload: {channel, volume}});
    }

    const switchTab = (tabIdx) => {
        dispatch({type: "SWITCH_TAB", payload: {tabIdx}}); 
    }

    const switchNextNonEmptyTab = () => {
        dispatch({type: "SWITCH_TAB_NEXT"});
    }

    const startDemo = () => {
        dispatch({type: "START_DEMO", payload: {demo}}); 
        // setTimeout(() => {
        //     dispatch({type: "START_PLAYING"}); 
        // }, 1000); 
    }

    const getNextNonEmptyTab = (currentTab) => {
        const currTab = currentTab; 
        let nextTab = -1; 
        for (let i = 1; i < 4; ++i) {
            if (state.tabNotEmpty[(currTab + i) % 4]) {
                nextTab = (currTab + i) % 4;
                break;
            }
        }
        if (nextTab === -1) nextTab = currTab;
        return nextTab;
    }

    return (
        <AppContext.Provider
            value={{
                ...state, 
                notes, 
                loading, 
                toggleNote, 
                togglePlaying, 
                changeInstrument, 
                changeSetting, 
                changeVolume, 
                switchTab, 
                switchNextNonEmptyTab, 
                getNextNonEmptyTab, 
                startDemo, 
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }