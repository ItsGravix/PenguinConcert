import ConcertEvent from "@rooms/party6/system/concert_events/ConcertEvent";

export default class CESetPropColor extends ConcertEvent {
	execute() {
		super.execute();

		const {target, color} = this.event;
		const sceneTarget = this.scene[target];

		sceneTarget.setPropColor(color, this);
	}
}
