import ConcertEvent from "@rooms/party6/system/concert_events/ConcertEvent";

export default class CESpeechBubbleHide extends ConcertEvent {
	execute() {
		super.execute();

		const id = this.event.id;

		this.tickHandler.stopSpeechBubble(id);
	}
}
