import ConcertTickHandler from "@rooms/party6/system/ConcertTickHandler";
import ConcertEventFunctions from "@rooms/party6/system/concert_events/ConcertEventFunctions";

export default class BaseConcert {
	constructor(scene) {
		this.scene = scene;
		this.cpworld = scene.cpworld;
		this.airtower = scene.cpworld.airtower;
		this.tickHandler = new ConcertTickHandler(this);
		this.eventFunctions = new ConcertEventFunctions(this);

		this.currentStateId = 0;
		this.originalProperties = {};

		this.resetStatesData();
	}

	start() {
		// Current song
		this.currentSong = undefined;
		this.concertPlaying = false;

		// Disable setTimeout so we don't crash on focus
		this.cpworld.disableSetTimeout = true;

		this.addListeners();
	}

	addListeners() {
		this.scene.events.on('update', this.onSceneUpdate, this);
		this.cpworld.room.roomEvents.once('room_destroy', this.onRoomDestroy, this);
		this.cpworld.room.roomEvents.once('player_join', this.onPlayerJoin, this);
		this.airtower.addListener('room:concert', this.handleConcertState, this);
		this.airtower.addListener('room:get_concert', this.handleGetConcert, this);

		this.tickHandler.start();
	}

	removeListeners() {
		this.tickHandler.stop();
		this.scene.events.off('update', this.onSceneUpdate, this);
		this.airtower.removeListener('room:concert', this.handleConcertState, this);
		this.airtower.removeListener('room:get_concert', this.handleGetConcert, this);
	}

	resetStatesData() {
		this.statesData = [
			{ id: 0, data: JSON.parse(JSON.stringify(this.scene.cache.json.get('party6_state0'))) },
			{ id: 1, data: JSON.parse(JSON.stringify(this.scene.cache.json.get('party6_state1'))) },
			{ id: 2, data: JSON.parse(JSON.stringify(this.scene.cache.json.get('party6_state2'))) },
			{ id: 3, data: JSON.parse(JSON.stringify(this.scene.cache.json.get('party6_state3'))) },
			{ id: 4, data: JSON.parse(JSON.stringify(this.scene.cache.json.get('party6_state4'))) },
			{ id: 5, data: JSON.parse(JSON.stringify(this.scene.cache.json.get('party6_state5'))) },
			{ id: 6, data: JSON.parse(JSON.stringify(this.scene.cache.json.get('party6_state6'))) },
			{ id: 7, data: JSON.parse(JSON.stringify(this.scene.cache.json.get('party6_state7'))) },
			{ id: 8, data: JSON.parse(JSON.stringify(this.scene.cache.json.get('party6_state8'))) },
			{ id: 9, data: JSON.parse(JSON.stringify(this.scene.cache.json.get('party6_state9'))) },
		]

		// Convert BPM to seconds & apply offset
		for (let i = 0; i < this.statesData.length; i++) {
			const stateData = this.statesData[i].data;
			const stateBPM = stateData.bpm;
			const offsetMS = stateData.offsetMS ? stateData.offsetMS : 0;

			if (!stateBPM) {
				continue;
			}

			for (let j = 0; j < stateData.secondList.length; j++) {
				const secondData = stateData.secondList[j];

				secondData.second = this.beatToSecond(secondData.second, stateBPM, offsetMS);

				for (let k = 0; k < secondData.events.length; k++) {
					const event = secondData.events[k];

					// Convert for events
					switch (event.type) {
						case 'SetProperty': {
							for (const key in event.values) {
								switch (key) {
									case 'prop_random_delay': {
										event.values[key] = this.beatToMillisecond(event.values[key], stateBPM, 0);
										break;
									}
									case 'prop_strobe_delay': {
										event.values[key] = this.beatToMillisecond(event.values[key], stateBPM, 0);
										break;
									}
								}
							}
							break;
						}
					}
				}
			}
		}
	}

	beatToSecond(second, bpm, offsetMS) {
		return ((60 / bpm) * second) + (offsetMS / 1000);
	}

	beatToMillisecond(second, bpm, offsetMS) {
		return Math.max(-1, ((60000 / bpm) * second) + (offsetMS));
	}

	onRoomDestroy() {
		this.cpworld.disableSetTimeout = false;
		this.stopSong(true);
		this.removeListeners();
	}

	onPlayerJoin(player) {
		this.airtower.emitPacket('room:get_concert');
	}

	handleGetConcert(packet) {
		const [state, playbackSeconds] = packet.params;

		this.updateState(state, playbackSeconds);
	}

	handleConcertState(packet) {
		let [state, playbackSeconds] = packet.params;

		playbackSeconds = playbackSeconds < 2 ? 0 : playbackSeconds

		this.updateState(state, playbackSeconds)
	}

