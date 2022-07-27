
// You can write more code here
import ContainerElement from "@interface/elements/phaser/ContainerElement";
import PlayAnimation from "@components/PlayAnimation";
/* START OF COMPILED CODE */

export default class P6Lights2 extends ContainerElement {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		/** @type {Phaser.GameObjects.Sprite} */
		this.light;


		// party6_lights2_bulb0001
		const party6_lights2_bulb0001 = scene.add.image(134.37054443359375, 26.745214462280273, "party6@4x", "party6/lights2/bulb0001");
		party6_lights2_bulb0001.tintTopLeft = 10395294;
		party6_lights2_bulb0001.tintTopRight = 10395294;
		party6_lights2_bulb0001.tintBottomLeft = 10395294;
		party6_lights2_bulb0001.tintBottomRight = 10395294;
		this.add(party6_lights2_bulb0001);

		// light
		const light = scene.add.sprite(156, 29, "party6@4x", "party6/lights2/1/1_0001");
		light.scaleX = 2;
		light.scaleY = 2;
		light.alpha = 0.6;
		light.alphaTopLeft = 0.6;
		light.alphaTopRight = 0.6;
		light.alphaBottomLeft = 0.6;
		light.alphaBottomRight = 0.6;
		light.tintTopLeft = 10934783;
		light.tintTopRight = 10934783;
		light.tintBottomLeft = 10934783;
		light.tintBottomRight = 10934783;
		this.add(light);

		// light (components)
		const lightPlayAnimation = new PlayAnimation(light);
		lightPlayAnimation.playAnimationKey = "party6/lights2";
		lightPlayAnimation.showCursor = false;

		this.light = light;

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
		this.prop_alternate_colors = [];
		this.prop_light_visible = true;

		this.alternateColorId = 0;
		this.strobeFlag = true;

		this.COLORS = {
			WHITE: 0xFFF7D9,
			RED: 0xFFA0B3,
			BLUE: 0xA6D9FF,
			PURPLE: 0xE4ABFF,
			GREEN: 0xADFFBC,
		}

		this.createRandomTimer();
		this.createStrobeTimer();
	}

	/**
	 * Reset prop called by concert.
	 */
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

		this.light.setTint(this.getRandomColor());
	}

	getRandomColor() {
		const keys = Object.keys(this.COLORS)

		return this.COLORS[keys[mathUtils.randomInt(0, keys.length - 1)]];
	}

	playColor(color) {
		color = this.COLORS[color];

		this.light.setTint(color);
	}

	setLightVisible(visible, event) {
		event ? (this.targetName = event.event.target) : null;

		this.saveProperties();

		this.prop_light_visible = visible;

		this.light.setVisible(visible);
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
