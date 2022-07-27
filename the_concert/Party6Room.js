
// You can write more code here


/* START OF COMPILED CODE */

import RoomScene from "../../../system/room/RoomScene";
import P6Fire1 from "./prefab/P6Fire1";
import P6Lights2 from "./prefab/P6Lights2";
import PlayAnimation from "../../../system/components/PlayAnimation";
import ButtonComponent from "../../../system/components/ButtonComponent";
import ItemPickup from "../../../system/components/ItemPickup";
import DoorComponent from "../../../system/components/DoorComponent";
import P6Fire2 from "./prefab/P6Fire2";
import P6Petey from "./prefab/P6Petey";
import P6Franky from "./prefab/P6Franky";
import P6Cadence from "./prefab/P6Cadence";
import P6Bob from "./prefab/P6Bob";
import P6Billy from "./prefab/P6Billy";
import P6Lights1 from "./prefab/P6Lights1";

/* START-USER-IMPORTS */
import TextInput from "@interface/elements/TextInput";
import BaseConcert from "@rooms/party6/system/BaseConcert";
/* END-USER-IMPORTS */

export default class Party6Room extends RoomScene {

	constructor() {
		super("Party6Room");

		/** @type {Phaser.GameObjects.Image} */
		this.spawnpoint;
		/** @type {Phaser.GameObjects.Image} */
		this.sky;
		/** @type {Phaser.GameObjects.Image} */
		this.hallo_sky;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.sky_color;
		/** @type {P6Fire1} */
		this.fire1_3;
		/** @type {P6Fire1} */
		this.fire1_2;
		/** @type {P6Fire1} */
		this.fire1_1;
		/** @type {P6Lights2} */
		this.lights2_1;
		/** @type {P6Lights2} */
		this.lights2_2;
		/** @type {Phaser.GameObjects.Container} */
		this.v_back_ghosts;
		/** @type {Phaser.GameObjects.Image} */
		this.background;
		/** @type {Phaser.GameObjects.Image} */
		this.ground_confetti;
		/** @type {Phaser.GameObjects.Sprite} */
		this.gift_bottom;
		/** @type {Phaser.GameObjects.Sprite} */
		this.gift_confetti;
		/** @type {Phaser.GameObjects.Sprite} */
		this.gift_top;
		/** @type {P6Fire2} */
		this.fire2_2;
		/** @type {P6Fire2} */
		this.fire2_1;
		/** @type {P6Petey} */
		this.c_petey;
		/** @type {P6Franky} */
		this.c_franky;
		/** @type {P6Cadence} */
		this.c_cadence;
		/** @type {P6Bob} */
		this.c_bob;
		/** @type {P6Billy} */
		this.c_billy;
		/** @type {Phaser.GameObjects.Image} */
		this.foreground1;
		/** @type {Phaser.GameObjects.Image} */
		this.darkness;
		/** @type {Phaser.GameObjects.Image} */
		this.darkness2;
		/** @type {P6Lights1} */
		this.lights1_1;
		/** @type {P6Lights1} */
		this.lights1_2;
		/** @type {Phaser.GameObjects.Sprite} */
		this.spark2_1;
		/** @type {Phaser.GameObjects.Sprite} */
		this.spark2_2;
		/** @type {Phaser.GameObjects.Sprite} */
		this.spark1_1;
		/** @type {Phaser.GameObjects.Sprite} */
		this.spark1_2;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.foreground_color;
		/** @type {P6Fire2} */
		this.fire2_9;
		/** @type {P6Fire2} */
		this.fire2_8;
		/** @type {P6Fire2} */
		this.fire2_7;
		/** @type {P6Fire2} */
		this.fire2_6;
		/** @type {P6Fire2} */
		this.fire2_5;
		/** @type {P6Fire2} */
		this.fire2_4;
		/** @type {P6Fire2} */
		this.fire2_3;
		/** @type {Phaser.GameObjects.Container} */
		this.v_debug;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.second_search;
		/** @type {P6Fire1} */
		this.fire1_4;
		/** @type {P6Fire1} */
		this.fire1_5;
		/** @type {Phaser.GameObjects.Image} */
		this.spider;
		/** @type {Phaser.GameObjects.Image} */
		this.ghost_3;
		/** @type {Phaser.GameObjects.Image} */
		this.ghost_2;
		/** @type {Phaser.GameObjects.Image} */
		this.ghost_1;
		/** @type {Phaser.GameObjects.Sprite} */
		this.blueghost;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.giveaway_btn;
		/** @type {Phaser.GameObjects.Image[]} */
		this.hallo_objects;


		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	_create() {
		// Create all the game objects declared in the constructor.
		// [REDACTED :(]
	}


	/* START-USER-CODE */

	// Write your code here.

	create() {
		this._create();

		this.concert = new BaseConcert(this);
		this.concert.start();

		this.createDebug();
	}

	createDebug() {
		this.debug = false;

		if (!this.debug) {
			this.v_debug.setVisible(false);
			return;
		}
		this.secondInput = new TextInput(this, 'burbanksmallbold', {
			x: this.second_search.x,
			y: this.second_search.y,
			width: this.second_search.displayWidth,
			maxWidth: this.second_search.displayWidth,
			height: this.second_search.displayHeight,
			align: 0,
			size: 24,
			textTint: 0xFFFFFF,
			cursorColor: 0xFFFFFF,
			outline: false,
			maxlength: 16,
			backgroundAlpha: 0,
			movable: true,
			specialContainer: this.v_debug
		});
	}

	debugPause() {
		this.pauseFlag = !this.pauseFlag;

		if (this.pauseFlag) {
			this.previousStage = this.concert.currentStateId;
			this.previousSeconds = this.concert.tickHandler.getCurrentStateSeconds();

			if (this.concert.currentSong)
				this.concert.currentSong.pause();
		} else {
			this.debugStage(this.previousStage, this.previousSeconds);
		}
	}

	debugStage(stage, seconds = 0) {
		this.emitPacket('player:message', `!concert ${stage},${seconds}`);
	}

	onSearchBtn() {
		let stage = this.concert.currentStateId;
		let seconds = this.secondInput.value;

		if (this.concert.getCurrentStateData().bpm) {

		}

		this.emitPacket('player:message', `!concert ${stage},${seconds}`);
	}

	emitPacket() {
		// emit packet
		// [REDACTED]
	}

	resetRoom() {

	}

	onGiftButton() {
		if (this.showedGift) {
			return;
		}

		this.showedGift = true;
		this.gift_top.play('party6/gift/top');
		this.gift_bottom.play('party6/gift/bottom');
		this.gift_confetti.play('party6/confetti');
	}

	onGiveawayButton() {
		// give gift
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
