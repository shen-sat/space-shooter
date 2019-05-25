class LevelOne extends Phaser.Scene {

	constructor() {
		super({key: 'LevelOne'});
	}

	preload() {
		this.load.image('desert', 'assets/desert.png');
		this.load.spritesheet('ship', 'assets/ship_spritesheet.png', { frameWidth: 16, frameHeight: 24 }, 10);
	}

	create() {
		this.keys = this.input.keyboard.createCursorKeys();
		this.image = this.add.image(256/2, 272/2, 'desert');
		this.ship = this.add.sprite(256/2, 272/2, 'ship');
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('ship', { frames: [2,7]}),
			frameRate: 6,
			repeat: -1
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('ship', { frames: [3,8,4,9]}),
			frameRate: 6,
			repeat: 0
		});

		this.anims.create({
			key: 'far-right',
			frames: this.anims.generateFrameNumbers('ship', { frames: [9,4]}),
			frameRate: 6,
			repeat: 0
		});

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('ship', { frames: [1,6,0,5]}),
			frameRate: 6,
			repeat: 0
		});

		this.anims.create({
			key: 'far-left',
			frames: this.anims.generateFrameNumbers('ship', { frames: [5,0]}),
			frameRate: 6,
			repeat: 0
		});
	};

	update() {	
		if (this.keys.right.isDown)	{
			this.rightSpeedFactor = 0.1 + Math.min(1.4, Math.max(0, this.rightSpeedFactor));
			this.leftSpeedFactor = Math.min(1.4, Math.max(0.04, this.leftSpeedFactor)) - 0.04;
			this.isLeftAnimationFinished = false; 
			if (this.isRightAnimationFinished == false) {
				this.ship.anims.play('right', true);	
			} else {
				this.ship.anims.play('far-right', true);	
			};
			if (this.ship.anims.getCurrentKey() == 'right' && this.ship.anims.getProgress() == 1) {
				this.isRightAnimationFinished = true;
			}
		} else if (this.keys.left.isDown)	{
			this.leftSpeedFactor = 0.1 + Math.min(1.4, Math.max(0, this.leftSpeedFactor));
			this.rightSpeedFactor = Math.min(1.4, Math.max(0.04, this.rightSpeedFactor)) - 0.04;
			this.isRightAnimationFinished = false; 
			if (this.isLeftAnimationFinished == false) {
				this.ship.anims.play('left', true);	
			} else {
				this.ship.anims.play('far-left', true);	
			};
			if (this.ship.anims.getCurrentKey() == 'left' && this.ship.anims.getProgress() == 1) {
				this.isLeftAnimationFinished = true;
			}
		} else {
			this.ship.anims.play('idle', true);
			this.isRightAnimationFinished = false;
			this.isLeftAnimationFinished = false;
			this.leftSpeedFactor = Math.min(1.4, Math.max(0.04, this.leftSpeedFactor)) - 0.04;
			this.rightSpeedFactor = Math.min(1.4, Math.max(0.04, this.rightSpeedFactor)) - 0.04;
			
		}

		this.ship.x += this.rightSpeedFactor;
		this.ship.x -= this.leftSpeedFactor;
	};
}