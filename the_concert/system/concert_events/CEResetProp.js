import ConcertEvent from "@rooms/party6/system/concert_events/ConcertEvent";

export default class CEResetProp extends ConcertEvent {
	execute() {
		super.execute();

		const {target} = this.event;
		const sceneTarget = this.scene[target];

		sceneTarget.resetProp();
	}
}
