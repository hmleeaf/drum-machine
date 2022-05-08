import { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from './context';

const DrumsPlayer = () => {
	const {
		playing,
		tempo,
		barsNum,
		beatsNum,
		noteStorage,
		activeTab,
		channels,
		masterVolume,
		switchNextNonEmptyTab,
		getNextNonEmptyTab,
		activeBar,
		activeBeat,
		displayButtons,
		setActiveBar,
		setActiveBeat,
		setDisplayButtons,
	} = useGlobalContext();

	const barsNumRef = useRef();
	const beatsNumRef = useRef();
	const masterVolumeRef = useRef();
	const noteStorageRef = useRef();
	const activeTabRef = useRef();
	const channelsRef = useRef();

	barsNumRef.current = barsNum;
	beatsNumRef.current = beatsNum;
	masterVolumeRef.current = masterVolume;
	noteStorageRef.current = noteStorage;
	activeTabRef.current = activeTab;
	channelsRef.current = channels;

	const [intervalLength, setIntervalLength] = useState(60 / tempo / beatsNum);
	const intervalLengthRef = useRef();
	intervalLengthRef.current = intervalLength;

	const [timeoutID, setTimeoutID] = useState(intervalLength);
	const timeoutIDRef = useRef();
	timeoutIDRef.current = timeoutID;

	const [noteTime, setNoteTime] = useState(0);
	const noteTimeRef = useRef();
	noteTimeRef.current = noteTime;

	const [beat, setBeat] = useState(0);
	const beatRef = useRef();
	beatRef.current = beat;

	const displayButtonsRef = useRef();
	displayButtonsRef.current = displayButtons;

	const [playingTab, setPlayingTab] = useState(activeTab);
	const playingTabRef = useRef();
	playingTabRef.current = playingTab;

	const scheduleNoteAt = (instrument, volume, delay) => {
		window.MIDI.noteOn(9, instrument, volume, delay);
	};

	const scheduleAllNotesAtBeat = (
		noteStorage,
		channels,
		tab,
		bar,
		beat,
		masterVolume,
		delay
	) => {
		for (let channel = 0; channel < noteStorage[tab].length; channel++) {
			if (noteStorage[tab][channel][bar][beat]) {
				scheduleNoteAt(
					channels[channel].instrument,
					(((channels[channel].volume / 100) * masterVolume) / 100) * 127,
					delay
				);
			}
		}
	};

	const getDelayToNextNote = (noteTime, interval) => {
		return noteTime + interval - window.MIDI.getContext().currentTime;
	};

	const timeoutEvent = () => {
		const timeUntilNextNote = Math.max(
			getDelayToNextNote(noteTimeRef.current, intervalLengthRef.current),
			0
		);
		scheduleAllNotesAtBeat(
			noteStorageRef.current,
			channelsRef.current,
			playingTabRef.current,
			parseInt(beatRef.current / beatsNumRef.current) % barsNumRef.current,
			beatRef.current % beatsNumRef.current,
			masterVolumeRef.current,
			timeUntilNextNote
		);
		if (beatRef.current === barsNumRef.current * beatsNumRef.current - 1) {
			setPlayingTab((playingTab) => getNextNonEmptyTab(playingTab));
		}
		setBeat((beat) =>
			beat + 1 >= barsNumRef.current * beatsNumRef.current ? 0 : beat + 1
		);
		setNoteTime((noteTime) => noteTime + intervalLengthRef.current);
		const timeout = setTimeout(timeoutEvent, timeUntilNextNote * 1000);
		setTimeoutID(timeout);
	};

	useEffect(() => {
		if (playing) {
			setNoteTime(window.MIDI.getContext().currentTime);
			setBeat(0);
			setTimeout(timeoutEvent, intervalLength * 1000);
		} else {
			clearTimeout(timeoutID);
			setDisplayButtons(false);
			setBeat(0);
			setActiveBar(-1);
			setActiveBeat(-1);
		}

		return () => {
			clearTimeout(timeoutID);
		};
	}, [playing]);

	useEffect(() => {
		setIntervalLength(60 / tempo / beatsNum);
	}, [tempo, beatsNum]);

	useEffect(() => {
		let displayBeat = beat - 2;
		if (displayBeat < 0) displayBeat += beatsNum * barsNum;
		if (displayBeat === beatsNum * barsNum - 1 && displayButtons)
			switchNextNonEmptyTab();
		if (displayBeat === beatsNum * barsNum - 1) setDisplayButtons(true);
		if (displayButtonsRef.current) {
			setActiveBar(parseInt(displayBeat / beatsNum));
			setActiveBeat(displayBeat % beatsNum);
		}
	}, [beat]);

	useEffect(() => {
		setPlayingTab(activeTab);
	}, [activeTab]);

	return <></>;
};

export default DrumsPlayer;
