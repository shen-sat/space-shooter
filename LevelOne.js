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
		this.gameWindowHeight = this.sys.game.config.height;
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
		//Work out object positions
		this.shipLeftEdge = this.ship.x - this.ship.width/2;
		this.shipRightEdge = this.ship.x + this.ship.width/2;
		this.shipTopEdge = this.ship.y - this.ship.height/2;
		this.shipBottomEdge = this.ship.y + this.ship.height/2 - 16;
		this.scrollFactor = this.resetScrollFactor;	
		//Controls
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
		//Kill movement if ship out of bounds
		if (!this.shipWithinGameWindowWidth()) {
			this.lateralSpeed = 0;	
		};
		if (!this.shipWithinGameWindowHeight()) {
			this.verticalSpeed = 0;	
		};
		 //Apply speed to ship
		this.ship.x += this.lateralSpeed;
		this.ship.y += this.verticalSpeed;
		//Scroll background
		this.background.tilePositionY -= this.scrollFactor;
		
		
	};

	shipWithinGameWindowWidth() {
		return this.shipLeftEdge + this.lateralSpeed > 0 && this.shipRightEdge + this.lateralSpeed < this.gameWindowWidth;
	};

	shipWithinGameWindowHeight() {
		return this.shipTopEdge + this.verticalSpeed > 0 && this.shipBottomEdge + this.verticalSpeed < this.gameWindowHeight; 
	};

}