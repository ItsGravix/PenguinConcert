import ConcertEvent from "@rooms/party6/system/concert_events/ConcertEvent";

export default class CECallPropFunction extends ConcertEvent {
	execute() {
		super.execute();

		const {target, name, args} = this.event;
		const sceneTarget = this.scene[target];

		if (!sceneTarget[name]) {
			return console.error('[CECallFunction] Undefined function', name);
		}

		sceneTarget[name].apply(sceneTarget, [...args, this]);
	}
}
