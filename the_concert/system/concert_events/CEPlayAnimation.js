import ConcertEvent from "@rooms/party6/system/concert_events/ConcertEvent";

export default class CEPlayAnimation extends ConcertEvent {
	execute() {
		super.execute();

		const {target, animationKey} = this.event;
		const sceneTarget = this.scene[target];

		// Disable property to prevent from playing on reset
		this.concert.saveOriginalProperty(target, sceneTarget, 'playAnimationKey', 'DISABLED');
		this.concert.saveOriginalProperty(target, sceneTarget, 'visible');
		this.concert.saveOriginalProperty(target, sceneTarget, 'frame');
		this.concert.saveOriginalProperty(target, sceneTarget, 'texture');
		sceneTarget.play(animationKey);

		// Fast forward this tween if it was supposed to run a few seconds ago or is from a past state
		let secondsDiff = this.tickHandler.getCurrentStateSeconds() - this.secondData.second;
		const animation = sceneTarget.anims;

		if (secondsDiff > animation.duration / 1000 || this.concert.currentStateId !== this.stateData.id) {
			animation.setProgress(1);
		}
	}
}
