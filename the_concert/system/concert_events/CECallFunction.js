import ConcertEvent from "@rooms/party6/system/concert_events/ConcertEvent";

export default class CECallFunction extends ConcertEvent {
	execute() {
		super.execute();

		const {name, args} = this.event;

		if (!this.concert.eventFunctions[name]) {
			return console.error('[CECallFunction] Undefined function', name);
		}

		this.concert.eventFunctions[name].apply(this.concert.eventFunctions, [...args, this]);
	}
}
