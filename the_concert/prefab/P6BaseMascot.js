
// You can write more code here
import ContainerElement from "@interface/elements/phaser/ContainerElement";


/* START OF COMPILED CODE */


export default class P6BaseMascot extends ContainerElement {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// v_speech
		const v_speech = scene.add.container(0, 0);
		this.add(v_speech);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this._init();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	_init() {
		this.mascotName = undefined;
	}

	onMascotInit() {
		this.resetProp();
	}

	resetProp() {
		this.setStatePlay();
	}

	setStateInvisible() {
		this.setStatePlay(false);
		this.setStateWave(false);
	}

	setStatePlay(enable = true) {
		if (!this.v_play) {
			return;
		}
		if (enable) {
			this.setStateInvisible();
			this.v_play.setVisible(true);
			this.c_play.play(`party6/${this.mascotName}/play`);
		} else {
			this.v_play.setVisible(false);
			this.c_play.stop();
		}
	}

	setStateWave(enable = true) {
		if (!this.v_wave) {
			return;
		}
		if (enable) {
			this.setStateInvisible();
			this.v_wave.setVisible(true);
			if (this.c_wave)
				this.c_wave.play(`party6/${this.mascotName}/wave`);
		} else {
			this.v_wave.setVisible(false);
			if (this.c_wave)
				this.c_wave.stop();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
