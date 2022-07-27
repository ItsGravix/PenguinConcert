// javascript-obfuscator:disable
export default class ConcertTickHandler {
	constructor(baseConcert) {
		this.concert = baseConcert;
		this.scene = baseConcert.scene;
		this.cpworld = this.scene.cpworld;

		this.MAX_SECONDS = 100000;

		this.isProcessingTick = false;
		this.stateElapsedSeconds = -1;
		this.stateTimer = undefined;
		this.tickTimer = undefined;
		this.tweens = {};
		this.speechBubbles = {};
		this.processedStates = [];
		this.tweenReservedProperties = [];

		this.initReserved();
	}

	start() {
		// Timer used to check concert events
		this.tickTimer = this.scene.time.addEvent({
			delay: 50,
			callback: this.onConcertTick,
			callbackScope: this,
			loop: true
		});
		// Timer used to count seconds if we're not playing a song
		this.stateTimer = this.scene.time.addEvent({
			delay: 100,
			callback: this.onStateTimerTick,
			callbackScope: this,
			loop: true
		});
	}

	stop() {
		this.tickTimer.remove();
		this.stateTimer.remove();
	}

	onStateTimerTick() {
		if (this.stateElapsedSeconds < this.MAX_SECONDS) {
			this.stateElapsedSeconds += 0.1; // .1 second increments
		}
	}

	onConcertTick() {
		if (this.isProcessingTick) {
			return console.error('[ConcertTickHandler] Currently processing a tick, skipping.');
		}

		//console.log(this.getCurrentStateSeconds().toFixed(2), 'seconds')

		this.isProcessingTick = true;

		// Go through all the states to catch up
		for (let i = 0; i < this.concert.statesData.length; i++) {
			const { id } = this.concert.statesData[i];

			if (id > this.concert.currentStateId || (this.processedStates.includes(id) && this.concert.currentStateId !== id)) {
				// We haven't gotten to this state yet or already processed a previous state
				continue;
			}

			this.handleState(id, this.concert.statesData[i]);
		}

		this.isProcessingTick = false;
	}

	handleState(stateId, stateData) {
		let currentSongSeconds;

		if (stateId === this.concert.currentStateId) {
			currentSongSeconds = this.getCurrentStateSeconds();
		} else {
			// We can fast-forward to catch up previous states
			currentSongSeconds = this.MAX_SECONDS;
		}

		if (!stateData || currentSongSeconds === -1) {
			return console.error('[ConcertTickHandler] Not playing anything.');
		}

		//console.log(currentSongSeconds, 'seconds')

		const secondList = stateData.data.secondList;

		// Go through the list of seconds
		for (let i = 0; i < secondList.length; i++) {
			const secondData = secondList[i];
			const second = secondData.second;

			if (currentSongSeconds >= second) {
				this.handleSecondEvents(second, secondData, stateData, secondData.events)
			}
		}

		this.processedStates.push(stateId);
	}

	handleSecondEvents(second, secondData, stateData, events) {
		for (let i = 0; i < events.length; i++) {
			this.handleSecondEvent(second, secondData, stateData, events[i]);
		}
	}

	handleSecondEvent(second, secondData, stateData, event) {
		// javascript-obfuscator:disable
		if (event.handled) {
			return;
		}

		console.log(second, event)

		// ie. CESetProperty
		let className = `CE${event.type}`;
		//let eventHandler = eval(`new ${className}(this, secondData, stateData, event)`);

		import(`@rooms/party6/system/concert_events/${className}.js`).then(module => {
			const eventHandler = new module.default(this, secondData, stateData, event);

			eventHandler.execute();

			event.handled = true;
		});
	}

	playManagedTween(tween, second, stateId) {
		const targetNames = [];

		// Resolve the GameObject targets from names
		for (let i = 0; i < tween.targets.length; i++) {
			const targetName = tween.targets[i];
			tween.targets[i] = this.scene[targetName];

			// Verify that an older tween won't break this one
			this.verifyTargetTweens(targetName, tween);
			targetNames.push(targetName);
		}

		// Resolve easing (ie. Phaser.Math.Easing.Quadratic.Out)
		tween.ease = eval(tween.ease);

		const sceneTween = this.scene.tweens.add(tween);

		sceneTween.once('start', function(tween, targets) {
			const durationSeconds = sceneTween.totalDuration / 1000;
			let secondsDiff = this.getCurrentStateSeconds() - second;

			// Fast-forward this tween if it's late or is from a past state
			if (secondsDiff > 1 || this.concert.currentStateId !== stateId) {
				let predictedProgress;

				if (this.concert.currentStateId === stateId) {
					predictedProgress = secondsDiff / durationSeconds;
					predictedProgress = Math.min(1, predictedProgress);
				} else {
					predictedProgress = 1;
				}

				sceneTween.pause();

				this.scene.time.delayedCall(1, () => {
					sceneTween.seek(predictedProgress);
					sceneTween.resume();
				}, this);
			}
		}, this);

		for (let i = 0; i < targetNames.length; i++) {
			const targetName = targetNames[i];

			// Keep track of tweens
			if (!this.tweens[targetName]) {
				this.tweens[targetName] = [];
			}

			this.tweens[targetName].push(sceneTween);

			for (let j = 0; j < sceneTween.data.length; j++) {
				const tweenData = sceneTween.data[j];

				// Set original properties so we can rewind later
				this.concert.saveOriginalProperty(targetName, tweenData.target, tweenData.key);
			}
		}
	}

