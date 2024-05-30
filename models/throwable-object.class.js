class ThrowableObject extends MovableObject {
  /**
   * list of bottle images.
   */
  BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  hit = false;
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.BOTTLE_ROTATION);

    this.x = x;
    this.y = y;
    this.height = 70;
    this.throw();
  }

  /**
   * with this function you can throw an object.
   */
  throw() {
    this.speedY = 10;
    this.applyGravity();
    setInterval(() => {
      this.playAnimation(this.BOTTLE_ROTATION);
      this.x += 25;
    }, 50);
  }
}
