class LevelOne extends Phaser.Scene {

	constructor() {
		super({key: 'LevelOne'});
	}

	preload() {
		this.load.image('desert', 'assets/desert-large.png');
		this.load.image('ship', 'assets/ship-medium.png')
		// this.load.spritesheet('ship', 'assets/ship_spritesheet.png', { frameWidth: 16, frameHeight: 24 }, 10);
	}

	create() {
		this.keys = this.input.keyboard.createCursorKeys();
		this.image = this.add.image(256, 272, 'desert');
		this.ship = this.add.image(256, 272, 'ship');
		//animations
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('ship', { frames: [2,7]}),
			frameRate: 6,
			repeat: -1
		});
		//movement
		this.speed = 0;
		this.speedFactor = 0.1;
		this.speedUpperLimit = 1.5;
		this.speedLowerLimit = -1.5;
		this.compareMode = false;
	};

	update() {	
		if (this.keys.right.isDown)	{
			this.speed = Math.min(this.speedUpperLimit, this.speed) + this.speedFactor;
		} else if (this.keys.left.isDown) {
			this.speed = Math.max(this.speedLowerLimit, this.speed) - this.speedFactor;
		};
		this.ship.x += this.speed;
	};
}