class Character extends MovableObject {
  /**
   * stats for the character
   */
  height = 250;
  y = 80;
  speed = 10;
  idleCounter = 0;
  jumpCounter = 0;
  /**
   * this are coordinates for collision detection
   */
  offset = {
    top: 120,
    left: 40,
    right: 30,
    bottom: 20,
  };

  /**
   * list of images sorted according to addition
   */
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  world;
  walking_sound = new Audio("audio/running.mp3");
  jump_sound = new Audio("audio/jump.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * this function set intervals for the character and the playanimations.
   */
  animate() {
    setStoppableInterval(() => this.moveCharacterRight(), 1000 / 60);

    setStoppableInterval(() => this.moveCharacterLeftAndJump(), 1000 / 60);

    setStoppableInterval(() => this.playCharacter(), 100);
  }

  /**
   * check if the character move right and left.
   * @returns {boolean}
   */
  isWalking() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * this function makes the character move to the right.
   */
  moveCharacterRight() {
    this.walking_sound.pause();
    if (this.canMoveRight()) {
      this.moveRight();
    }
  }

  /**
   * check if the character move right.
   * @returns {boolean}
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * the character is moving right with sound.
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    if (mute) {
      this.walking_sound.pause();
    } else {
      this.walking_sound.play();
    }
  }

  /**
   * this function invoked other functions to move the character left and jump.
   */
  moveCharacterLeftAndJump() {
    if (this.canMoveLeft()) {
      this.moveLeft();
    }

    if (this.aboveGround()) {
      this.jump();
      if (mute) {
        this.jump_sound.pause();
      } else {
        this.jump_sound.play();
      }
    }

    this.world.camera_x = -this.x + 50;
  }

  /**
   * the character is moving left with sound.
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
  }

  /**
   * check if the character ist above ground.
   * @returns {boolean}
   */
  aboveGround() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * check if the character move left.
   * @returns {boolean}
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * this function is control the dead animation.
   */
  characterIsDead() {
    if (this.isDead()) {
      this.idleCounter = 0;
      this.jumpCounter = 0;
      this.playAnimation(this.IMAGES_DEAD);
      setTimeout(() => {
        this.world.showEndScreen();
      }, "1000");
      stopGame();
    }
  }

  /**
   * this function is control the hurt animation.
   */
  characterIsHurt() {
    this.idleCounter = 0;
    this.jumpCounter = 0;
    this.playAnimation(this.IMAGES_HURT);
  }

  /**
   * this function is control the jump animation.
   */
  characterIsJumping() {
    if (this.jumpCounter >= 1) {
      this.isAboveGround();

      this.playAnimation(this.IMAGES_JUMPING);
    }
  }
  /**
   * this function is control the walk animation.
   */
  characterIsWalking() {
    this.idleCounter = 0;
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * this function is control the idle animation.
   */
  characterIdle() {
    if (this.idleCounter >= 80) {
      this.playAnimation(this.IMAGES_IDLE);
    } else {
      this.playAnimation([this.IMAGES_WALKING[0]]);
    }
  }

  /**
   * this function controls the animations and actions of the game character based on its current state such as death, injury, jumping, or walking.
   */
  playCharacter() {
    if (this.characterIsDead()) {
      this.world.showEndScreen();
    } else if (this.isHurt()) {
      this.characterIsHurt();
    } else if (this.isAboveGround()) {
      this.characterIsJumping();
      this.jumpCounter++;
    } else if (this.isWalking()) {
      this.characterIsWalking();
    } else {
      this.idleCounter++;
      if (this.characterIdle()) {
      }
    }
  }
}
