const config = {
	type: Phaser.AUTO,
	width: 256,
	height: 272,
	pixelArt: true,
	parent: 'foobar',
	autoCenter: Phaser.Scale.Center.CENTER_BOTH,
	physics: {
		default: 'arcade'
	},
	scene: [ LevelOne ]
};

const game = new Phaser.Game(config);