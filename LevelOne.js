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
		this.gameWindowWidth = this.sys.game.config.width;
		this.keys = this.input.keyboard.createCursorKeys();
		this.background = this.add.tileSprite(256, 272, 512, 544, 'desert');
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
		this.resetScrollFactor = 2;
		this.accelerateScrollFactor = 1;
		this.brakeScrollFactor = 0.5;
	};

	update() {
		this.shipLeftEdge = this.ship.x - (this.ship.width/2);
		this.shipRightEdge = this.ship.x + (this.ship.width/2);
		this.scrollFactor = this.resetScrollFactor;	
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
			this.scrollFactor -= this.brakeScrollFactor;
		} else if (this.keys.up.isDown) {
			this.verticalSpeed = Math.max(this.speedLowerLimit, this.verticalSpeed) - this.speedFactor;
			this.scrollFactor += this.accelerateScrollFactor;
		} else {
			if (this.verticalSpeed > 0) {
				this.verticalSpeed = Math.max(0,(this.verticalSpeed - this.brakeSpeed));
			} else {
				this.verticalSpeed = Math.min(0,(this.verticalSpeed + this.brakeSpeed));
			};
		};
		
		this.ship.y += this.verticalSpeed; 
		this.shipWithinGameWindow() ? this.ship.x += this.lateralSpeed : this.lateralSpeed = 0;
		this.background.tilePositionY -= this.scrollFactor;
		
	};

	shipWithinGameWindow() {
		return this.shipLeftEdge + this.lateralSpeed > 0 && this.shipRightEdge + this.lateralSpeed < this.gameWindowWidth;
	};
}