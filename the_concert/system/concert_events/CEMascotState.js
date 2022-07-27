import ConcertEvent from "@rooms/party6/system/concert_events/ConcertEvent";

export default class CEMascotState extends ConcertEvent {
	execute() {
		super.execute();

		const {target, state} = this.event;
		const sceneTarget = this.scene[target];

		switch (state) {
			case 'play': {
				sceneTarget.setStatePlay.apply(sceneTarget, [true]);
				break;
			}
			case 'wave': {
				sceneTarget.setStateWave.apply(sceneTarget, [true]);
				break;
			}
			case 'default': {
				sceneTarget.setStateInvisible.apply(sceneTarget, []);
				break;
			}
		}
	}
}
