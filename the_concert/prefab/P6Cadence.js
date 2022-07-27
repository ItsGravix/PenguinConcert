
// You can write more code here

import P6BaseMascot from "@rooms/party6/prefab/P6BaseMascot";
/* START OF COMPILED CODE */


export default class P6Cadence extends P6BaseMascot {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		/** @type {Phaser.GameObjects.Container} */
		this.v_wave;
		/** @type {Phaser.GameObjects.Container} */
		this.v_play;
		/** @type {Phaser.GameObjects.Sprite} */
		this.c_play;


		// v_wave
		const v_wave = scene.add.container(0, 0);
		v_wave.visible = false;
		this.add(v_wave);

		// party6_band_cadence_play_1_0121
		const party6_band_cadence_play_1_0121 = scene.add.image(0, 0, "party6@4x", "party6/band/cadence/play/1_0121");
		v_wave.add(party6_band_cadence_play_1_0121);

		// v_play
		const v_play = scene.add.container(0, 0);
		this.add(v_play);

		// c_play
		const c_play = scene.add.sprite(0, 0, "party6@4x", "party6/band/cadence/play/1_0001");
		v_play.add(c_play);

		this.v_wave = v_wave;
		this.v_play = v_play;
		this.c_play = c_play;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.mascotName = 'cadence';
		this.onMascotInit();
		/* END-USER-CTR-CODE */
	}


	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