	/**
	 * Play managed animation from a concert event.
	 * @param concertEvent
	 * @param target
	 * @param animKey
	 */
	playManagedAnimation(concertEvent, target, animKey) {
		// Disable property to prevent from playing on reset
		this.concert.saveOriginalProperty('unknown', target, 'playAnimationKey', 'DISABLED');
		this.concert.saveOriginalProperty('unknown', target, 'frame');
		this.concert.saveOriginalProperty('unknown', target, 'texture');
		target.play(animKey);

		// Fast-forward this tween if it was supposed to run a few seconds ago or is from a past state
		let secondsDiff = this.getCurrentStateSeconds() - concertEvent.secondData.second;
		const animation = target.anims;
		let durationSeconds = animation.duration / 1000;

		if (secondsDiff > 1 || this.concert.currentStateId !== concertEvent.stateData.id) {
			let predictedProgress;

			if (this.concert.currentStateId === concertEvent.stateData.id) {
				predictedProgress = secondsDiff / durationSeconds;
				predictedProgress = Math.min(1, predictedProgress);
			} else {
				predictedProgress = 1;
			}

			animation.setProgress(predictedProgress);
		}
	}

	stopAllTweens() {
		for (const targetName in this.tweens) {
			const tweens = this.tweens[targetName];

			for (let i = 0; i < tweens.length; i++) {
				const tween = tweens[i];

				tween.remove();
				tween.stop();
			}
		}

		this.tweens = {};
	}

	stopAllSpeechBubbles() {
		for (const id in this.speechBubbles) {
			const bubble = this.speechBubbles[id];

			if (bubble.scene) {
				bubble.destroy();
			}
		}

		this.speechBubbles = [];
	}

	stopSpeechBubble(id) {
		const bubble = this.speechBubbles[id];

		if (!bubble)
			return
		if (bubble.scene) {
			bubble.destroy();
		}

		delete this.speechBubbles[id];
	}

	verifyTargetTweens(targetName, newTween) {
		const oldTweens = this.tweens[targetName];

		if (!oldTweens) {
			return;
		}

		for (let i = 0; i < oldTweens.length; i++) {
			const oldTween = oldTweens[i];

			for (let j = 0; j < oldTween.data.length; j++) {
				const tweenData = oldTween.data[j];

				if (newTween[tweenData.key] != null && !this.tweenReservedProperties.includes(tweenData.key)) {
					oldTween.remove();
					oldTween.stop();
				}
			}
		}
	}

	stopTargetTweens(targetName) {
		const tween = this.tweens[targetName];

		if (tween) {
			//tween.seek(1); // go to end
			//tween.stop();
			//tween.remove();
			//delete this.tweens[targetName];
		}
	}

	getCurrentStateSeconds() {
		let stateData = this.concert.getCurrentStateData();

		if (!stateData) {
			return -1;
		}

		switch (stateData.data.type) {
			case 'song': {
				if (this.concert.currentSong && this.concert.currentSong.isPlaying) {
					return this.concert.currentSong.seek
				} else {
					return this.MAX_SECONDS // song ended
				}
			}
			case 'timer': {
				return this.stateElapsedSeconds;
			}
		}
	}

	initReserved() {
		this.tweenReservedProperties = [
			'callbackScope',
			'completeDelay',
			'delay',
			'duration',
			'ease',
			'easeParams',
			'flipX',
			'flipY',
			'hold',
			'loop',
			'loopDelay',
			'offset',
			'onActive',
			'onActiveParams',
			'onActiveScope',
			'onComplete',
			'onCompleteParams',
			'onCompleteScope',
			'onLoop',
			'onLoopParams',
			'onLoopScope',
			'onRepeat',
			'onRepeatParams',
			'onRepeatScope',
			'onStart',
			'onStartParams',
			'onStartScope',
			'onStop',
			'onStopParams',
			'onStopScope',
			'onUpdate',
			'onUpdateParams',
			'onUpdateScope',
			'onYoyo',
			'onYoyoParams',
			'onYoyoScope',
			'paused',
			'props',
			'repeat',
			'repeatDelay',
			'targets',
			'useFrames',
			'yoyo'
		];
	}
}
