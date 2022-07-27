import ConcertEvent from "@rooms/party6/system/concert_events/ConcertEvent";

export default class CETween extends ConcertEvent {
	// javascript-obfuscator:disable
	execute() {
		// javascript-obfuscator:disable
		super.execute();

		const {tween} = this.event;

		this.tickHandler.playManagedTween(tween, this.secondData.second, this.stateData.id)
	}
}
