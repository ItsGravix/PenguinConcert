import ConcertEvent from "@rooms/party6/system/concert_events/ConcertEvent";

export default class CESetProperty extends ConcertEvent {
	execute() {
		super.execute();

		const {target, values} = this.event;

		for (const key in values) {
			this.concert.saveOriginalProperty(target, this.scene[target], key);

			this.scene[target][key] = values[key];

			if (this.scene[target].handleSetProperty) {
				this.scene[target].handleSetProperty(key, values[key]);
			}
		}
	}
}
