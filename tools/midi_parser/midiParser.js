const {Midi} = require('@tonejs/midi')
let fs = require('fs')
const {writeFile} = require("fs");

/**
 * This shit was more than rushed lol
 */

module.exports = class MidiParser {
	constructor() {
		this.CHROMATIC = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

		this.COLORS = {
			'D6': 'DARK_PURPLE',
			'Db6': 'DARK_GREEN',
			'C6': 'BROWN',
			'B5': 'HOT_RED',
			'Bb5': 'ANNI5_BLUE',
			'A5': 'ANNI5_ORANGE',
			'Ab5': 'GRAY_PURPLE',
			'G5': 'PINK',
			'Gb5': 'DARK_PINK',
			'F5': 'YELLOW',
			'E5': 'GREEN',
			'Eb5': 'PURPLE',
			'D5': 'BLUE',
			'Db5': 'RED',
			'C5': 'WHITE',
			'B4': 'RANDOM',
			'Bb4': 'STROBE',
		}

		this.FIRE1 = {
			'E5': '5',
			'Eb5': '4',
			'D5': '3',
			'Db5': '2',
			'C5': '1',
		}
		this.FIRE2 = {
			'Ab5': '9',
			'G5': '8',
			'Gb5': '7',
			'F5': '6',
			'E5': '5',
			'Eb5': '4',
			'D5': '3',
			'Db5': '2',
			'C5': '1',
		}

		this.output = {
			"type": "song",
			"song": "ghosts_just_wanna_dance",
			"bpm": 170,
			"offsetMS": 170,
			"secondList": []
		}
	}

	start() {
		const midiData = fs.readFileSync("C:\\Users\\origi\\Documents\\stage7.mid")
		const midi = new Midi(midiData)

		const tracks = midi.tracks;

		for (let i = 0; i < tracks.length; i++) {
			const {name, notes} = tracks[i];

			if (!name) {
				continue;
			}

			const event = JSON.parse(name);

			this.handleTrackEvent(event, notes)
		}

		this.output.secondList.sort((a, b) => {return a.second - b.second});

		// output to json
		fs.writeFile('C:\\Users\\origi\\WebstormProjects\\PenguinConcert\\output\\party6_state1.json', JSON.stringify(this.output), function (err) {
			if (err) return console.log(err);
		});
	}

	handleTrackEvent(event, notes) {
		switch (event.type) {
			case 'SetColor': {
				this.handleSetColor(event, notes)
				break;
			}
			case 'Strobe': {
				this.handleSetStrobe(event, notes)
				break;
			}
			case 'Fire': {
				console.log(event)
				this.handleSetFire(event, notes)
				break;
			}
			default: {
				console.log(event)
				this.handleDefaultEvents(event, notes)
				break;
			}
		}
	}

	handleSetColor(event, notes) {
		for (let j = 0; j < notes.length; j++) {
			const noteData = notes[j];
			const velocity = noteData.velocity;
			const startBeat = noteData.ticks / 24;
			const stopBeat = startBeat + (noteData.durationTicks / 24);
			const note = this.noteFromMidi(noteData.midi);

			const color = this.COLORS[note];
			let alternateColors = [color]

			if (color === 'RANDOM') {
				alternateColors = []
			}

			// Start beat
			this.pushSecondEvent(startBeat, {
				"type": "SetProperty",
				"target": event.target,
				"values": {
					"prop_alternate_colors": alternateColors,
					"prop_random_delay": 1
				}
			})
			this.pushSecondEvent(startBeat, {
				"type": "CallPropFunction",
				"target": event.target,
				"name": "setLightVisible",
				"args": [true]
			})
			// Stop beat
			this.pushSecondEvent(stopBeat, {
				"type": "SetProperty",
				"target": event.target,
				"values": {
					"prop_alternate_colors": []
				}
			})
			this.pushSecondEvent(stopBeat, {
				"type": "CallPropFunction",
				"target": event.target,
				"name": "setLightVisible",
				"args": [false]
			})
		}
	}

	handleSetStrobe(event, notes) {
		for (let j = 0; j < notes.length; j++) {
			const noteData = notes[j];
			const velocity = noteData.velocity;
			const startBeat = noteData.ticks / 24;
			const stopBeat = startBeat + (noteData.durationTicks / 24);
			const note = this.noteFromMidi(noteData.midi);

			// Start beat
			this.pushSecondEvent(startBeat, {
				"type": "SetProperty",
				"target": event.target,
				"values": {
					"prop_strobe_delay": event.value
				}
			})
			// Stop beat
			this.pushSecondEvent(stopBeat, {
				"type": "SetProperty",
				"target": event.target,
				"values": {
					"prop_strobe_delay": -1
				}
			})
		}
	}

	handleSetFire(event, notes) {
		for (let j = 0; j < notes.length; j++) {
			const noteData = notes[j];
			const velocity = noteData.velocity;
			const startBeat = noteData.ticks / 24;
			const stopBeat = startBeat + (noteData.durationTicks / 24);
			const note = this.noteFromMidi(noteData.midi);
			let fireTarget;

			switch (event.target) {
				case 'fire1': {
					fireTarget = `${event.target}_${this.FIRE1[note]}`
					break;
				}
				case 'fire2': {
					fireTarget = `${event.target}_${this.FIRE2[note]}`
					break;
				}
			}

			// Start beat
			this.pushSecondEvent(startBeat, {
				"type": "CallPropFunction",
				"target": fireTarget,
				"name": "setFireState",
				"args": ["on"]
			})
			// Stop beat
			this.pushSecondEvent(stopBeat, {
				"type": "CallPropFunction",
				"target": fireTarget,
				"name": "setFireState",
				"args": ["off"]
			})
		}
	}

	handleDefaultEvents(event, notes) {
		for (let j = 0; j < notes.length; j++) {
			const noteData = notes[j];
			const velocity = noteData.velocity;
			const startBeat = noteData.ticks / 24;
			const stopBeat = startBeat + (noteData.durationTicks / 24);
			const note = this.noteFromMidi(noteData.midi);
			const defaultEvents = event.events;

			for (let i = 0; i < defaultEvents.length; i++) {
				const defaultEvent = defaultEvents[i];

				this.handleDefaultEvent(event, notes, defaultEvent, startBeat, stopBeat, note, velocity);
			}
		}
	}

	handleDefaultEvent(event, notes, defaultEvent, startBeat, stopBeat, note, velocity) {
		if (velocity < 0.1) {
			velocity = 0;
		}

		switch (defaultEvent.type) {
			case 'Tween': {
				this.handleDefaultTween(event, notes, defaultEvent, startBeat, stopBeat, note, velocity);
				return;
			}
			case 'CallFunction': {
				this.handleDefaultCallFunction(event, notes, defaultEvent, startBeat, stopBeat, note, velocity);
				return;
			}
			default: {
				break;
			}
		}

		// Default - no note release event
		this.pushSecondEvent(startBeat, defaultEvent)
	}

	handleDefaultTween(event, notes, defaultEvent, startBeat, stopBeat, note, velocity) {
		defaultEvent = JSON.parse(JSON.stringify(defaultEvent))

		const tween = defaultEvent.tween;
		const originalAlpha = tween.alpha;
		const tweenDuration = this.beatToMillisecond(stopBeat - startBeat, this.output.bpm);

		// Note velocity can set its alpha
		if (originalAlpha != null) {
			tween.alpha = velocity;
		}

		tween.duration = tweenDuration;

		// Start tween
		this.pushSecondEvent(startBeat, defaultEvent)
	}

	handleDefaultCallFunction(event, notes, defaultEvent, startBeat, stopBeat, note, velocity) {
		defaultEvent = JSON.parse(JSON.stringify(defaultEvent))

		const durationMS = this.beatToMillisecond(stopBeat - startBeat, this.output.bpm);

		switch (defaultEvent.name) {
			case 'randomBackGhost': {
				defaultEvent.args = [durationMS]
				break;
			}
		}

		this.pushSecondEvent(startBeat, defaultEvent)
	}

	pushSecondEvent(second, data) {
		let secondData = this.getSecondData(second)

		if (!secondData) {
			secondData = this.createSecondData(second)
		}
		if (data) {
			secondData.events.push(data)
		}
	}

	getSecondData(second) {
		for (let i = 0; i < this.output.secondList.length; i++) {
			if (this.output.secondList[i].second === second) {
				return this.output.secondList[i]
			}
		}
		return false
	}

	createSecondData(second) {
		let secondData = {"second": second, "events": []}

		this.output.secondList.push(secondData)

		return secondData
	}

	noteFromMidi(midi) {
		if (isNaN(midi) || midi < 0 || midi > 127) return null
		let name = this.CHROMATIC[midi % 12]
		let oct = Math.floor(midi / 12)// - 1
		return name + oct
	}

	beatToMillisecond(second, bpm, offsetMS = 0) {
		return Math.max(-1, ((60000 / bpm) * second) + (offsetMS));
	}
}