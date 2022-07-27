
// You can write more code here
import P6BaseMascot from "@rooms/party6/prefab/P6BaseMascot";


/* START OF COMPILED CODE */

export default class P6Bob extends P6BaseMascot {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		/** @type {Phaser.GameObjects.Container} */
		this.v_wave;
		/** @type {Phaser.GameObjects.Sprite} */
		this.c_wave;
		/** @type {Phaser.GameObjects.Container} */
		this.v_play;
		/** @type {Phaser.GameObjects.Sprite} */
		this.c_play;


		// v_wave
		const v_wave = scene.add.container(-9, 2);
		v_wave.visible = false;
		this.add(v_wave);

		// c_wave
		const c_wave = scene.add.sprite(21, -3, "party6@4x", "party6/band/bob/wave/1_0001");
		v_wave.add(c_wave);

		// v_play
		const v_play = scene.add.container(0, 0);
		this.add(v_play);

		// c_play
		const c_play = scene.add.sprite(0, 0, "party6@4x", "party6/band/bob/play/1_0001");
		v_play.add(c_play);

		this.v_wave = v_wave;
		this.c_wave = c_wave;
		this.v_play = v_play;
		this.c_play = c_play;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.mascotName = 'bob';
		this.onMascotInit();
		/* END-USER-CTR-CODE */
	}


	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
