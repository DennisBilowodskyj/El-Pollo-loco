class ChickenSmall extends MovableObject {
  /**
   * stats for the small chicken.
   */
  height = 80;
  width = 80;
  y = 355;

  /**
   * list of images sorted according to addition.
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  world;

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGE_DEAD);

    this.x = Math.floor(Math.random() * 2500);
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }
  /**
   * this function set intervals for the small chicken and the playanimations.
   */
  animate() {
    const moveLeftInterval = setInterval(() => {
      if (!this.isDead()) {
        //wenn es nicht dead ist dann move left
        this.moveLeft();
      } else {
        //ansonsten wird das intervall beendet
        clearInterval(moveLeftInterval);
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGE_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
}
