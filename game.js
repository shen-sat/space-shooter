const config = {
	type: Phaser.AUTO,
	width: 256 * 2,
	height: 272 * 2,
	pixelArt: true,
	parent: 'foobar',
	autoCenter: Phaser.Scale.Center.CENTER_BOTH,
	physics: {
		default: 'arcade'
	},
	scene: [ LevelOne ]
};

const game = new Phaser.Game(config);