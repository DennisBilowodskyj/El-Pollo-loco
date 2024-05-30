class CollectBottles extends MovableObject {
  /**
   * list of statusbar images.
   */
  y = 350;
  width = 80;
  height = 80;

  /**
   * list of images .
   */
  BOTTLES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.BOTTLES);
    this.animate();

    this.x = Math.floor(Math.random() * 2000);
  }
  /**
   * this function set intervals for the endboss and the playanimations.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.BOTTLES);
    }, 600);
  }
}
