
// You can write more code here
import ContainerElement from "@interface/elements/phaser/ContainerElement";
/* START OF COMPILED CODE */

export default class P6Fire2 extends ContainerElement {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		/** @type {Phaser.GameObjects.Image} */
		this.shadow;
		/** @type {Phaser.GameObjects.Image} */
		this.base;
		/** @type {Phaser.GameObjects.Sprite} */
		this.fire;


		// shadow
		const shadow = scene.add.image(0, 0, "party6@4x", "party6/fire2/shadow");
		this.add(shadow);

		// base
		const base = scene.add.image(0, -11, "party6@4x", "party6/fire1/platform1");
		this.add(base);

		// fire
		const fire = scene.add.sprite(1, -120, "party6@4x", "party6/fire2/1/1_0016");
		this.add(fire);

		this.shadow = shadow;
		this.base = base;
		this.fire = fire;

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
		this.fire.setVisible(false);
	}

	setShowBase(show, event) {
		this.base.setVisible(show);
		this.shadow.setVisible(show);
	}

	setFireState(state, event) {
		this.setVisible(true);
		switch (state) {
			case 'on': {
				event.tickHandler.playManagedAnimation(event, this.fire, 'party6/fire2/on');
				//this.fire.play('party6/fire2/on');
				break;
			}
			case 'off': { // it's too short to turn off lol
				//this.fire.setVisible(false);
				break;
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
