const reducer = (state, action) => {
	if (action.type === 'TOGGLE_NOTE') {
		const newNoteStorage = state.noteStorage.map((tab, tabIdx) => {
			if (tabIdx === state.activeTab) {
				return tab.map((channel, channelIdx) => {
					return channel.map((bar, barIdx) => {
						return bar.map((beat, beatIdx) => {
							if (
								channelIdx === action.payload.channel &&
								barIdx === action.payload.bar &&
								beatIdx === action.payload.beat
							) {
								return !beat;
							} else {
								return beat;
							}
						});
					});
				});
			} else {
				return tab;
			}
		});
		const newTabNotEmpty = newNoteStorage.map(
			(tab) =>
				!tab.every((channel) =>
					channel.every((bar) => bar.every((beat) => !beat))
				)
		);
		return {
			...state,
			noteStorage: newNoteStorage,
			tabNotEmpty: newTabNotEmpty,
		};
	}
	if (action.type === 'TOGGLE_PLAYING') {
		return { ...state, playing: !state.playing };
	}
	if (action.type === 'CHANGE_INSTRUMENT') {
		return {
			...state,
			channels: state.channels.map((channel, channelIdx) => {
				if (channelIdx === action.payload.channel)
					return {
						...channel,
						instrument: parseInt(action.payload.instrument),
					};
				else return { ...channel };
			}),
		};
	}
	if (action.type === 'CHANGE_SETTING') {
		if (action.payload.setting === 'TEMPO')
			return {
				...state,
				tempo: parseInt(action.payload.param),
			};
		if (action.payload.setting === 'BAR')
			return {
				...state,
				barsNum: parseInt(action.payload.param),
			};
		if (action.payload.setting === 'BEAT')
			return {
				...state,
				beatsNum: parseInt(action.payload.param),
			};
	}
	if (action.type === 'CHANGE_VOLUME') {
		if (action.payload.channel === 'MASTER')
			return { ...state, masterVolume: parseInt(action.payload.volume) };
		return {
			...state,
			channels: state.channels.map((channel, channelIdx) => {
				if (channelIdx === parseInt(action.payload.channel))
					return { ...channel, volume: action.payload.volume };
				else return channel;
			}),
		};
	}
	if (action.type === 'SWITCH_TAB') {
		return {
			...state,
			activeTab: action.payload.tabIdx,
		};
	}
	if (action.type === 'SWITCH_TAB_NEXT') {
		const currTab = state.activeTab;
		let nextTab = -1;
		for (let i = 1; i < 4; ++i) {
			if (state.tabNotEmpty[(currTab + i) % 4]) {
				nextTab = (currTab + i) % 4;
				break;
			}
		}
		if (nextTab === -1) nextTab = currTab;
		return {
			...state,
			activeTab: nextTab,
		};
	}
	if (action.type === 'START_DEMO') {
		return {
			...state,
			...action.payload.demo,
		};
	}
	if (action.type === 'START_PLAYING') {
		return {
			...state,
			playing: true,
		};
	}
};

export default reducer;
