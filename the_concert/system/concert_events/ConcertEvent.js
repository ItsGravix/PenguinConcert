export default class ConcertEvent {
	constructor(tickHandler, secondData, stateData, event) {
		this.tickHandler = tickHandler;
		this.concert = tickHandler.concert;
		this.secondData = secondData;
		this.stateData = stateData;
		this.scene = tickHandler.scene;
		//this.cpworld = this.scene.cpworld;
		this.event = event;
	}

	execute() {
		// Some events can stop tweens
		if (this.event.stopTween) {
			this.tickHandler.stopTargetTweens(this.event.target);
		}
	}
}
