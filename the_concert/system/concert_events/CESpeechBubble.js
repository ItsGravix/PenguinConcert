import ConcertEvent from "@rooms/party6/system/concert_events/ConcertEvent";
import SpeechBubble from "@player/SpeechBubble";

export default class CESpeechBubble extends ConcertEvent {
	execute() {
		super.execute();

		const target = this.event.target;
		const id = this.event.id;
		let offsetX = this.event.offsetX ? this.event.offsetX : 0;
		let offsetY = this.event.offsetY ? this.event.offsetY : 0;
		const text = this.event.text;
		const emote = this.event.emote;
		let duration = this.event.duration ? this.event.duration : 5000;

		let secondsDiff = this.tickHandler.getCurrentStateSeconds() - this.secondData.second;

		if (secondsDiff > 1 || this.concert.currentStateId !== this.stateData.id) {
			if (this.concert.currentStateId === this.stateData.id) {
				duration = Math.max(0, duration - (secondsDiff * 1000));
			} else {
				duration = 0;
			}
		}

		this.tickHandler.stopSpeechBubble(id);

		if (duration === 0) {
			return;
		}

		if (target) {
			const sceneTarget = this.scene[target];

			offsetX += sceneTarget.x;
			offsetY += sceneTarget.y;
		}

		let activeSpeechBubble = new SpeechBubble(this.scene, offsetX, offsetY - 60);
		activeSpeechBubble.show(text, emote);

		if (this.scene.speechContainer) {
			this.scene.speechContainer.add(activeSpeechBubble);
		}

		this.tickHandler.speechBubbles[id] = activeSpeechBubble;

		this.scene.time.delayedCall(duration, () => {
			activeSpeechBubble.destroy();
			activeSpeechBubble = null;
		}, this);
	}
}
