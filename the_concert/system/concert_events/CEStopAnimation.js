import ConcertEvent from "@rooms/party6/system/concert_events/ConcertEvent";

export default class CEStopAnimation extends ConcertEvent {
	execute() {
		super.execute();

		const {target} = this.event;
		const sceneTarget = this.scene[target];

		if (sceneTarget.anims.currentAnim) {
			this.concert.saveOriginalProperty(target, sceneTarget, 'playAnimationKey', sceneTarget.anims.currentAnim.key);
		}

		sceneTarget.stop();
	}
}
