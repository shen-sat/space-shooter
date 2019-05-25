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
		};
	};
}