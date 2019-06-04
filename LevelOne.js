class LevelOne extends Phaser.Scene {

	constructor() {
		super({key: 'LevelOne'});
	}

	preload() {
		this.load.image('desert', 'assets/desert-large.png');
		this.load.image('ship', 'assets/title-screen.png')
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
		this.lateralSpeed = 0;
		this.verticalSpeed = 0;
		this.speedFactor = 0.5;
		this.speedUpperLimit = 4;
		this.speedLowerLimit = -1 * this.speedUpperLimit;
		this.brakeSpeed = 0.15;
	};

	update() {	
		if (this.keys.right.isDown)	{
			this.lateralSpeed = Math.min(this.speedUpperLimit, this.lateralSpeed) + this.speedFactor;
		} else if (this.keys.left.isDown) {
			this.lateralSpeed = Math.max(this.speedLowerLimit, this.lateralSpeed) - this.speedFactor;
		} else {
			if (this.lateralSpeed > 0) {
				this.lateralSpeed = Math.max(0,(this.lateralSpeed - this.brakeSpeed));
			} else {
				this.lateralSpeed = Math.min(0,(this.lateralSpeed + this.brakeSpeed));
			};
		};
		if (this.keys.down.isDown)	{
			this.verticalSpeed = Math.min(this.speedUpperLimit, this.verticalSpeed) + this.speedFactor;
		} else if (this.keys.up.isDown) {
			this.verticalSpeed = Math.max(this.speedLowerLimit, this.verticalSpeed) - this.speedFactor;
		} else {
			if (this.verticalSpeed > 0) {
				this.verticalSpeed = Math.max(0,(this.verticalSpeed - this.brakeSpeed));
			} else {
				this.verticalSpeed = Math.min(0,(this.verticalSpeed + this.brakeSpeed));
			};
		};
		this.ship.y += this.verticalSpeed;
		this.ship.x += this.lateralSpeed;
	};
}