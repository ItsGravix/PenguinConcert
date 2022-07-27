
// You can write more code here
import ContainerElement from "@interface/elements/phaser/ContainerElement";
/* START OF COMPILED CODE */

export default class P6Fire1 extends ContainerElement {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		/** @type {Phaser.GameObjects.Sprite} */
		this.party6_fire1_1_1_0007;
		/** @type {Phaser.GameObjects.Sprite} */
		this.party6_fire1_1_1_0007_1;
		/** @type {Phaser.GameObjects.Sprite} */
		this.party6_fire1_1_1_0007_2;
		/** @type {Phaser.GameObjects.Sprite} */
		this.party6_fire1_1_1_0007_3;
		/** @type {Phaser.GameObjects.Sprite} */
		this.party6_fire1_1_1_0007_4;
		/** @type {Phaser.GameObjects.Sprite} */
		this.explosion;
		/** @type {Phaser.GameObjects.Sprite[]} */
		this.fires;


		// party6_fire1_platform2
		const party6_fire1_platform2 = scene.add.image(0, 0, "party6@4x", "party6/fire1/platform2");
		this.add(party6_fire1_platform2);

		// party6_fire1_platform1
		const party6_fire1_platform1 = scene.add.image(124, -15, "party6@4x", "party6/fire1/platform1");
		this.add(party6_fire1_platform1);

		// party6_fire1_platform1_1
		const party6_fire1_platform1_1 = scene.add.image(62, -15, "party6@4x", "party6/fire1/platform1");
		this.add(party6_fire1_platform1_1);

		// party6_fire1_platform1_2
		const party6_fire1_platform1_2 = scene.add.image(0, -15, "party6@4x", "party6/fire1/platform1");
		this.add(party6_fire1_platform1_2);

		// party6_fire1_platform1_3
		const party6_fire1_platform1_3 = scene.add.image(-62, -15, "party6@4x", "party6/fire1/platform1");
		this.add(party6_fire1_platform1_3);

		// party6_fire1_platform1_4
		const party6_fire1_platform1_4 = scene.add.image(-124, -15, "party6@4x", "party6/fire1/platform1");
		this.add(party6_fire1_platform1_4);

		// party6_fire1_1_1_0007
		const party6_fire1_1_1_0007 = scene.add.sprite(-128, -191, "party6@4x", "party6/fire1/1/1_0007");
		this.add(party6_fire1_1_1_0007);

		// party6_fire1_1_1_0007_1
		const party6_fire1_1_1_0007_1 = scene.add.sprite(-66, -191, "party6@4x", "party6/fire1/1/1_0007");
		this.add(party6_fire1_1_1_0007_1);

		// party6_fire1_1_1_0007_2
		const party6_fire1_1_1_0007_2 = scene.add.sprite(-4, -191, "party6@4x", "party6/fire1/1/1_0007");
		this.add(party6_fire1_1_1_0007_2);

		// party6_fire1_1_1_0007_3
		const party6_fire1_1_1_0007_3 = scene.add.sprite(58, -191, "party6@4x", "party6/fire1/1/1_0007");
		this.add(party6_fire1_1_1_0007_3);

		// party6_fire1_1_1_0007_4
		const party6_fire1_1_1_0007_4 = scene.add.sprite(119, -191, "party6@4x", "party6/fire1/1/1_0007");
		this.add(party6_fire1_1_1_0007_4);

		// explosion
		const explosion = scene.add.sprite(0, -171, "party6@4x", "party6/fire1/2/1_0001");
		explosion.scaleX = 1.5278138337087568;
		explosion.scaleY = 1.5278138337087568;
		explosion.visible = false;
		this.add(explosion);

		// lists
		const fires = [party6_fire1_1_1_0007, party6_fire1_1_1_0007_4, party6_fire1_1_1_0007_3, party6_fire1_1_1_0007_2, party6_fire1_1_1_0007_1];

		this.party6_fire1_1_1_0007 = party6_fire1_1_1_0007;
		this.party6_fire1_1_1_0007_1 = party6_fire1_1_1_0007_1;
		this.party6_fire1_1_1_0007_2 = party6_fire1_1_1_0007_2;
		this.party6_fire1_1_1_0007_3 = party6_fire1_1_1_0007_3;
		this.party6_fire1_1_1_0007_4 = party6_fire1_1_1_0007_4;
		this.explosion = explosion;
		this.fires = fires;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this._init();
		/* END-USER-CTR-CODE */
	}


	/* START-USER-CODE */

	// Write your code here.

	_init() {
		this.resetProp();
	}

	resetProp() {
		for (let i = 0; i < this.fires.length; i++) {
			this.fires[i].setVisible(false);
		}

		this.explosion.setVisible(false);
	}

	setFireState(state, event) {
		this.setVisible(true);
		switch (state) {
			case 'on': {
				event.tickHandler.playManagedAnimation(event, this.explosion, 'party6/fire1/explode');
				this.playFires('party6/fire1/on', event);
				break;
			}
			case 'off': {
				this.playFires('party6/fire1/off', event);
				break;
			}
			case 'onoff': {
				event.tickHandler.playManagedAnimation(event, this.explosion, 'party6/fire1/explode');
				this.playFires('party6/fire1/onoff', event);
				break;
			}
		}
	}

	playFires(animKey, event) {
		for (let i = 0; i < this.fires.length; i++) {
			event.tickHandler.playManagedAnimation(event, this.fires[i], animKey);
			//this.fires[i].play(animKey);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
