class Chicken extends MovableObject {
  /**
   * stats for the chicken.
   */
  height = 80;
  width = 80;
  y = 355;

  /**
   * list of images sorted according to addition.
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  world;

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGE_DEAD);
    this.x = Math.floor(Math.random() * 2500);
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * this function set intervals for the chicken and the playanimations.
   */
  animate() {
    setStoppableInterval(() => this.moveChicken(), 1000 / 60);
    setStoppableInterval(() => this.playChicken(), 100);
  }

  /**
   * this function makes the chicken move left if he is not dead.
   */
  moveChicken() {
    if (!this.isDead() && !mute){
      this.moveLeft();
      chicken_sound.play();
    }
  }

  /**
   * playing the walk and dead animation.
   */
  playChicken() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGE_DEAD);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }
}
