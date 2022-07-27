export default class ConcertEventFunctions {
	constructor(concert) {
		this.concert = concert;
		this.scene = concert.scene;

		this.snowTimer = undefined;
		this.ghostsIds = 0;
	}

	startSnow() {
		this.snowTimer = this.scene.time.addEvent({
			delay: 500,
			callback: () => {
				this.startSnow();

				this.scene.add.image(220, 220, 'party6@4x', 'party6/snowflake');
			},
			callbackScope: this
		});
	}

	randomBackGhost(duration, event) {
		const x = mathUtils.randomInt(64, 1462);
		const y = mathUtils.randomInt(58, 274);

		const ghostName = `bgh_${this.ghostsIds}`;
		const ghost = this.scene.add.image(x, y, 'party6@4x', `party6/hallo/ghost${mathUtils.randomInt(1, 3)}`);

		this.scene.v_back_ghosts.add(ghost);
		this.scene[ghostName] = ghost;

		ghost.setAlpha(0);

		const tween = {
			"targets": [
				ghostName
			],
			"alpha": {"from": 0, "to": 0.5},
			"ease": "Phaser.Math.Easing.Expo.Out",
			"duration": duration,
			"yoyo": true,
			"onComplete": () => {
				ghost.destroy();
			}
		}

		this.concert.tickHandler.playManagedTween(tween, event.secondData.second, event.stateData.id)

		this.ghostsIds++;
	}

	showHalloween() {
		for (let i = 0; i < this.scene.hallo_objects.length; i++) {
			this.scene.hallo_objects[i].setVisible(true);
		}
	}

	hideHalloween() {
		for (let i = 0; i < this.scene.hallo_objects.length; i++) {
			this.scene.hallo_objects[i].setVisible(false);
		}
	}
}