	/**
	 * Reset all concert objects to their original properties.
	 */
	resetConcertObjects() {
		this.tickHandler.stopAllTweens();
		this.tickHandler.stopAllSpeechBubbles();
		this.eventFunctions.hideHalloween();

		for (const objectName in this.originalProperties) {
			const originals = this.originalProperties[objectName];
			const target = originals.target;

			// Reset if it's a prop prefab
			if (target.resetProp) {
				target.resetProp();
			}

			for (const key in originals) {
				const value = originals[key];

				switch (key) {
					case 'target': {
						break;
					}
					case 'playAnimationKey': {
						if (value !== 'DISABLED') {
							target.play(value);
						}
						break;
					}
					default: {
						target[key] = originals[key]
					}
				}
			}
		}
	}

	/**
	 * Save original property so we can reset the object later.
	 * Will get value from target if not specified.
	 * @param targetName
	 * @param target
	 * @param key
	 * @param value
	 */
	saveOriginalProperty(targetName, target, key, value = null) {
		if (!this.originalProperties[targetName]) {
			this.originalProperties[targetName] = {};
		}
		if (this.originalProperties[targetName][key] == null) {
			// todo: clone target original references
			this.originalProperties[targetName][key] = value != null ? value : target[key];
			this.originalProperties[targetName]['target'] = target;
		}
	}

	/**
	 * Update concert state.
	 * @param state
	 * @param playbackSeconds
	 */
	updateState(state, playbackSeconds) {
		/*if (state > 0 && !this.cpworld.player.moderator) {
			state = 0;
		}*/
		if (!this.cpworld.showedEpilepsyWarning && state > 0) {
			this.cpworld.showedEpilepsyWarning = true;
			this.cpworld.showPrompt('ignore', 'Photosensitive Warning\nThis concert may contain brightly colored flashing objects.');
		}

		this.resetConcertObjects();

		this.tickHandler.processedStates = [];
		this.currentStateId = state;

		this.resetStatesData();

		const stateData = this.getCurrentStateData();

		console.log('[CONCERT] State: ' + state, playbackSeconds + ' seconds played');

		if (stateData.data.cheer) {
			clientUtils.addPlaySound(this.scene, 'cheer',  {volume: 0.35});
		}

		switch (stateData.data.type) {
			case 'song': {
				this.muteGameMusic();
				this.stopSong();
				this.playSong(stateData.data.song, playbackSeconds);
				break;
			}
			case 'timer': {
				this.tickHandler.stateElapsedSeconds = playbackSeconds;

				if (stateData.data.song) {
					this.muteGameMusic();
					this.stopSong();

					if (stateData.data.song !== 'silence') {
						this.playSong(stateData.data.song, playbackSeconds);
					}
				} else {
					this.stopSong(true);
				}
				break;
			}
		}
	}

	playSong(key, playbackSeconds = 0) {
		this.muteGameMusic();

		if (this.currentSong) {
			this.currentSong.destroy();
			this.currentSong = null;
		}

		this.currentSong = this.scene.sound.add(key);
		this.currentSong.play({
			volume: 0.2,
			loop: false,
			seek: playbackSeconds
		});
	}

	stopSong(unmuteGame = false) {
		if (this.currentSong) {
			this.currentSong.destroy();
			this.currentSong = null;
		}
		if (unmuteGame && this.cpworld.musicMuted) {
			if (this.cpworld.music) {
				this.cpworld.music.play();
			}

			this.cpworld.musicMuted = false;
		}
	}

	muteGameMusic() {
		if (this.cpworld.music) {
			this.cpworld.music.stop();
		}

		this.cpworld.musicMuted = true;
	}

	shutdownConcert(unmuteGame = true) {
		this.concertPlaying = false;

		// Cleanup

		this.stopSong(unmuteGame);
		this.showCurtain(null, null, null, true);
	}

	showCurtain(downCallback, upCallback, doneCallback = null, stayDown = false) {
		this.courtainDown = stayDown;

		this.tweens.add({
			targets: this.courtain,
			y: { from: -1305, to: -835},
			ease: Phaser.Math.Easing.Quadratic.InOut,
			duration: 1500,
			repeat: 0,
			onComplete: () => {
				if (downCallback) {
					downCallback();
				}

				if (!stayDown) {
					this.tweens.add({
						targets: this.courtain,
						y: {from: -835, to: -1305},
						ease: Phaser.Math.Easing.Quadratic.InOut,
						duration: 2500,
						repeat: 0,
						delay: 1500,
						onComplete: () => {
							if (upCallback) {
								upCallback();
							}
						}
					});
				}
			}
		});
	}

	getCurrentStateData() {
		for (let i = 0; i < this.statesData.length; i++) {
			if (this.statesData[i].id === this.currentStateId) {
				return this.statesData[i]
			}
		}
	}

	onSceneUpdate() {
		if (!this.concertPlaying || !this.currentSong) {
			return;
		}
	}
}
