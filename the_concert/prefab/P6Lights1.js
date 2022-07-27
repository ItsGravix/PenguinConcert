
// You can write more code here
import ContainerElement from "@interface/elements/phaser/ContainerElement";
/* START OF COMPILED CODE */

export default class P6Lights1 extends ContainerElement {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		/** @type {Phaser.GameObjects.Image} */
		this.light3;
		/** @type {Phaser.GameObjects.Image} */
		this.light2;
		/** @type {Phaser.GameObjects.Image} */
		this.light1;


		// party6_lights1_base
		const party6_lights1_base = scene.add.image(9, 28, "party6@4x", "party6/lights1/base");
		this.add(party6_lights1_base);

		// light3
		const light3 = scene.add.image(230, 143, "party6@4x", "party6/lights1/light");
		light3.scaleX = 0.8850571355403131;
		light3.scaleY = 0.8850571355403131;
		this.add(light3);

		// light2
		const light2 = scene.add.image(124, 163, "party6@4x", "party6/lights1/light");
		light2.scaleX = 0.9736070264513931;
		light2.scaleY = 0.9736070264513931;
		this.add(light2);

		// light1
		const light1 = scene.add.image(16, 177, "party6@4x", "party6/lights1/light");
		this.add(light1);

		// rectangle
		const rectangle = scene.add.rectangle(-125, -93, 2, 128);
		rectangle.isFilled = true;
		rectangle.fillColor = 0;
		this.add(rectangle);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(138, -103, 2, 128);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0;
		this.add(rectangle_1);

		// rectangle_1_1
		const rectangle_1_1 = scene.add.rectangle(91, -109, 2, 128);
		rectangle_1_1.isFilled = true;
		rectangle_1_1.fillColor = 0;
		this.add(rectangle_1_1);

		// rectangle_1_1_1
		const rectangle_1_1_1 = scene.add.rectangle(-78, -86, 2, 128);
		rectangle_1_1_1.isFilled = true;
		rectangle_1_1_1.fillColor = 0;
		this.add(rectangle_1_1_1);

		this.light3 = light3;
		this.light2 = light2;
		this.light1 = light1;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this._init();
		/* END-USER-CTR-CODE */
	}


	/* START-USER-CODE */

	// Write your code here.

	_init() {
		this.prop_color = 'BLUE';
		this.prop_strobe_delay = -1;
		this.prop_random_delay = 1000;
		this.prop_light_visible = true;
		this.prop_alternate_colors = [];

		this.alternateColorId = 0;
		this.strobeFlag = true;
		this.targetName = undefined;

		this.COLORS = {
			WHITE: 0xFFF7D9,
			RED: 0xFFA0B3,
			BLUE: 0xA6D9FF,
			PURPLE: 0xE4ABFF,
			GREEN: 0xADFFBC,
			YELLOW: 0xE2E252,
			DARK_PINK: 0xF086AA,
			PINK: 0xF7C7D7,
			GRAY_PURPLE: 0xC2C0DA,
			ANNI5_ORANGE: 0xf07b3c,
			ANNI5_BLUE: 0x71A1D6,
			HOT_RED: 0xff0e0e,
			BROWN: 0x9d7463,
			DARK_GREEN: 0x01ff14,
			DARK_PURPLE: 0xbc2dff,
		}

		this.createRandomTimer();
		this.createStrobeTimer();
	}

	/**
	 * Reset prop called by concert.
	 */
	resetProp() {
		this.setPropColor(this.prop_color);
		this.setLightVisible(true);
	}

	createRandomTimer() {
		this.randomTimer = this.scene.time.addEvent({
			delay: this.prop_random_delay === -1 ? 50 : this.prop_random_delay,
			callback: this.onRandomTick,
			callbackScope: this,
			loop: true,
		});
	}

	removeRandomTimer() {
		if (this.randomTimer) {
			this.randomTimer.remove();
		}
	}

	createStrobeTimer() {
		this.strobeTimer = this.scene.time.addEvent({
			delay: this.prop_strobe_delay === -1 ? 50 : this.prop_strobe_delay,
			callback: this.onStrobeTick,
			callbackScope: this,
			loop: true,
		});
	}

	removeStrobeTimer() {
		if (this.strobeTimer) {
			this.strobeTimer.remove();
		}
	}

	resetStrobeTick() {
		//this.strobeFlag = true;
		this.removeStrobeTimer();
		this.createStrobeTimer();
		this.onStrobeTick();
	}

	onStrobeTick() {
		if (this.prop_strobe_delay === -1) {
			if (!this.strobeFlag) {
				this.strobeFlag = true;
				this.setLightVisible(this.strobeFlag);
			}
			return;
		}
		if (this.strobeTimer.delay !== this.prop_strobe_delay) {
			this.resetStrobeTick();
		}

		this.strobeFlag = !this.strobeFlag;

		this.setLightVisible(this.strobeFlag);
	}

	resetRandomTick() {
		this.alternateColorId = 0;
		this.removeRandomTimer();
		this.createRandomTimer();
		this.onRandomTick();
	}

	onRandomTick() {
		if (this.prop_random_delay === -1) {
			return;
		}
		if (this.randomTimer.delay !== this.prop_random_delay) {
			this.resetRandomTick();
		}

		const alternateLength = this.prop_alternate_colors.length;

		if (alternateLength > 0) {
			if (this.alternateColorId > alternateLength - 1) {
				this.alternateColorId = 0;
			}

			const color = this.prop_alternate_colors[this.alternateColorId];

			this.setPropColor(color);

			this.alternateColorId++;
			return;
		}

		this.light1.setTint(this.getRandomColor());
		this.light2.setTint(this.getRandomColor());
		this.light3.setTint(this.getRandomColor());
	}

	getRandomColor() {
		const keys = Object.keys(this.COLORS)

		return this.COLORS[keys[mathUtils.randomInt(0, keys.length - 1)]];
	}

	playColor(color) {
		color = this.COLORS[color];

		this.light1.setTint(color);
		this.light2.setTint(color);
		this.light3.setTint(color);
	}

	setLightVisible(visible, event) {
		event ? (this.targetName = event.event.target) : null;

		this.saveProperties();

		this.prop_light_visible = visible;

		this.light1.setVisible(visible);
		this.light2.setVisible(visible);
		this.light3.setVisible(visible);
	}

	setPropColor(color, event) {
		event ? (this.targetName = event.event.target) : null;

		this.saveProperties();
		this.playColor(color.toUpperCase());
	}

	saveProperties() {
		if (!this.targetName)
			return
		this.scene.concert.saveOriginalProperty(this.targetName, this, 'prop_color');
		this.scene.concert.saveOriginalProperty(this.targetName, this, 'prop_random_delay');
		this.scene.concert.saveOriginalProperty(this.targetName, this, 'prop_light_visible');
		this.scene.concert.saveOriginalProperty(this.targetName, this, 'alternateColorId');
		this.scene.concert.saveOriginalProperty(this.targetName, this, 'strobeFlag');
	}

	handleSetProperty(key, value) {
		switch (key) {
			case 'prop_strobe_delay': {
				this.resetStrobeTick();
				break;
			}
			case 'prop_random_delay': {
				this.resetRandomTick();
				break;
			}
			case 'prop_alternate_colors': {
				this.resetRandomTick();
				break;
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
